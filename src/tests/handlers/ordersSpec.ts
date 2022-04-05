import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe('Orders endpoint tests', () => {
    it('should return response with status 200 when called with get without arguments', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 when called with get and a parameter', async () => {
        const response = await request.get('/orders/1');
        expect(response.status).toBe(200);
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
})