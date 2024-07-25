import mysql from 'mysql2/promise'
import { configDB } from './config.mjs'

export async function connection() {
    try {   
        const pool = mysql.createPool(configDB);

        return await pool.getConnection();

    } catch(err) {
        console.error(err);
    }
}