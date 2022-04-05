import client from "../database";

class ProductStore {
    index = async (): Promise<Product[]>=>{
        try{
            const conn = await client.connect();
            const query = 'SELECT * FROM products';
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get products (Error: ${err})`);
        }
    }
    show = async (id:string): Promise<Product[]> => {
        try{
            const conn = await client.connect();
            const query = `SELECT * FROM products WHERE id=$1`;
            const result = await conn.query(query,[id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get product (Error: ${err})`);
        }
        
    }
    create = async (product:Product): Promise<Product[]> => {
        try{
            const conn = await client.connect();
            const query = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *`;
            const result = await conn.query(query,[product.name, product.price, product.category]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot add product: ${product.name} (Error: ${err})`);
        }
    }
    delete = async (id:string): Promise<Product[]> => {
        try{
            const conn = await client.connect();
            const query = `DELETE FROM products WHERE id=$1 RETURNING *`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot delete product (Error: ${err})`);
        }
    }
    edit = async (product:Product): Promise<Product[]> => {
        try{
            const conn = await client.connect();
            const query = `UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING *`;
            const result = await conn.query(query, [product.name, product.price, product.category, product.id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot update product: ${product.name} (Error: ${err})`);
        }
    }
}

export default ProductStore;