"use client";

import { Calculator, Cloud, Database, Network, Server } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { calculateCosts, getCatalog, type CalculationResult, type CalculatorPayload, type Catalog } from "@/lib/api";
import { formatCurrency } from "@/lib/format";

const defaultPayload: CalculatorPayload = {
  region: "us-east-1",
  instanceType: "t3.micro",
  instanceCount: 2,
  hoursPerDay: 8,
  daysPerMonth: 22,
  storageGb: 250,
  storageClass: "s3-standard",
  bandwidthGb: 100
};

const fallbackCatalog: Catalog = {
  regions: [
    { id: "us-east-1", name: "US East (N. Virginia)" },
    { id: "us-west-2", name: "US West (Oregon)" },
    { id: "eu-west-1", name: "Europe (Ireland)" },
    { id: "ap-south-1", name: "Asia Pacific (Mumbai)" }
  ],
  instanceTypes: [
    { id: "t3.micro", name: "t3.micro", vcpu: 2, memoryGb: 1, hourlyByRegion: { "us-east-1": 0.0104 } },
    { id: "t3.small", name: "t3.small", vcpu: 2, memoryGb: 2, hourlyByRegion: { "us-east-1": 0.0208 } },
    { id: "m6i.large", name: "m6i.large", vcpu: 2, memoryGb: 8, hourlyByRegion: { "us-east-1": 0.096 } },
    { id: "c6i.large", name: "c6i.large", vcpu: 2, memoryGb: 4, hourlyByRegion: { "us-east-1": 0.085 } }
  ],
  storageClasses: [
    { id: "s3-standard", name: "S3 Standard", monthlyPerGb: 0.023 },
    { id: "s3-standard-ia", name: "S3 Standard-IA", monthlyPerGb: 0.0125 },
    { id: "ebs-gp3", name: "EBS gp3", monthlyPerGb: 0.08 }
  ],
  bandwidthTiers: [{ id: "internet-egress", name: "Internet data transfer out", monthlyPerGb: 0.09 }]
};

function numberValue(value: FormDataEntryValue | null) {
  return Number(value ?? 0);
}

function localEstimate(payload: CalculatorPayload, catalog: Catalog): CalculationResult {
  const instance = catalog.instanceTypes.find((item) => item.id === payload.instanceType) ?? catalog.instanceTypes[0];
  const storageClass = catalog.storageClasses.find((item) => item.id === payload.storageClass) ?? catalog.storageClasses[0];
  const region = catalog.regions.find((item) => item.id === payload.region) ?? catalog.regions[0];
  const hourly = instance.hourlyByRegion[payload.region] ?? Object.values(instance.hourlyByRegion)[0] ?? 0;
  const ec2 = hourly * payload.instanceCount * payload.hoursPerDay * payload.daysPerMonth;
  const storage = storageClass.monthlyPerGb * payload.storageGb;
  const bandwidth = catalog.bandwidthTiers[0].monthlyPerGb * payload.bandwidthGb;
  const monthlyTotal = ec2 + storage + bandwidth;

  return {
    currency: "USD",
    assumptions: {
      region: region.name,
      ec2HourlyPrice: hourly,
      storageMonthlyPerGb: storageClass.monthlyPerGb,
      bandwidthMonthlyPerGb: catalog.bandwidthTiers[0].monthlyPerGb
    },
    breakdown: {
      ec2: Math.round(ec2 * 100) / 100,
      storage: Math.round(storage * 100) / 100,
      bandwidth: Math.round(bandwidth * 100) / 100,
      monthlyTotal: Math.round(monthlyTotal * 100) / 100,
      yearlyTotal: Math.round(monthlyTotal * 1200) / 100
    }
  };
}

export function CostCalculator() {
  const [catalog, setCatalog] = useState<Catalog>(fallbackCatalog);
  const [payload, setPayload] = useState<CalculatorPayload>(defaultPayload);
  const [result, setResult] = useState<CalculationResult>(() => localEstimate(defaultPayload, fallbackCatalog));
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [status, setStatus] = useState("Using local pricing defaults until the API responds.");

  useEffect(() => {
    getCatalog()
      .then((nextCatalog) => {
        setCatalog(nextCatalog);
        setResult(localEstimate(defaultPayload, nextCatalog));
        setStatus("Connected to the pricing API.");
      })
      .catch(() => {
        setStatus("API offline: showing local MVP pricing defaults.");
      });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextPayload: CalculatorPayload = {
      region: String(formData.get("region")),
      instanceType: String(formData.get("instanceType")),
      instanceCount: numberValue(formData.get("instanceCount")),
      hoursPerDay: numberValue(formData.get("hoursPerDay")),
      daysPerMonth: numberValue(formData.get("daysPerMonth")),
      storageGb: numberValue(formData.get("storageGb")),
      storageClass: String(formData.get("storageClass")),
      bandwidthGb: numberValue(formData.get("bandwidthGb"))
    };

    setPayload(nextPayload);
    setResult(localEstimate(nextPayload, catalog));

    try {
      const apiResult = await calculateCosts(nextPayload);
      setResult(apiResult);
      setStatus("Estimate calculated by the Express API.");
    } catch (error) {
      setStatus(error instanceof Error ? `API unavailable: ${error.message}` : "API unavailable: using local estimate.");
    }
  }

  const chartData = useMemo(
    () => [
      { name: "EC2", cost: result.breakdown.ec2 },
      { name: "Storage", cost: result.breakdown.storage },
      { name: "Bandwidth", cost: result.breakdown.bandwidth }
    ],
    [result]
  );

  const headlineTotal = period === "monthly" ? result.breakdown.monthlyTotal : result.breakdown.yearlyTotal;

  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-glow backdrop-blur md:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-300">
            <Calculator className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Estimate infrastructure cost</h2>
            <p className="text-sm text-slate-400">Phase 1 MVP calculator with API-backed totals.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300">AWS region</span>
            <select name="region" defaultValue={payload.region} className="w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 outline-none ring-cyan-400/40 focus:ring-4">
              {catalog.regions.map((region) => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300">Instance type</span>
            <select name="instanceType" defaultValue={payload.instanceType} className="w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 outline-none ring-cyan-400/40 focus:ring-4">
              {catalog.instanceTypes.map((instance) => (
                <option key={instance.id} value={instance.id}>{instance.name} - {instance.vcpu} vCPU / {instance.memoryGb} GB</option>
              ))}
            </select>
          </label>

          <NumberInput label="Instances" name="instanceCount" defaultValue={payload.instanceCount} icon={<Server className="h-4 w-4" />} />
          <NumberInput label="Hours per day" name="hoursPerDay" defaultValue={payload.hoursPerDay} />
          <NumberInput label="Days per month" name="daysPerMonth" defaultValue={payload.daysPerMonth} />
          <NumberInput label="Storage GB" name="storageGb" defaultValue={payload.storageGb} icon={<Database className="h-4 w-4" />} />

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300">Storage class</span>
            <select name="storageClass" defaultValue={payload.storageClass} className="w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 outline-none ring-cyan-400/40 focus:ring-4">
              {catalog.storageClasses.map((storage) => (
                <option key={storage.id} value={storage.id}>{storage.name} - ${storage.monthlyPerGb}/GB</option>
              ))}
            </select>
          </label>

          <NumberInput label="Bandwidth GB" name="bandwidthGb" defaultValue={payload.bandwidthGb} icon={<Network className="h-4 w-4" />} />
        </div>

        <button className="mt-6 w-full rounded-2xl bg-cyan-300 px-5 py-4 font-semibold text-ink transition hover:bg-cyan-200" type="submit">
          Calculate monthly cost
        </button>
      </form>

      <aside className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.08] p-5 shadow-glow md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-200">Total estimate</p>
            <h2 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">{formatCurrency(headlineTotal)}</h2>
            <p className="mt-2 text-sm text-slate-300">{period === "monthly" ? "Monthly run rate" : "Projected yearly spend"}</p>
          </div>
          <Cloud className="h-10 w-10 text-cyan-200" />
        </div>

        <div className="mt-6 inline-flex rounded-full border border-white/10 bg-ink/60 p-1">
          <button onClick={() => setPeriod("monthly")} className={`rounded-full px-4 py-2 text-sm ${period === "monthly" ? "bg-white text-ink" : "text-slate-300"}`} type="button">Monthly</button>
          <button onClick={() => setPeriod("yearly")} className={`rounded-full px-4 py-2 text-sm ${period === "yearly" ? "bg-white text-ink" : "text-slate-300"}`} type="button">Yearly</button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <CostCard label="EC2" value={result.breakdown.ec2} />
          <CostCard label="Storage" value={result.breakdown.storage} />
          <CostCard label="Bandwidth" value={result.breakdown.bandwidth} />
        </div>

        <div className="mt-7 h-64 rounded-3xl border border-white/10 bg-ink/70 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.16)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#07111f", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px" }} />
              <Bar dataKey="cost" fill="#67e8f9" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-300">{status}</p>
      </aside>
    </section>
  );
}

function NumberInput({ label, name, defaultValue, icon }: { label: string; name: keyof CalculatorPayload; defaultValue: number; icon?: React.ReactNode }) {
  return (
    <label className="space-y-2">
      <span className="flex items-center gap-2 text-sm font-medium text-slate-300">{icon}{label}</span>
      <input name={name} type="number" min="0" step="any" defaultValue={defaultValue} className="w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 outline-none ring-cyan-400/40 focus:ring-4" />
    </label>
  );
}

function CostCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold">{formatCurrency(value)}</p>
    </div>
  );
}
