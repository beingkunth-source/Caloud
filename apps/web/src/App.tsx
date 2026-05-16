import { ArrowRight, BarChart3, CloudCog, ShieldCheck } from "lucide-react";
import { CostCalculator } from "@/components/calculator/CostCalculator";

const features = [
  { icon: CloudCog, title: "AWS-style pricing", text: "Estimate EC2, object storage, block storage, and bandwidth costs from one form." },
  { icon: BarChart3, title: "Cost breakdown", text: "See monthly totals, yearly projections, and category-level comparison charts." },
  { icon: ShieldCheck, title: "Production path", text: "Built to grow into auth, PostgreSQL, saved estimates, Docker, and deployment." }
];

export function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.20),_transparent_28%),#07111f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-300 p-2 text-ink">
            <CloudCog className="h-6 w-6" />
          </div>
          <span className="text-lg font-semibold">Cloud Cost Calculator</span>
        </div>
        <a href="#calculator" className="hidden rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 sm:inline-flex">
          Open calculator
        </a>
      </nav>

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-8 md:pb-20 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              Phase 1 MVP: EC2, storage, bandwidth, totals
            </div>
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              Forecast cloud spend before it surprises you.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A resume-worthy full-stack calculator for infrastructure pricing, designed to evolve into authentication, saved estimates, analytics, and production DevOps workflows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#calculator" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-6 py-4 font-semibold text-ink transition hover:bg-cyan-200">
                Start estimating <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://aws.amazon.com/ec2/pricing/on-demand/" className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-6 py-4 font-semibold text-slate-200 transition hover:bg-white/10">
                Compare with AWS pricing
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                <feature.icon className="h-7 w-7 text-cyan-200" />
                <h2 className="mt-4 text-lg font-semibold">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="mx-auto max-w-7xl px-5 pb-20">
        <CostCalculator />
      </section>
    </main>
  );
}
