import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const {
    TOKEN_SECRET,
} = process.env;

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const authHeader = (req.headers.authorization) as string;
        const token = authHeader.split(' ')[1];
        const decode = (jwt.verify(token, TOKEN_SECRET as string)) as JsonWebToken.JwtPayload;
        req.userId = decode.user[0].id.toString();
        next();
    }catch(err){
        res.status(401);
        res.json(` 401: Unauthorized (Access denied)`);
    }
}

export default verifyToken;