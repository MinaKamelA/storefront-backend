import express from 'express';
import CategoryStore from '../models/category';
import verifyToken from '../services/verifyToken';

const store = new CategoryStore();
const categories = express.Router();

const index = async (req:express.Request, res:express.Response): Promise<void> => {
    try {
        const result = await store.index();
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show =async (req:express.Request, res:express.Response): Promise<void> => {
    try {
        const result = await store.show(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    } 
}

const create =async (req:express.Request, res:express.Response): Promise<void> => {
    try{
        const category: Category = {
            name: req.body.name
        };
        const result = await store.create(category);
        res.json(result);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const destroy =async (req:express.Request, res:express.Response): Promise<void> => {
    try {
        const result = await store.delete(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const update =async (req:express.Request, res:express.Response): Promise<void> => {
    try {
        const category: Category = {
            id: req.body.id,
            name: req.body.name
        };
        const result = await store.edit(category);
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

categories.get('/', index);
categories.get('/:id', show);
categories.post('/', verifyToken, create);
categories.delete('/:id', verifyToken, destroy);
categories.put('/', verifyToken, update);

export default categories;