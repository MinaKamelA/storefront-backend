import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe('Token verification model', () => {
    it('should return response status 401 if token is not provided', async () => {
        const response = await request.put('/users');
        expect(response.status).toBe(401);
    });
});