import OrderStore from '../../models/order';
import UserStore from '../../models/user';

describe('Order model', () => {
    const orderStore = new OrderStore();
    describe('Structural tests', () => {
        it('should have index', () => {
            expect(orderStore.index).toBeDefined();
        });
        it('should have show', () => {
            expect(orderStore.show).toBeDefined();
        });
        it('should have create', () => {
            expect(orderStore.create).toBeDefined();
        });
        it('should have delete', () => {
            expect(orderStore.delete).toBeDefined();
        });
        it('should have edit', () => {
            expect(orderStore.edit).toBeDefined();
        });
        it('should have add product', () => {
            expect(orderStore.addProduct).toBeDefined();
        });
    });
    describe('CRUD functional tests', () => {
        beforeAll(async () => {
            const userStore = new UserStore();
            const user = {
                first_name: 'Test',
                last_name: 'User',
                password: 'test'
            };
            userStore.create(user);
        });
        afterAll(async () => {
            const userStore = new UserStore();
            userStore.delete('3');
        });
        it('should add order when call create', async () => {
            const order = {
                made_by: 3,
                status: 'ACTIVE'
            };
            const result = await orderStore.create(order);
            expect(result[0].status).toEqual('ACTIVE');
        });
        it('should display all orders', async () => {
            const result = await orderStore.index();
            expect(result[0].status).toEqual('ACTIVE');
        });
        it('should display order with id=2', async () => {
            const result = await orderStore.show('2');
            expect(result[0].status).toEqual('ACTIVE');
        });
        it('should edit order with id=2', async () => {
            const order = {
                id: 2,
                made_by: 3,
                status: 'COMPLETE'
            };
            const result = await orderStore.edit(order);
            expect(result[0].status).toEqual('COMPLETE');
        });
        it('should delete order with id=2', async () => {
            const result = await orderStore.delete('2');
            expect(result[0].status).toEqual('COMPLETE');
        });
    });
})