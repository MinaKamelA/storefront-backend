import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe('Users endpoint tests', () => {
    it('should return response with status 200 when called with get without arguments', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(200);
    });
    it('should return response with status 200 when called with get and a parameter', async () => {
        const response = await request.get('/users/1');
        expect(response.status).toBe(200);
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
})