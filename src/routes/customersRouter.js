import { Router } from "express";

import { postCustomers, getCustomers } from "../controllers/customersCrontoller.js";

import { customersValidate } from "../middlewares/validateCustomers.js";

const customersRouter = Router()

customersRouter.get('/customers', getCustomers);
customersRouter.post('/customers', customersValidate, postCustomers);

export default customersRouter;