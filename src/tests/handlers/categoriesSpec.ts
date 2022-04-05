import supertest from "supertest";
import app from "../../server";

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
})