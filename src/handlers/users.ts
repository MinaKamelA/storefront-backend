import express from 'express';
import jwt from 'jsonwebtoken';
import UserStore from '../models/user';
import verifyToken from '../services/verifyToken';
import app from '../server';

const store = new UserStore();
const users = express.Router();

const index = async(req:express.Request, res:express.Response): Promise<void> => {
    const result = await store.index();
    res.json(result);
}

const show=async (req:express.Request, res:express.Response): Promise<void> => {
    const result = await store.show(req.params.id);
    res.json(result);
}

const create=async (req:express.Request, res:express.Response): Promise<void> => {
    try{
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };
        const result = await store.create(user);
        const token = jwt.sign({user: result},process.env.TOKEN_SECRET as string);
        const resResult = {
            user: result,
            token: token
        }
        res.json(resResult);
    }catch(err){
        console.log(err);
        res.status(400);
        res.json(err);
    }
}

const destroy =async(req:express.Request, res:express.Response): Promise<void> => {
    if(req.params.id !== req.userId){
        res.status(403);
        res.json(`403: Forbidden`);
        return;
    }
    const result = await store.delete(req.params.id);
    res.json(result);
}

const edit = async(req:express.Request, res:express.Response): Promise<void> => {
    try{
        const user: User = {
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };
        if(user.id !== parseInt(req.userId)){
            res.status(403);
            res.json(`403: Forbidden`);
            return;
        }
        const result = await store.edit(user);
        res.json(result);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}


users.get('/', verifyToken, index);
users.get('/:id', verifyToken, show);
users.post('/', verifyToken, create);
users.delete('/:id', verifyToken, destroy);
users.put('/', verifyToken, edit);

export default users;