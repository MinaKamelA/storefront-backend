import client from "../database";

describe('Database Variables Test', () => {
    it('should have a client variable', () => {
        expect(client).toBeDefined();
    });
    it('should connect with environment variables', async () => {
        const conn = await client.connect();
        expect(conn).toBeDefined();
    });
});