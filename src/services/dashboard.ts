import client from "../database";

declare type Product = {
    product_appearance?: Number;
    product_quantity?: Number;
}

class dashboardQueries {
    productsInCategory = async (id:string): Promise<Product[]> => {
        try{
            const conn = await client.connect();
            const query = `SELECT * FROM products WHERE category=$1`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get products in category (Error: ${err})`);
        }
    }
    userOrders =async (id:string): Promise<Order[]> => {
        try{
            const conn = await client.connect();
            const query = `SELECT * FROM orders WHERE made_by=$1`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get user orders (Error: ${err})`);
        }
    }
    userCompletedOrders =async (id:string): Promise<Order[]> => {
        try{
            const conn = await client.connect();
            const query = `SELECT * FROM orders WHERE made_by=$1 AND status='complete'`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get user completed orders (Error: ${err})`);
        }
    }
    popularFiveProductsByTimes = async (): Promise<Product[]> => {
        try{
            const conn = await client.connect();
            const query = `SELECT products.id, products.name, products.price, products.category, COUNT(orders_products.product) AS product_appearance FROM products INNER JOIN orders_products ON products.id = orders_products.product GROUP BY products.id ORDER BY COUNT(orders_products.product) DESC LIMIT 5`;
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get popular products (Error: ${err})`);
        }
    }
    popularFiveProductsByQuantity = async (): Promise<Product[]> => {
        try{
            const conn = await client.connect();
            const query = `SELECT products.id, products.name, products.price, products.category, SUM(orders_products.quantity) AS product_quantity FROM products INNER JOIN orders_products ON products.id = orders_products.product GROUP BY products.id ORDER BY SUM(orders_products.quantity) DESC LIMIT 5`;
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get popular products (Error: ${err})`);
        }
    }
}

export default dashboardQueries;