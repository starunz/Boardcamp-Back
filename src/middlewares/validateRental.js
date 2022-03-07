import rentalSchema from "../schemas/rentalSchema.js";

function rentalValidate(req, res, next) {
    const validation = rentalSchema.validate(req.body, { abortEarly: false });
  
    if (validation.error) {
      let statusCode = 422;
  
      const errors = validation.error.details.map(detail => detail.message);
  
      if(errors.includes("\"daysRented\" must be greater than or equal to 1")) statusCode = 400;
  
      return res.status(statusCode).send(errors);
    }
  
    next();
}

export default rentalValidate;