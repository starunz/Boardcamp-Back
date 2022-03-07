import { Router } from "express";

import { postCustomers, getCustomers, getCustomer, putCustomer } from "../controllers/customersCrontoller.js";

import { customersValidate } from "../middlewares/validateCustomers.js";

const customersRouter = Router()

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomer);
customersRouter.post('/customers', customersValidate, postCustomers);
customersRouter.put('/customers/:id', putCustomer);

export default customersRouter;