import { Router } from "express";

import { 
    generateGames, 
    getGames 
} from "../controllers/gamesControllers.js";

import validateSchema from "../middlewares/validateSchema.js";

import gameSchema from "../schemas/gameSchema.js";

const gameRouter = Router();

gameRouter.get('/games', getGames),
gameRouter.post('/games', validateSchema(gameSchema), generateGames);

export default gameRouter;