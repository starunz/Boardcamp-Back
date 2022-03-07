import customersSchema from "../schemas/customersSchema.js";

function customersValidate(req, res, next) {
  const validation = customersSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    let statusCode = 422;

    const errors = validation.error.details.map(detail => detail.message);

    if(errors.includes('"birthday" must be in ISO 8601 date format')) statusCode = 400;

    return res.status(statusCode).send(errors);
  }

  next();
}

export default customersValidate;