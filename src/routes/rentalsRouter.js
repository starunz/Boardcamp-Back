import { Router } from "express";

import { 
    postRentals, 
    returnRental, 
    getRentals, 
    deleteRental 
} from "../controllers/rentalsController.js";

import rentalValidate from "../middlewares/validateRental.js";

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals',rentalValidate, postRentals);
rentalsRouter.post('/rentals/:id/return', returnRental);
rentalsRouter.delete('/rentals/:id', deleteRental);

export default rentalsRouter;