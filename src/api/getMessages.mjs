import { executeQuery } from '../database/execute.mjs';
import { validateIdClienteParam, validateMonthParam} from '../validation/validation.mjs'

export const getMessages = async (event) => {
    try {
        const { mes, idCliente } = event.queryStringParameters;

        if(!mes) throw new Error('Por lo menos necesitas filtrar por mes.');
        if(!validateMonthParam(mes)) throw new Error('Valor incorrecto para el parametro `mes`.');

        const queryValues = [mes, null];

        if(idCliente && !validateIdClienteParam(idCliente)) throw new Error('Valor incorrecto para el parametro `idCliente`.');
        if(idCliente && validateIdClienteParam(idCliente)) queryValues[1] = idCliente;

        const queryResult = await executeQuery('CALL `sinapsis_technical_test`.`buscarMensajes`(?, ?);', queryValues);
     
        return { 
            statusCode: 200,
            body: JSON.stringify({
                code: 1,
                message: queryResult.length ? 'Mensajes encontrados' : 'No se encontrarón mensajes.',
                data: {
                    mensajes: {
                        pendientes: queryResult?.filter(({estadoEnvio}) => estadoEnvio === 1) ?? [],
                        enviados: queryResult?.filter(({estadoEnvio}) => estadoEnvio === 2) ?? [],
                        fallidos: queryResult?.filter(({estadoEnvio}) => estadoEnvio === 3) ?? []
                    }
                }
            })
        }
    } catch(err) {
        console.error(err)

        return {
            statusCode: 500,
            body: JSON.stringify({
                code: 0,
                message: 'Hubo un problema al buscar los mensajes.'
            })
        }
    }
   
}