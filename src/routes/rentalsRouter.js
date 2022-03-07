import { Router } from "express";

import { postRentals } from "../controllers/rentalsController.js";

import rentalValidate from "../middlewares/validateRental.js";

const rentalsRouter = Router();

rentalsRouter.post('/rentals',rentalValidate, postRentals);

export default rentalsRouter;