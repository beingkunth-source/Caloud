import { Router } from "express";
import { calculate, getCatalog } from "../controllers/pricing.controller.js";

export const pricingRouter = Router();

pricingRouter.get("/catalog", getCatalog);
pricingRouter.post("/calculate", calculate);
