import { z } from "zod";

export const calculatorSchema = z.object({
  region: z.string().min(1),
  instanceType: z.string().min(1),
  instanceCount: z.coerce.number().int().min(0).max(1000),
  hoursPerDay: z.coerce.number().min(0).max(24),
  daysPerMonth: z.coerce.number().min(0).max(31),
  storageGb: z.coerce.number().min(0).max(10_000_000),
  storageClass: z.string().min(1),
  bandwidthGb: z.coerce.number().min(0).max(10_000_000)
});

export type CalculatorRequest = z.infer<typeof calculatorSchema>;
