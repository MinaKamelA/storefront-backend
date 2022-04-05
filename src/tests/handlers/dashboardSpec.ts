import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";

const request = supertest(app);

describe('Dashboard endpoint tests', () => {
    it('should return response with status 200 when called with get and productsInCategory middleware', async () => {
        const response = await request.get('/dashboard/categories/1/products');
        expect(response.status).toBe(200);
    });
    it('should return response with status 401 when called with get and userOrders middleware if token is not provided', async () => {
        const response = await request.get('/dashboard/users/1/orders');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 when called with get and userCompletedOrders middleware if token is not provided', async () => {
        const response = await request.get('/dashboard/users/1/completed-orders');
        expect(response.status).toBe(401);
    });
    it('should return response with status 200 when called with get and popularFiveProductsByTimes middleware', async () => {
        const response = await request.get('/dashboard/products/popular-times');
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 when called with get and popularFiveProductsByQuantity middleware', async () => {
        const response = await request.get('/dashboard/products/popular-quantity');
        expect(response.status).toBe(200);
    });
});

describe('Dashboard endpoint tests with token', () => {
    const user: User = {
        id: 10,
        first_name: 'Token',
        last_name: 'User',
        password: 'pass'
    };
    const token = jwt.sign({user: [user]},process.env.TOKEN_SECRET as string);
    it('should return response with status 200 when called with get and userOrders middleware if token IS provided', async () => {
        const response = await request.get('/dashboard/users/10/orders').set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 when called with get and userCompletedOrders middleware if token IS provided', async () => {
        const response = await request.get('/dashboard/users/10/completed-orders').set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});