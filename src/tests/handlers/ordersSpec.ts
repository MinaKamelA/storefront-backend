import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";
import UserStore from "../../models/user";

const request = supertest(app);

describe('Orders endpoint tests', () => {
    it('should return response with status 401 if token is not provided when called with get without arguments', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 if token is not provided when called with get and a parameter', async () => {
        const response = await request.get('/orders/1');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 if token is not provided while creating', async () => {
        const response = await request.post('/orders');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 if token is not provided while deleting', async () => {
        const response = await request.delete('/orders/1');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 if token is not provided while updating', async () => {
        const response = await request.put('/orders');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 if token is not provided while adding product with addProduct middleware', async () => {
        const response = await request.post('/orders/1/products');
        expect(response.status).toBe(401);
    });
});

describe('Orders endpoint tests with token', () => {
    const user: User = {
        id: 1,
        first_name: 'Token',
        last_name: 'User',
        password: 'pass'
    };
    const token = jwt.sign({user: [user]},process.env.TOKEN_SECRET as string);
    const order: Order = {
        id: 1,
        made_by: 1,
        status: 'active'
    };
    beforeAll(async () => {
        const userStore = new UserStore();
        userStore.create(user);
    });
    afterAll(async () => {
        const userStore = new UserStore();
        userStore.delete('1');
    });
   it('should return response with status 200 if token IS provided while creating', async () => {
        
        const response = await request.post('/orders').set('authorization', `Bearer ${token}`).send(order).send({userId: 1});
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 if token IS provided when called with get without arguments', async () => {
        const response = await request.get('/orders').set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 if token IS provided when called with get and a parameter', async () => {
        const response = await request.get('/orders/1').set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 if token IS provided while updating', async () => {
        const response = await request.put('/orders').set('authorization', `Bearer ${token}`).send(order);
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 if token IS provided while deleting', async () => {
        const response = await request.delete('/orders/1').set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});