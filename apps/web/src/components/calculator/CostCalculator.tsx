"use client";

import { Calculator, Cloud, Database, Network, Server, Share2 } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, PieChart, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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
    { id: "us-east-2", name: "US East (Ohio)" },
    { id: "us-west-1", name: "US West (N. California)" },
    { id: "us-west-2", name: "US West (Oregon)" },
    { id: "eu-west-1", name: "Europe (Ireland)" },
    { id: "eu-central-1", name: "Europe (Frankfurt)" },
    { id: "ap-south-1", name: "Asia Pacific (Mumbai)" },
    { id: "ap-northeast-1", name: "Asia Pacific (Tokyo)" },
    { id: "ap-southeast-1", name: "Asia Pacific (Singapore)" }
  ],
  instanceTypes: [
    {
      id: "t3.micro",
      name: "t3.micro",
      vcpu: 2,
      memoryGb: 1,
      hourlyByRegion: {
        "us-east-1": 0.0104,
        "us-east-2": 0.0104,
        "us-west-1": 0.0120,
        "us-west-2": 0.0104,
        "eu-west-1": 0.0114,
        "eu-central-1": 0.0122,
        "ap-south-1": 0.0128,
        "ap-northeast-1": 0.0132,
        "ap-southeast-1": 0.0124
      }
    },
    {
      id: "t3.small",
      name: "t3.small",
      vcpu: 2,
      memoryGb: 2,
      hourlyByRegion: {
        "us-east-1": 0.0208,
        "us-east-2": 0.0208,
        "us-west-1": 0.0240,
        "us-west-2": 0.0208,
        "eu-west-1": 0.0228,
        "eu-central-1": 0.0244,
        "ap-south-1": 0.0256,
        "ap-northeast-1": 0.0264,
        "ap-southeast-1": 0.0248
      }
    },
    {
      id: "t3.medium",
      name: "t3.medium",
      vcpu: 2,
      memoryGb: 4,
      hourlyByRegion: {
        "us-east-1": 0.0416,
        "us-east-2": 0.0416,
        "us-west-1": 0.0480,
        "us-west-2": 0.0416,
        "eu-west-1": 0.0456,
        "eu-central-1": 0.0488,
        "ap-south-1": 0.0512,
        "ap-northeast-1": 0.0528,
        "ap-southeast-1": 0.0496
      }
    },
    {
      id: "t3.large",
      name: "t3.large",
      vcpu: 2,
      memoryGb: 8,
      hourlyByRegion: {
        "us-east-1": 0.0832,
        "us-east-2": 0.0832,
        "us-west-1": 0.0960,
        "us-west-2": 0.0832,
        "eu-west-1": 0.0912,
        "eu-central-1": 0.0976,
        "ap-south-1": 0.1024,
        "ap-northeast-1": 0.1056,
        "ap-southeast-1": 0.0992
      }
    },
    {
      id: "m6i.large",
      name: "m6i.large",
      vcpu: 2,
      memoryGb: 8,
      hourlyByRegion: {
        "us-east-1": 0.0960,
        "us-east-2": 0.0960,
        "us-west-1": 0.1100,
        "us-west-2": 0.0960,
        "eu-west-1": 0.1070,
        "eu-central-1": 0.1140,
        "ap-south-1": 0.1150,
        "ap-northeast-1": 0.1200,
        "ap-southeast-1": 0.1120
      }
    },
    {
      id: "m6i.xlarge",
      name: "m6i.xlarge",
      vcpu: 4,
      memoryGb: 16,
      hourlyByRegion: {
        "us-east-1": 0.1920,
        "us-east-2": 0.1920,
        "us-west-1": 0.2200,
        "us-west-2": 0.1920,
        "eu-west-1": 0.2140,
        "eu-central-1": 0.2280,
        "ap-south-1": 0.2300,
        "ap-northeast-1": 0.2400,
        "ap-southeast-1": 0.2240
      }
    },
    {
      id: "m6i.2xlarge",
      name: "m6i.2xlarge",
      vcpu: 8,
      memoryGb: 32,
      hourlyByRegion: {
        "us-east-1": 0.3840,
        "us-east-2": 0.3840,
        "us-west-1": 0.4400,
        "us-west-2": 0.3840,
        "eu-west-1": 0.4280,
        "eu-central-1": 0.4560,
        "ap-south-1": 0.4600,
        "ap-northeast-1": 0.4800,
        "ap-southeast-1": 0.4480
      }
    },
    {
      id: "c6i.large",
      name: "c6i.large",
      vcpu: 2,
      memoryGb: 4,
      hourlyByRegion: {
        "us-east-1": 0.0850,
        "us-east-2": 0.0850,
        "us-west-1": 0.0980,
        "us-west-2": 0.0850,
        "eu-west-1": 0.0950,
        "eu-central-1": 0.1020,
        "ap-south-1": 0.1020,
        "ap-northeast-1": 0.1060,
        "ap-southeast-1": 0.0990
      }
    },
    {
      id: "c6i.xlarge",
      name: "c6i.xlarge",
      vcpu: 4,
      memoryGb: 8,
      hourlyByRegion: {
        "us-east-1": 0.1700,
        "us-east-2": 0.1700,
        "us-west-1": 0.1960,
        "us-west-2": 0.1700,
        "eu-west-1": 0.1900,
        "eu-central-1": 0.2040,
        "ap-south-1": 0.2040,
        "ap-northeast-1": 0.2120,
        "ap-southeast-1": 0.1980
      }
    },
    {
      id: "c6i.2xlarge",
      name: "c6i.2xlarge",
      vcpu: 8,
      memoryGb: 16,
      hourlyByRegion: {
        "us-east-1": 0.3400,
        "us-east-2": 0.3400,
        "us-west-1": 0.3920,
        "us-west-2": 0.3400,
        "eu-west-1": 0.3800,
        "eu-central-1": 0.4080,
        "ap-south-1": 0.4080,
        "ap-northeast-1": 0.4240,
        "ap-southeast-1": 0.3960
      }
    },
    {
      id: "r6i.large",
      name: "r6i.large",
      vcpu: 2,
      memoryGb: 16,
      hourlyByRegion: {
        "us-east-1": 0.1260,
        "us-east-2": 0.1260,
        "us-west-1": 0.1450,
        "us-west-2": 0.1260,
        "eu-west-1": 0.1410,
        "eu-central-1": 0.1500,
        "ap-south-1": 0.1510,
        "ap-northeast-1": 0.1580,
        "ap-southeast-1": 0.1470
      }
    },
    {
      id: "r6i.xlarge",
      name: "r6i.xlarge",
      vcpu: 4,
      memoryGb: 32,
      hourlyByRegion: {
        "us-east-1": 0.2520,
        "us-east-2": 0.2520,
        "us-west-1": 0.2900,
        "us-west-2": 0.2520,
        "eu-west-1": 0.2820,
        "eu-central-1": 0.3000,
        "ap-south-1": 0.3020,
        "ap-northeast-1": 0.3160,
        "ap-southeast-1": 0.2940
      }
    },
    {
      id: "r6i.2xlarge",
      name: "r6i.2xlarge",
      vcpu: 8,
      memoryGb: 64,
      hourlyByRegion: {
        "us-east-1": 0.5040,
        "us-east-2": 0.5040,
        "us-west-1": 0.5800,
        "us-west-2": 0.5040,
        "eu-west-1": 0.5640,
        "eu-central-1": 0.6000,
        "ap-south-1": 0.6040,
        "ap-northeast-1": 0.6320,
        "ap-southeast-1": 0.5880
      }
    },
    {
      id: "g5.xlarge",
      name: "g5.xlarge",
      vcpu: 4,
      memoryGb: 16,
      hourlyByRegion: {
        "us-east-1": 1.0060,
        "us-east-2": 1.0060,
        "us-west-1": 1.1570,
        "us-west-2": 1.0060,
        "eu-west-1": 1.1270,
        "eu-central-1": 1.2070,
        "ap-south-1": 1.2070,
        "ap-northeast-1": 1.2580,
        "ap-southeast-1": 1.1770
      }
    },
    {
      id: "g5.2xlarge",
      name: "g5.2xlarge",
      vcpu: 8,
      memoryGb: 32,
      hourlyByRegion: {
        "us-east-1": 1.2120,
        "us-east-2": 1.2120,
        "us-west-1": 1.3940,
        "us-west-2": 1.2120,
        "eu-west-1": 1.3580,
        "eu-central-1": 1.4540,
        "ap-south-1": 1.4540,
        "ap-northeast-1": 1.5150,
        "ap-southeast-1": 1.4180
      }
    }
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

function getPayloadFromUrl(): CalculatorPayload | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const region = params.get("region");
  const instanceType = params.get("instanceType");
  const instanceCount = params.get("instanceCount");
  const hoursPerDay = params.get("hoursPerDay");
  const daysPerMonth = params.get("daysPerMonth");
  const storageGb = params.get("storageGb");
  const storageClass = params.get("storageClass");
  const bandwidthGb = params.get("bandwidthGb");

  if (!region || !instanceType) return null;

  return {
    region,
    instanceType,
    instanceCount: Number(instanceCount || 0),
    hoursPerDay: Number(hoursPerDay || 0),
    daysPerMonth: Number(daysPerMonth || 0),
    storageGb: Number(storageGb || 0),
    storageClass: storageClass || "",
    bandwidthGb: Number(bandwidthGb || 0)
  };
}

export function CostCalculator() {
  const [catalog, setCatalog] = useState<Catalog>(fallbackCatalog);
  const [payload, setPayload] = useState<CalculatorPayload>(() => {
    return getPayloadFromUrl() ?? defaultPayload;
  });
  const [result, setResult] = useState<CalculationResult>(() => localEstimate(payload, fallbackCatalog));
  const [period, setPeriod] = useState<"monthly" | "yearly">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pricing_period");
      if (saved === "monthly" || saved === "yearly") {
        return saved;
      }
    }
    return "monthly";
  });
  const [status, setStatus] = useState("Using local pricing defaults until the API responds.");
  const [activeTab, setActiveTab] = useState<"breakdown" | "regions" | "scaling">("breakdown");
  const [copied, setCopied] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    localStorage.setItem("pricing_period", period);
  }, [period]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      Object.entries(payload).forEach(([key, val]) => {
        params.set(key, String(val));
      });
      window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
    }
  }, [payload]);

  useEffect(() => {
    getCatalog()
      .then((nextCatalog) => {
        setCatalog(nextCatalog);
        setResult(localEstimate(payload, nextCatalog));
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

  // --- Calculations for Analytics Charts ---

  // Donut Chart: Service cost breakdown
  const chartBreakdownData = useMemo(() => [
    { name: "EC2", value: result.breakdown.ec2 },
    { name: "Storage", value: result.breakdown.storage },
    { name: "Bandwidth", value: result.breakdown.bandwidth }
  ], [result]);

  const COLORS = ["#22d3ee", "#3b82f6", "#818cf8"];

  // Bar Chart: Regions cost comparison
  const chartRegionsData = useMemo(() => {
    return catalog.regions.map((r) => {
      const regionalPayload = { ...payload, region: r.id };
      const regionalResult = localEstimate(regionalPayload, catalog);
      const cost = period === "monthly" ? regionalResult.breakdown.monthlyTotal : regionalResult.breakdown.yearlyTotal;
      return {
        id: r.id,
        name: r.id,
        fullName: r.name,
        cost
      };
    });
  }, [catalog, payload, period]);

  // Bar Chart: Instance scaling comparison
  const chartScalingData = useMemo(() => {
    const currentPrefix = payload.instanceType.split(".")[0];
    const familyInstances = catalog.instanceTypes.filter((inst) => inst.id.startsWith(currentPrefix));
    
    return familyInstances.map((inst) => {
      const scalingPayload = { ...payload, instanceType: inst.id };
      const scalingResult = localEstimate(scalingPayload, catalog);
      const cost = period === "monthly" ? scalingResult.breakdown.monthlyTotal : scalingResult.breakdown.yearlyTotal;
      return {
        name: inst.name,
        cost
      };
    });
  }, [catalog, payload, period]);

  // --- Portability Action Handlers ---

  function exportToJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cloud_cost_estimate_${payload.instanceType}_${payload.region}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  function exportToCsv() {
    const rows = [
      ["Parameter", "Value"],
      ["AWS Region", result.assumptions.region],
      ["Instance Type", payload.instanceType],
      ["Instance Count", payload.instanceCount.toString()],
      ["Hours Per Day", payload.hoursPerDay.toString()],
      ["Days Per Month", payload.daysPerMonth.toString()],
      ["Hourly EC2 Rate", `$${result.assumptions.ec2HourlyPrice.toFixed(4)}`],
      ["Storage GB", payload.storageGb.toString()],
      ["Storage Class", payload.storageClass],
      ["Storage Monthly Rate/GB", `$${result.assumptions.storageMonthlyPerGb.toFixed(4)}`],
      ["Bandwidth GB", payload.bandwidthGb.toString()],
      ["Bandwidth Rate/GB", `$${result.assumptions.bandwidthMonthlyPerGb.toFixed(4)}`],
      [],
      ["Cost Component", "Monthly Cost (USD)", "Yearly Cost (USD)"],
      ["EC2 Compute", result.breakdown.ec2.toFixed(2), (result.breakdown.ec2 * 12).toFixed(2)],
      ["Storage", result.breakdown.storage.toFixed(2), (result.breakdown.storage * 12).toFixed(2)],
      ["Bandwidth", result.breakdown.bandwidth.toFixed(2), (result.breakdown.bandwidth * 12).toFixed(2)],
      ["Total", result.breakdown.monthlyTotal.toFixed(2), result.breakdown.yearlyTotal.toFixed(2)]
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(",")).join("\n");
      
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", `cloud_cost_estimate_${payload.instanceType}_${payload.region}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  function handleJsonImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed && typeof parsed === "object") {
          const importedPayload: CalculatorPayload = {
            region: String(parsed.region ?? defaultPayload.region),
            instanceType: String(parsed.instanceType ?? defaultPayload.instanceType),
            instanceCount: Number(parsed.instanceCount ?? defaultPayload.instanceCount),
            hoursPerDay: Number(parsed.hoursPerDay ?? defaultPayload.hoursPerDay),
            daysPerMonth: Number(parsed.daysPerMonth ?? defaultPayload.daysPerMonth),
            storageGb: Number(parsed.storageGb ?? defaultPayload.storageGb),
            storageClass: String(parsed.storageClass ?? defaultPayload.storageClass),
            bandwidthGb: Number(parsed.bandwidthGb ?? defaultPayload.bandwidthGb)
          };
          setPayload(importedPayload);
          setResult(localEstimate(importedPayload, catalog));
          setFormKey((prev) => prev + 1);
          setStatus("Configuration successfully imported from JSON.");
        }
      } catch (err) {
        setStatus("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  }

  function copyShareLink() {
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, val]) => {
      params.set(key, String(val));
    });
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const headlineTotal = period === "monthly" ? result.breakdown.monthlyTotal : result.breakdown.yearlyTotal;

  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <form onSubmit={handleSubmit} key={formKey} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-glow backdrop-blur md:p-7 flex flex-col justify-between">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-300">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Estimate infrastructure cost</h2>
              <p className="text-sm text-slate-400">Phase 3 calculator with deep pricing and sharing.</p>
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
            Calculate cost
          </button>
        </div>

        {/* Portability / Share Actions Panel */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Estimate Actions</p>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={exportToJson} 
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
              type="button"
            >
              Export JSON
            </button>
            <button 
              onClick={exportToCsv} 
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
              type="button"
            >
              Export CSV
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <label className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white cursor-pointer select-none">
              <span>Import JSON</span>
              <input 
                type="file" 
                accept=".json" 
                onChange={handleJsonImport} 
                className="hidden" 
              />
            </label>
            <button 
              onClick={copyShareLink} 
              className={`rounded-2xl border px-4 py-3 text-sm font-medium transition flex items-center justify-center gap-2 ${copied ? "bg-cyan-500/20 border-cyan-400/30 text-cyan-300" : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white"}`}
              type="button"
            >
              <Share2 className="h-4 w-4" />
              {copied ? "Copied!" : "Share Link"}
            </button>
          </div>
        </div>
      </form>

      <aside className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.08] p-5 shadow-glow md:p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-200">Total estimate</p>
              <h2 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">{formatCurrency(headlineTotal)}</h2>
              <p className="mt-2 text-sm text-slate-300">{period === "monthly" ? "Monthly run rate" : "Projected yearly spend"}</p>
            </div>
            <Cloud className="h-10 w-10 text-cyan-200 animate-pulse" />
          </div>

          <div className="mt-6 inline-flex rounded-full border border-white/10 bg-ink/60 p-1">
            <button onClick={() => setPeriod("monthly")} className={`rounded-full px-4 py-2 text-sm transition ${period === "monthly" ? "bg-white text-ink font-semibold" : "text-slate-300 hover:text-white"}`} type="button">Monthly</button>
            <button onClick={() => setPeriod("yearly")} className={`rounded-full px-4 py-2 text-sm transition ${period === "yearly" ? "bg-white text-ink font-semibold" : "text-slate-300 hover:text-white"}`} type="button">Yearly</button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <CostCard label="EC2 Compute" value={result.breakdown.ec2} />
            <CostCard label="Storage" value={result.breakdown.storage} />
            <CostCard label="Bandwidth" value={result.breakdown.bandwidth} />
          </div>
        </div>

        {/* Analytics Tabs and charts */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Pricing Analytics</p>
            <div className="flex bg-ink/50 border border-white/10 rounded-xl p-0.5">
              <button 
                onClick={() => setActiveTab("breakdown")} 
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${activeTab === "breakdown" ? "bg-cyan-300 text-ink" : "text-slate-400 hover:text-slate-200"}`}
                type="button"
              >
                Breakdown
              </button>
              <button 
                onClick={() => setActiveTab("regions")} 
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${activeTab === "regions" ? "bg-cyan-300 text-ink" : "text-slate-400 hover:text-slate-200"}`}
                type="button"
              >
                Regions
              </button>
              <button 
                onClick={() => setActiveTab("scaling")} 
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${activeTab === "scaling" ? "bg-cyan-300 text-ink" : "text-slate-400 hover:text-slate-200"}`}
                type="button"
              >
                Scaling
              </button>
            </div>
          </div>

          <div className="h-64 rounded-3xl border border-white/10 bg-ink/70 p-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === "breakdown" ? (
                <PieChart>
                  <Pie
                    data={chartBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ background: "#07111f", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px" }} />
                  <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-slate-300 text-xs font-medium">{value}</span>} />
                </PieChart>
              ) : activeTab === "regions" ? (
                <BarChart data={chartRegionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={9} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)} 
                    labelFormatter={(label) => {
                      const regionObj = chartRegionsData.find((r) => r.id === label);
                      return regionObj ? regionObj.fullName : label;
                    }}
                    contentStyle={{ background: "#07111f", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px" }} 
                  />
                  <Bar dataKey="cost" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                    {chartRegionsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.id === payload.region ? "#22d3ee" : "#3b82f6"} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <BarChart data={chartScalingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={9} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ background: "#07111f", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px" }} />
                  <Bar dataKey="cost" fill="#818cf8" radius={[6, 6, 0, 0]}>
                    {chartScalingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === payload.instanceType ? "#22d3ee" : "#818cf8"} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
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
      <input name={name} type="number" min="0" step="any" defaultValue={defaultValue} className="w-full rounded-2xl border border-white/10 bg-ink px-4 py-3 outline-none ring-cyan-400/40 focus:ring-4 text-white" />
    </label>
  );
}

function CostCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{formatCurrency(value)}</p>
    </div>
  );
}
