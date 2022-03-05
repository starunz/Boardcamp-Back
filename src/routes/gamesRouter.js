import { Router } from "express";

import { generateGames} from "../controllers/gamesControllers.js";

const gameRouter = Router();


gameRouter.post('/games', generateGames);

export default gameRouter;