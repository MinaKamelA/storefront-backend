import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe('Products endpoint test', () => {
    it('should return response with status 200 when called with get', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
})