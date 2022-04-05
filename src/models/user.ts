import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const {
    BCRYPT_PASSWORD,
    SALT_ROUND
} = process.env;

class UserStore {
    index = async (): Promise<User[]>=>{
        try{
            const conn = await client.connect();
            const query = 'SELECT * FROM users';
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get users (Error: ${err})`);
        }
    }
    show = async (id:string): Promise<User[]> => {
        try{
            const conn = await client.connect();
            const query = `SELECT * FROM users WHERE id=$1`;
            const result = await conn.query(query,[id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get user (Error: ${err})`);
        }
        
    }
    create = async (user:User): Promise<User[]> => {
        try{
            const conn = await client.connect();
            const hash = bcrypt.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUND as string));
            const query = `INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *`;
            const result = await conn.query(query, [user.first_name, user.last_name, hash]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot add user: ${user.first_name} (Error: ${err})`);
        }
    }
    delete = async (id:string): Promise<User[]> => {
        try{
            const conn = await client.connect();
            const query = `DELETE FROM users WHERE id=$1 RETURNING *`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot delete user (Error: ${err})`);
        }
    }
    edit = async (user:User): Promise<User[]> => {
        try{
            const conn = await client.connect();
            const hash = bcrypt.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUND as string));
            const query = `UPDATE users SET first_name=$1, last_name=$2, password=$3 WHERE id=$4 RETURNING *`;
            const result = await conn.query(query, [user.first_name, user.last_name, hash, user.id]);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot update user: ${user.first_name} (Error: ${err})`);
        }
    }
}

export default UserStore;