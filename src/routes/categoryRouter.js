import { Router } from "express";

import { getCaterogies, generateCategory } from "../controllers/categoriesController.js";
import categoriesValidate from "../middlewares/categoriesValidate.js";

const categoryRouter = Router();

categoryRouter.get('/categories', getCaterogies);
categoryRouter.post('/categories', categoriesValidate,generateCategory);

export default categoryRouter;