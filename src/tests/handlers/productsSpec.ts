import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";
import CategoryStore from "../../models/category";

const request = supertest(app);

describe('Products endpoint tests', () => {
    it('should return response with status 200 when called with get without arguments', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 when called with get and a parameter', async () => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
    });
    it('should return response with status 401 if token is not provided while creating', async () => {
        const response = await request.post('/products');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 if token is not provided while deleting', async () => {
        const response = await request.delete('/products/1');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 if token is not provided while updating', async () => {
        const response = await request.put('/products');
        expect(response.status).toBe(401);
    });
});

describe('Products endpoint tests with token', () => {
    const product: Product = {
        id: 1,
        name: 'test',
        price: 10,
        category: 2
    };
    const user: User = {
        id: 10,
        first_name: 'Token',
        last_name: 'User',
        password: 'pass'
    };
    beforeAll(async () => {
        const categoryStore = new CategoryStore();
        const category = {
            name: 'Test',
        };
        categoryStore.create(category);
    });
    afterAll(async () => {
        const categoryStore = new CategoryStore();
        categoryStore.delete('2');
    });
    const token = jwt.sign({user: [user]},process.env.TOKEN_SECRET as string);
   it('should return response with status 200 if token IS provided while creating', async () => {
        
        const response = await request.post('/products').set('authorization', `Bearer ${token}`).send(product);
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 if token IS provided while updating', async () => {
        const response = await request.put('/products').set('authorization', `Bearer ${token}`).send(product);
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 if token IS provided while deleting', async () => {
        const response = await request.delete('/products/1').set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});