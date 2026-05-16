export type Catalog = {
  regions: Array<{ id: string; name: string }>;
  instanceTypes: Array<{
    id: string;
    name: string;
    vcpu: number;
    memoryGb: number;
    hourlyByRegion: Record<string, number>;
  }>;
  storageClasses: Array<{ id: string; name: string; monthlyPerGb: number }>;
  bandwidthTiers: Array<{ id: string; name: string; monthlyPerGb: number }>;
};

export type CalculatorPayload = {
  region: string;
  instanceType: string;
  instanceCount: number;
  hoursPerDay: number;
  daysPerMonth: number;
  storageGb: number;
  storageClass: string;
  bandwidthGb: number;
};

export type CalculationResult = {
  currency: "USD";
  assumptions: {
    region: string;
    ec2HourlyPrice: number;
    storageMonthlyPerGb: number;
    bandwidthMonthlyPerGb: number;
  };
  breakdown: {
    ec2: number;
    storage: number;
    bandwidth: number;
    monthlyTotal: number;
    yearlyTotal: number;
  };
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(body.message ?? "Request failed");
  }

  return response.json() as Promise<T>;
}

export function getCatalog() {
  return request<Catalog>("/pricing/catalog", { cache: "no-store" });
}

export function calculateCosts(payload: CalculatorPayload) {
  return request<CalculationResult>("/pricing/calculate", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
