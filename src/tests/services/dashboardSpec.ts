import DashboardQueries from "../../services/dashboard";

describe('Dashboard model', () => {
    const dashboard = new DashboardQueries();
    describe('Structural tests', () => {
        it('should have products in category', () => {
            expect(dashboard.productsInCategory).toBeDefined();
        });
        it('should have user orders', () => {
            expect(dashboard.userOrders).toBeDefined();
        });
        it('should have user completed orders', () => {
            expect(dashboard.userCompletedOrders).toBeDefined();
        });
        it('should have popular five products by times', () => {
            expect(dashboard.popularFiveProductsByTimes).toBeDefined();
        });
        it('should have popular five products by quantity', () => {
            expect(dashboard.popularFiveProductsByQuantity).toBeDefined();
        });
    });
    describe('Functional tests', () => {
        it('should not throw error when productsInCategory run', async () => {
            const result = await dashboard.productsInCategory('1');
            expect(result).toEqual([]);
        });
        it('should not throw error when userOrders run', async () => {
            const result = await dashboard.userOrders('1');
            expect(result).toEqual([]);
        });
        it('should not throw error when userCompletedOrders run', async () => {
            const result = await dashboard.userCompletedOrders('1');
            expect(result).toEqual([]);
        });
        it('should not throw error when popularFiveProductsByTimes run', async () => {
            const result = await dashboard.popularFiveProductsByTimes();
            expect(result).toEqual([]);
        });
        it('should not throw error when popularFiveProductsByQuantity run', async () => {
            const result = await dashboard.popularFiveProductsByQuantity();
            expect(result).toEqual([]);
        });
    });
})