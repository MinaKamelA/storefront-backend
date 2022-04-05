import CategoryStore from "../../models/category";

describe('Category model', () => {
    const categoryStore = new CategoryStore();
    describe('Structural tests', () => {
        it('should have index', () => {
            expect(categoryStore.index).toBeDefined();
        });
        it('should have show', () => {
            expect(categoryStore.show).toBeDefined();
        });
        it('should have create', () => {
            expect(categoryStore.create).toBeDefined();
        });
        it('should have delete', () => {
            expect(categoryStore.delete).toBeDefined();
        });
        it('should have edit', () => {
            expect(categoryStore.edit).toBeDefined();
        });
    });
    describe('CRUD functional tests', () => {
        it('should add category when call create', async () => {
            const category = {
                name: 'test'
            };
            const result = await categoryStore.create(category);
            expect(result).toEqual([{
                id: 3,
                name: 'test'
            }]);
        });
        it('should display all categories', async () => {
            const result = await categoryStore.index();
            expect(result).toEqual([{
                id: 3,
                name: 'test'
            }]);
        });
        it('should display category with id=3', async () => {
            const result = await categoryStore.show('3');
            expect(result).toEqual([{
                id: 3,
                name: 'test'
            }]);
        });
        it('should edit category with id=3', async () => {
            const category = {
                id: 3,
                name: 'new test'
            };
            const result = await categoryStore.edit(category);
            expect(result).toEqual([{
                id: 3,
                name: 'new test'
            }]);
        });
        it('should delete category with id=3', async () => {
            const result = await categoryStore.delete('3');
            expect(result).toEqual([{
                id: 3,
                name: 'new test'
            }]);
        });
    });
})