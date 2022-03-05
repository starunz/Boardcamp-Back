import { Router } from "express";

import { getCaterogies, generateCategory } from "../controllers/categoriesController.js";

const categoryRouter = Router();

categoryRouter.get('/categories', getCaterogies);
categoryRouter.post('/categories', generateCategory);

export default categoryRouter;