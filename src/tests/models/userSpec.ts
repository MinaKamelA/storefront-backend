import UserStore from '../../models/user';

describe('User model', () => {
    const userStore = new UserStore();
    describe('Structural tests', () => {
        it('should have index', () => {
            expect(userStore.index).toBeDefined();
        });
        it('should have show', () => {
            expect(userStore.show).toBeDefined();
        });
        it('should have create', () => {
            expect(userStore.create).toBeDefined();
        });
        it('should have delete', () => {
            expect(userStore.delete).toBeDefined();
        });
        it('should have edit', () => {
            expect(userStore.edit).toBeDefined();
        });
    });
    describe('CRUD functional tests', () => {
        it('should add user when call create', async () => {
            const user = {
                first_name: 'Test',
                last_name: 'User',
                password: 'test'
            };
            const result = await userStore.create(user);
            expect(result[0].first_name).toEqual('Test');
        });
        it('should display all users', async () => {
            const result = await userStore.index();
            expect(result[0].first_name).toEqual('Test');
        });
        it('should display user with id=4', async () => {
            const result = await userStore.show('4');
            expect(result[0].first_name).toEqual('Test');
        });
        it('should edit user with id=4', async () => {
            const user = {
                id: 4,
                first_name: 'Testnew',
                last_name: 'User',
                password: 'test'
            };
            const result = await userStore.edit(user);
            expect(result[0].first_name).toEqual('Testnew');
        });
        it('should delete user with id=4', async () => {
            const result = await userStore.delete('4');
            expect(result[0].first_name).toEqual('Testnew');
        });
    });
})