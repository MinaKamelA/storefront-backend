import ProductStore from '../../models/product';
import CategoryStore from '../../models/category';

describe('Product model', () => {
    const productStore = new ProductStore();
    const categoryStore = new CategoryStore();
    describe('Structural tests', () => {
        it('should have index', () => {
            expect(productStore.index).toBeDefined();
        });
        it('should have show', () => {
            expect(productStore.show).toBeDefined();
        });
        it('should have create', () => {
            expect(productStore.create).toBeDefined();
        });
        it('should have delete', () => {
            expect(productStore.delete).toBeDefined();
        });
        it('should have edit', () => {
            expect(productStore.edit).toBeDefined();
        });
    });
    describe('CRUD functional tests', () => {
        let catId = 0;
        beforeAll(async () => {
            const category = {
                name: 'Test',
            };
            await categoryStore.create(category);
            const catArray = await categoryStore.index();
            catId = catArray[catArray.length - 1].id as number;
        });
        afterAll(async () => {
            const categoryStore = new CategoryStore();
            categoryStore.delete(catId.toString());
        });
        it('should add product when call create', async () => {
            const product = {
                name: 'Test',
                price: 20,
                category: catId
            };
            const result = await productStore.create(product);
            expect(result[0].name).toEqual('Test');
        });
        it('should display all products', async () => {
            const result = await productStore.index();
            expect(result[0].name).toEqual('Test');
        });
        it('should display product with id=2', async () => {
            const result = await productStore.show('2');
            expect(result[0].name).toEqual('Test');
        });
        it('should edit product with id=2', async () => {
            const product = {
                id: 2,
                name: 'Testnew',
                price: 20,
                category: catId
            };
            const result = await productStore.edit(product);
            expect(result[0].name).toEqual('Testnew');
        });
        it('should delete product with id=2', async () => {
            const result = await productStore.delete('2');
            expect(result[0].name).toEqual('Testnew');
        });
    });
});