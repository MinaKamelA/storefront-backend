import client from "../database";

class OrderStore {
    index = async (): Promise<Order[]>=>{
        try{
            const conn = await client.connect();
            const query = 'SELECT * FROM orders';
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get orders (Error: ${err})`);
        }
    }
    show = async (id:string): Promise<Order[]> => {
        try{
            const conn = await client.connect();
            const query = `SELECT * FROM orders WHERE id=$1`;
            const result = await conn.query(query,[id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get order (Error: ${err})`);
        }
        
    }
    create = async (order:Order): Promise<Order[]> => {
        try{
            const conn = await client.connect();
            const query = `INSERT INTO orders (made_by, status) VALUES ($1, $2) RETURNING *`;
            const result = await conn.query(query, [order.made_by, order.status]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot add order (Error: ${err})`);
        }
    }
    delete = async (id:string): Promise<Order[]> => {
        try{
            const conn = await client.connect();
            const query = `DELETE FROM orders WHERE id=$1 RETURNING *`;
            const result = await conn.query(query,[id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot delete order (Error: ${err})`);
        }
    }
    edit = async (order:Order): Promise<Order[]> => {
        try{
            const conn = await client.connect();
            const query = `UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`;
            const result = await conn.query(query, [order.status, order.id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot update order (Error: ${err})`);
        }
    }
    addProduct = async (orderID: string, productID: Number, quantity: Number): Promise<Order> => {
        try{
            const conn = await client.connect();
            const query = `INSERT INTO orders_products ("order", product, quantity) VALUES ($1, $2, $3) RETURNING *`;
            const result = await conn.query(query, [orderID, productID, quantity]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Cannot add product to order (Error: ${err})`);
        }
    }
}

export default OrderStore;