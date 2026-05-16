export type BillingPeriod = "monthly" | "yearly";

export type ServiceType = "ec2" | "storage" | "bandwidth";

export type MoneyBreakdown = {
  ec2: number;
  storage: number;
  bandwidth: number;
  monthlyTotal: number;
  yearlyTotal: number;
};

export type CalculatorInput = {
  region: string;
  instanceType: string;
  instanceCount: number;
  hoursPerDay: number;
  daysPerMonth: number;
  storageGb: number;
  storageClass: string;
  bandwidthGb: number;
};
