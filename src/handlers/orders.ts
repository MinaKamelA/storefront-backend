import express from 'express';
import OrderStore from '../models/order';
import verifyToken from '../services/verifyToken';

const store = new OrderStore();
const orders = express.Router();

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
        const order: Order = {
            made_by: parseInt(req.userId),
            status: req.body.status
        };
        const result = await store.create(order);
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
        const order: Order = {
            id: req.body.id,
            made_by: req.body.made_by,
            status: req.body.status
        };
        if(order.made_by !== parseInt(req.userId)){
            res.status(403);
            res.json(`403: Forbidden`);
            return;
        }
        const result = await store.edit(order);
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);   
    }
}

const addProduct =async (req:express.Request, res:express.Response): Promise<void> => {
    try {
        const result= await store.addProduct(req.params.id, req.body.product_id, req.body.quantity);
        res.json(result);   
    } catch (err) {
        res.status(400);
        res.json(err);   
    }
}

orders.get('/', verifyToken, index);
orders.get('/:id', verifyToken, show);
orders.post('/', verifyToken, create);
orders.delete('/:id', verifyToken, destroy);
orders.put('/', verifyToken, update);
orders.post('/:id/products', verifyToken, addProduct);

export default orders;