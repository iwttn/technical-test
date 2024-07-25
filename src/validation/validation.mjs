import Joi from 'joi'

export const bodyCreateCampaignschema = Joi.object({
    idUsuario: Joi.number()
        .integer()
        .min(100000000)
        .max(999999999)
        .required(),
    nombreCampania: Joi.string()
        .min(1)
        .max(200)
        .required(),
    fechaHoraProgramacion: Joi.string()
        .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
        .required(),
    estado: Joi.number()
        .integer()
        .min(0)
        .max(1)
        .required(),
    mensajes: Joi.array()
        .items(Joi.object({
            fechaHoraEnvio: Joi.string()
                .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
                .required(),
            mensaje: Joi.string()
                .min(1)
                .max(160)
                .required(),
            estado: Joi.number()
                .integer()
                .min(0)
                .max(1)
        })).required()
})


export const validateMonthParam = (month) => {
    if(typeof month !== 'string') return false;

    return /^(1[0-2]|[1-9]|0[1-9])$/.test(month.trim()) 
}

export const validateIdClienteParam = (idClient) => {
    if(
        typeof idClient !== 'string' ||
        idClient.length !== 9 ||
        parseInt(idClient).toString() === 'NaN' ||
        parseInt(idClient).toString().length !== 9 
    ) return false;
    
    return true;
}