import express from 'express';
import dashboardQueries from '../services/dashboard';
import verifyToken from '../services/verifyToken';

const dashboard = express.Router();
const store = new dashboardQueries();


const productsInCategory = async (req:express.Request, res:express.Response): Promise<void> => {
    try {
        const result = await store.productsInCategory(req.params.id);
        res.json(result);   
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const userOrders = async(req:express.Request, res:express.Response): Promise<void> => {
    try {
        if(req.params.id !== req.userId){
            res.status(403);
            res.json(`403: Forbidden`);
            return;
        }
        const result = await store.userOrders(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const userCompletedOrders = async(req:express.Request, res:express.Response): Promise<void> => {
    try {
        if(req.params.id !== req.userId){
            res.status(403);
            res.json(`403: Forbidden`);
            return;
        }
        const result = await store.userCompletedOrders(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const popularFiveProductsByTimes = async(req:express.Request, res:express.Response): Promise<void> => {
    try {
        const result = await store.popularFiveProductsByTimes();
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const popularFiveProductsByQuantity = async(req:express.Request, res:express.Response): Promise<void> => {
    try {
        const result = await store.popularFiveProductsByQuantity();
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);   
    }
}

dashboard.get('/categories/:id/products', productsInCategory);
dashboard.get('/users/:id/orders', verifyToken, userOrders);
dashboard.get('/users/:id/completed-orders', verifyToken, userCompletedOrders);
dashboard.get('/products/popular-times', popularFiveProductsByTimes);
dashboard.get('/products/popular-quantity', popularFiveProductsByQuantity);

export default dashboard;