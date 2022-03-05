import joi from "joi";

const categoySchema = joi.object({
    name: joi.string().min(1).required()
})

export default categoySchema;