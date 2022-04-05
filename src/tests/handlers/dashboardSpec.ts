import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe('Dashboard endpoint tests', () => {
    it('should return response with status 200 when called with get and productsInCategory middleware', async () => {
        const response = await request.get('/dashboard/categories/1/products');
        expect(response.status).toBe(200);
    });
    it('should return response with status 401 when called with get and userOrders middleware if token is not provided', async () => {
        const response = await request.get('/dashboard/users/:id/orders');
        expect(response.status).toBe(401);
    });
    it('should return response with status 401 when called with get and userCompletedOrders middleware if token is not provided', async () => {
        const response = await request.get('/dashboard/users/:id/completed-orders');
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
})