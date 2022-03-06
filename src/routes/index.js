import { Router } from "express";

import categoryRouter from "./categoryRouter.js";
import gameRouter from "./gamesRouter.js";
import customersRouter from "./customersRouter.js";

const router = Router();

router.use(categoryRouter);
router.use(gameRouter);
router.use(customersRouter);

export default router;