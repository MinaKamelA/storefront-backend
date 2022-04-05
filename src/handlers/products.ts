import express from 'express';
import ProductStore from '../models/product';
import verifyToken from '../services/verifyToken';

const store = new ProductStore();
const products = express.Router();

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
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const create =async (req:express.Request, res:express.Response): Promise<void> => {
    try{
        const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
        };
        const result = await store.create(product);
        res.json(result);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const destroy =async(req:express.Request, res:express.Response): Promise<void> => {
    try {
        const result = await store.delete(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const update =async (req:express.Request, res:express.Response): Promise<void> => {
    try{
        const product: Product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const result = await store.edit(product);
        res.json(result);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

products.get('/', index);
products.get('/:id', show);
products.post('/', verifyToken, create);
products.delete('/:id', verifyToken, destroy);
products.put('/', verifyToken, update);

export default products;