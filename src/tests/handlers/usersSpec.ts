import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";

const request = supertest(app);

describe('Users endpoint tests', () => {
    it('should return response with status 401 if token is not provided when called with get without arguments', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 if token is not provided when called with get and a parameter', async () => {
        const response = await request.get('/users/1');
        expect(response.status).toBe(401);
    });
    it('should return response with status 400 if user object is not provided while creating', async () => {
        const response = await request.post('/users');
        expect(response.status).toBe(400);
    });
    it('should return response with status 401 if token is not provided while deleting', async () => {
        const response = await request.delete('/users/1');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 if token is not provided while updating', async () => {
        const response = await request.put('/users');
        expect(response.status).toBe(401);
    });
});

describe('Users endpoint tests with token', () => {
    const user: User = {
        id: 2,
        first_name: 'Token',
        last_name: 'User',
        password: 'pass'
    };
    const token = jwt.sign({user: [user]},process.env.TOKEN_SECRET as string);
   it('should return response with status 200 if token IS provided while creating', async () => {
        const response = await request.post('/users').set('authorization', `Bearer ${token}`).send(user);
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 if token IS provided when called with get without arguments', async () => {
        const response = await request.get('/users').set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 if token IS provided when called with get and a parameter', async () => {
        const response = await request.get('/users/2').set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 if token IS provided while updating', async () => {
        const response = await request.put('/users').set('authorization', `Bearer ${token}`).send(user);
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 if token IS provided while deleting', async () => {
        const response = await request.delete('/users/2').set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});