import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MIN_VOLUME = 10000;
const MAX_VOLUME = 350000;
const STEP = 5000;
const ANNUAL_DISCOUNT = 0.10;

function calcPrice(volume: number) {
  const clamped = Math.min(Math.max(volume, MIN_VOLUME), MAX_VOLUME);
  return 0.20 - ((clamped - MIN_VOLUME) / (MAX_VOLUME - MIN_VOLUME)) * 0.10;
}

function formatNumber(n: number) {
  if (n >= 1000) {
    const val = Math.ceil(n / 100) / 10;
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}k`;
  }
  return n.toString();
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [inputMode, setInputMode] = useState<"simple" | "advanced">("simple");
  const [totalApplicants, setTotalApplicants] = useState(50000);
  const [jobsPerYear, setJobsPerYear] = useState(100);
  const [applicantsPerJob, setApplicantsPerJob] = useState(500);

  const volume = useMemo(() => {
    if (inputMode === "simple") return totalApplicants;
    return Math.min(Math.max(jobsPerYear * applicantsPerJob, MIN_VOLUME), MAX_VOLUME);
  }, [inputMode, totalApplicants, jobsPerYear, applicantsPerJob]);

  const isMaxVolume = volume >= MAX_VOLUME;
  const pricePerApplicant = calcPrice(volume);
  const annualCost = volume * pricePerApplicant;
  const monthlyCost = annualCost / 12;
  const discountedAnnual = annualCost * (1 - ANNUAL_DISCOUNT);
  const displayCost = billing === "monthly" ? monthlyCost : (billing === "annual" ? discountedAnnual : annualCost);
  const savings = annualCost - discountedAnnual;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex flex-col">
      {/* Header */}
      <header className="pt-6 pb-4 px-6">
        <img src="https://cdn.prod.website-files.com/65fc7baec6d7cf07cc51252c/66176ddb2ecd499a5f0b541b_Logo.svg" alt="SquarePeg" className="h-16" />
      </header>
      <div className="text-center pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">SquarePeg Pricing</h1>
        <p className="mt-2 text-muted-foreground text-lg">Simple, volume-based pricing</p>
      </div>

      <main className="flex-1 flex items-start justify-center px-4 pb-16 pt-6">
        <div className="w-full max-w-2xl space-y-8">

          {/* Billing Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-full bg-muted p-1 gap-0.5">
              <button
                onClick={() => setBilling("monthly")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  billing === "monthly"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  billing === "annual"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Annual
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 leading-4 bg-purple-600 text-white">
                  Save 10%
                </Badge>
              </button>
            </div>
          </div>

          {/* Calculator Card */}
          <Card className="border-border/60 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8 space-y-8">

              {/* Input Mode Toggle */}
              <div className="flex justify-center">
                <div className="inline-flex rounded-lg bg-muted p-0.5 text-sm">
                  <button
                    onClick={() => setInputMode("simple")}
                    className={cn(
                      "px-4 py-1.5 rounded-md font-medium transition-all",
                      inputMode === "simple"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Simple
                  </button>
                  <button
                    onClick={() => setInputMode("advanced")}
                    className={cn(
                      "px-4 py-1.5 rounded-md font-medium transition-all",
                      inputMode === "advanced"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Advanced
                  </button>
                </div>
              </div>

              {/* Sliders */}
              {inputMode === "simple" ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm font-medium text-foreground">Total Applicants per Year</label>
                    <span className="text-2xl font-bold text-primary tabular-nums">
                      {formatNumber(totalApplicants)}
                    </span>
                  </div>
                  <Slider
                    value={[totalApplicants]}
                    onValueChange={([v]) => setTotalApplicants(v)}
                    min={MIN_VOLUME}
                    max={MAX_VOLUME}
                    step={STEP}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10k</span>
                    <span>350k</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <label className="text-sm font-medium text-foreground">Jobs per Year</label>
                      <span className="text-xl font-bold text-primary tabular-nums">{jobsPerYear.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[jobsPerYear]}
                      onValueChange={([v]) => setJobsPerYear(v)}
                      min={10}
                      max={1000}
                      step={10}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10</span>
                      <span>1,000</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <label className="text-sm font-medium text-foreground">Applicants per Job</label>
                      <span className="text-xl font-bold text-primary tabular-nums">{applicantsPerJob.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[applicantsPerJob]}
                      onValueChange={([v]) => setApplicantsPerJob(v)}
                      min={10}
                      max={1000}
                      step={10}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10</span>
                      <span>1,000</span>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Total: <span className="font-semibold text-foreground">{formatNumber(volume)}</span> applicants/year
                    {volume >= MAX_VOLUME && <span className="text-destructive ml-1">(capped at 350k)</span>}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Pricing Display */}
              {isMaxVolume ? (
                <div className="text-center space-y-4 py-4">
                  <p className="text-lg text-muted-foreground">Need more than 350k applicants?</p>
                  <Button size="lg" className="text-base px-8">
                    Talk to Sales
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-2 py-4">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium">
                    {billing === "monthly" ? "Estimated Monthly Cost" : "Estimated Annual Cost"}
                  </p>
                  <p className="text-5xl font-extrabold text-foreground tabular-nums tracking-tight">
                    {formatCurrency(displayCost)}
                  </p>
                  <p className="text-base text-muted-foreground">
                    <span className="font-semibold text-primary">${pricePerApplicant.toFixed(2)}</span> per applicant
                  </p>
                  {billing === "annual" && (
                    <p className="text-sm font-medium text-primary">
                      You save {formatCurrency(savings)} per year
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Card */}
          {!isMaxVolume && (
            <Card className="border-border/40 bg-muted/40">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Applicants/Year</p>
                    <p className="text-lg font-bold text-foreground tabular-nums">{formatNumber(volume)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Cost/Applicant</p>
                    <p className="text-lg font-bold text-foreground tabular-nums">${pricePerApplicant.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Monthly Total</p>
                    <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(monthlyCost)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Annual Total</p>
                    <p className="text-lg font-bold text-foreground tabular-nums">
                      {formatCurrency(billing === "annual" ? discountedAnnual : annualCost)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
