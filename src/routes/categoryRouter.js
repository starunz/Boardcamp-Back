import { Router } from "express";

import { getCaterogies } from "../controllers/categoriesController.js";

const categoryRouter = Router();

categoryRouter.get('/categories', getCaterogies);

export default categoryRouter;