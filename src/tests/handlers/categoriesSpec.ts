import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const request = supertest(app);

describe('Categories endpoint tests', () => {
    it('should return response with status 200 when called with get without arguments', async () => {
        const response = await request.get('/categories');
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 when called with get and a parameter', async () => {
        const response = await request.get('/categories/1');
        expect(response.status).toBe(200);
    });
    it('should return response with status 401 if token is not provided while creating', async () => {
        const response = await request.post('/categories');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 if token is not provided while deleting', async () => {
        const response = await request.delete('/categories/1');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 if token is not provided while updating', async () => {
        const response = await request.put('/categories');
        expect(response.status).toBe(401);
    });
});

describe('Categories endpoint tests with token', () => {
    const user: User = {
        id: 10,
        first_name: 'Token',
        last_name: 'User',
        password: 'pass'
    };
    const token = jwt.sign({user: [user]},process.env.TOKEN_SECRET as string);
   it('should return response with status 200 if token IS provided while creating', async () => {
        const response = await request.post('/categories').set('authorization', `Bearer ${token}`).send({name: 'test'});
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 if token IS provided while updating', async () => {
        const response = await request.put('/categories').set('authorization', `Bearer ${token}`).send({id: 1,name: 'new test'});
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 if token IS provided while deleting', async () => {
        const response = await request.delete('/categories/1').set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});