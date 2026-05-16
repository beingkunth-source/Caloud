import type { Request, Response } from "express";
import { calculatorSchema } from "../schemas/calculator.schema.js";
import { calculateEstimate, getPricingCatalog } from "../services/calculator.service.js";

export function getCatalog(_req: Request, res: Response) {
  return res.json(getPricingCatalog());
}

export function calculate(req: Request, res: Response) {
  const input = calculatorSchema.parse(req.body);
  const estimate = calculateEstimate(input);

  return res.json(estimate);
}
