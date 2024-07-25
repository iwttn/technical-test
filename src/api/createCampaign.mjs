import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { executeQuery } from '../database/execute.mjs'
import { bodyCreateCampaignschema } from '../validation/validation.mjs'

export const createCampaign = middy(async (event) => {
    try {
        const validate = bodyCreateCampaignschema.validate(event.body); 

        if(validate.error) throw new Error(validate.error.message);

        const { idUsuario, nombreCampania, fechaHoraProgramacion, estado, mensajes } = event.body;

        const resultQuery = await executeQuery('CALL `sinapsis_technical_test`.`crearCampania`(?, ?, ?, ?);', [idUsuario, nombreCampania, fechaHoraProgramacion, estado]);
        
        const { idCampania } = resultQuery[0];

        for(const message of mensajes) {
            const { fechaHoraEnvio, mensaje, estado } = message;
            await executeQuery('CALL `sinapsis_technical_test`.`crearMensaje`(?, ?, ?, ?);', [idCampania, fechaHoraEnvio, mensaje, estado]);
        }

        return { 
            statusCode: 200,
            body: JSON.stringify({
                code: 1,
                message: `La campaña "${nombreCampania}" fue creada de manera exitosa.`
            })
        }
    } catch(err) {
        console.error(err)

        return {
            statusCode: 500,
            body: JSON.stringify({
                code: 0,
                message: 'Hubo un problema al crear la campaña.'
            })
        }
    }
   
}).use(httpJsonBodyParser())