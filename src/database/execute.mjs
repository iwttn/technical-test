import { connection } from './connection.mjs'

export async function executeQuery(query, data = []) {
    try {
        if(!query) throw new Error('Parametro `query` es necesario.');
        if(typeof query !== 'string') throw new Error('Parametro `query` debe ser un string.');
        if(!(data instanceof Array)) throw new Error('Parametro `data` debe ser un arreglo.');

        const conn = await connection();
        const queryResult = await conn.query(query, data);

        return queryResult[0][0];
        
    } catch(err) {
        if(err instanceof Error) {
            console.error(err.message)
        } else {
            console.error(err)
        }

        throw new Error('Hubo un problema al ejecutar la consulta.');
    }
}