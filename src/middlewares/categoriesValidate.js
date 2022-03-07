import categoySchema from "../schemas/categorySchema.js";

function categoriesValidate(req, res, next) {
    const validation = categoySchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map(detail => detail.message);
  
      return res.status(400).send(errors);
    }

    next();
}

export default categoriesValidate;