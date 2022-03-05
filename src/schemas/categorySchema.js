import joi from "joi";

const categoySchema = joi.object({
    name: joi.string().min(1).trim().required()
})

export default categoySchema;