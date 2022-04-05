import client from "../database";

class CategoryStore {
    index = async (): Promise<Category[]>=>{
        try{
            const conn = await client.connect();
            const query = 'SELECT * FROM categories';
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get categories (Error: ${err})`);
        }
    }
    show = async (id:string): Promise<Category[]> => {
        try{
            const conn = await client.connect();
            const query = `SELECT * FROM categories WHERE id=$1`;
            const result = await conn.query(query,[id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get category (Error: ${err})`);
        }
        
    }
    create = async (category:Category): Promise<Category[]> => {
        try{
            const conn = await client.connect();
            const query = `INSERT INTO categories (name) VALUES ($1) RETURNING *`;
            const result = await conn.query(query, [category.name]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot add category: ${category.name} (Error: ${err})`);
        }
    }
    delete = async (id:string): Promise<Category[]> => {
        try{
            const conn = await client.connect();
            const query = `DELETE FROM categories WHERE id=$1 RETURNING *`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot delete category (Error: ${err})`);
        }
    }
    edit = async (category:Category): Promise<Category[]> => {
        try{
            const conn = await client.connect();
            const query = `UPDATE categories SET name=$1 WHERE id=$2 RETURNING *`;
            const result = await conn.query(query, [category.name, category.id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot update category: ${category.name} (Error: ${err})`);
        }
    }
}

export default CategoryStore;