import type { CalculatorRequest } from "../schemas/calculator.schema.js";
import { bandwidthTiers, instanceTypes, regions, storageClasses } from "../data/pricing.js";
import { ApiError } from "../utils/api-error.js";

const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function getPricingCatalog() {
  return {
    regions,
    instanceTypes: instanceTypes.map((instance) => ({
      id: instance.id,
      name: instance.name,
      vcpu: instance.vcpu,
      memoryGb: instance.memoryGb,
      hourlyByRegion: instance.hourlyByRegion
    })),
    storageClasses,
    bandwidthTiers
  };
}

export function calculateEstimate(input: CalculatorRequest) {
  const region = regions.find((item) => item.id === input.region);
  const instance = instanceTypes.find((item) => item.id === input.instanceType);
  const storageClass = storageClasses.find((item) => item.id === input.storageClass);
  const bandwidthTier = bandwidthTiers[0];

  if (!region) {
    throw new ApiError(400, "Unsupported AWS region");
  }

  if (!instance) {
    throw new ApiError(400, "Unsupported EC2 instance type");
  }

  if (!storageClass) {
    throw new ApiError(400, "Unsupported storage class");
  }

  const hourlyPrice = instance.hourlyByRegion[input.region as keyof typeof instance.hourlyByRegion];
  const ec2Monthly = hourlyPrice * input.hoursPerDay * input.daysPerMonth * input.instanceCount;
  const storageMonthly = storageClass.monthlyPerGb * input.storageGb;
  const bandwidthMonthly = bandwidthTier.monthlyPerGb * input.bandwidthGb;
  const monthlyTotal = ec2Monthly + storageMonthly + bandwidthMonthly;

  return {
    currency: "USD",
    assumptions: {
      region: region.name,
      ec2HourlyPrice: hourlyPrice,
      storageMonthlyPerGb: storageClass.monthlyPerGb,
      bandwidthMonthlyPerGb: bandwidthTier.monthlyPerGb
    },
    breakdown: {
      ec2: roundMoney(ec2Monthly),
      storage: roundMoney(storageMonthly),
      bandwidth: roundMoney(bandwidthMonthly),
      monthlyTotal: roundMoney(monthlyTotal),
      yearlyTotal: roundMoney(monthlyTotal * 12)
    }
  };
}
