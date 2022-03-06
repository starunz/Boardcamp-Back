import { customersBirthdaySchema } from "../schemas/customersSchema.js";

function customersBirthdayValidate(req, res, next) {
  const validation = customersBirthdaySchema.validate(req.body, { abortEarly: false });

  if(validation.error){

    const error = validation.error.details[0].message;
    console.log(error)
    return res.status(400).send(error);
  }

  next();
}

export default customersBirthdayValidate;