"use client";

import { use, useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Heart,
  Share2,
  Copy,
  Check,
  Users,
  ShieldCheck,
  Building2,
  Smartphone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getBillById } from "@/lib/sample-bills";
import type { FundingSource } from "@/types";

// Custom animated counter using requestAnimationFrame (zero dependencies)
function useAnimatedCounter(target: number, duration: number, shouldAnimate: boolean) {
  const [value, setValue] = useState(target);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setValue(target);
      return;
    }

    const startValue = value;
    const startTime = performance.now();
    const diff = target - startValue;

    if (diff === 0) return;

    const animate = (currentTime: number) => {
      try {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOut curve
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startValue + diff * eased);
        setValue(current);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      } catch {
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, shouldAnimate]);

  return value;
}

const statusConfig = {
  pending: {
    bg: "bg-gray-50 border-gray-200",
    text: "text-gray-500",
    icon: Clock,
    label: "Pending",
    badgeClass: "bg-gray-100 text-gray-600",
  },
  approved: {
    bg: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-700",
    icon: CheckCircle2,
    label: "Approved",
    badgeClass: "bg-emerald-100 text-emerald-700",
  },
  denied: {
    bg: "bg-red-50 border-red-200",
    text: "text-red-600",
    icon: XCircle,
    label: "Denied",
    badgeClass: "bg-red-100 text-red-600",
  },
  partial: {
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
    icon: AlertTriangle,
    label: "Partial",
    badgeClass: "bg-amber-100 text-amber-700",
  },
};

function BillTrackerContent({ billId }: { billId: string }) {
  const searchParams = useSearchParams();
  const autoplay = searchParams.get("autoplay") === "true";

  const bill = useMemo(() => getBillById(billId), [billId]);

  const [revealedSources, setRevealedSources] = useState<number>(autoplay ? 0 : 999);
  const [showCrowdfunding, setShowCrowdfunding] = useState(!autoplay);
  const [copied, setCopied] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    if (mq.matches && autoplay) {
      setRevealedSources(999);
      setShowCrowdfunding(true);
    }
  }, [autoplay]);

  // Autoplay sequence: reveal sources one by one
  useEffect(() => {
    if (!autoplay || prefersReducedMotion || !bill) return;

    const totalSources = bill.fundingSources.length;
    let currentIndex = 0;

    // Start after 500ms
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        currentIndex++;
        setRevealedSources(currentIndex);

        if (currentIndex >= totalSources) {
          clearInterval(interval);
          // Show crowdfunding after last source
          setTimeout(() => setShowCrowdfunding(true), 2000);
        }
      }, 2000); // 1.5s animation + 0.5s pause

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(startTimer);
  }, [autoplay, prefersReducedMotion, bill]);

  // Not found state
  if (!bill) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="mx-auto max-w-lg text-center">
          <Building2 className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Bill Not Found</h1>
          <p className="text-gray-500 mb-6">
            This bill tracker page doesn&apos;t exist yet. MedBridge is currently in demo mode.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/track">
              <Button variant="outline">View Demo Tracker</Button>
            </Link>
            <Link href="/track/bill-001?autoplay=true">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Watch Demo Bill
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate current displayed bill total based on revealed sources
  const approvedTotal = bill.fundingSources
    .slice(0, revealedSources)
    .reduce((sum, src) => {
      if (src.status === "approved") return sum + src.approvedAmount;
      if (src.status === "partial") return sum + src.approvedAmount;
      return sum;
    }, 0);

  const crowdfundingAmount = showCrowdfunding ? bill.crowdfunding.raised : 0;
  const currentRemaining = Math.max(0, bill.totalBill - approvedTotal - crowdfundingAmount);

  const shouldAnimate = !prefersReducedMotion && autoplay;
  const displayedTotal = useAnimatedCounter(currentRemaining, 1500, shouldAnimate);

  const handleCopy = useCallback(() => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // Fallback: create a temporary input
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const percentCovered = Math.round(
    ((bill.totalBill - currentRemaining) / bill.totalBill) * 100
  );

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 pb-6 pt-6 text-white">
        <div className="mx-auto max-w-lg">
          <Link
            href="/track"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </Link>
          <h1 className="text-lg font-bold">{bill.patientName}</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {bill.age} yrs old &middot; {bill.hospitalName}
          </p>
          <p className="text-sm text-gray-300 mt-1">{bill.diagnosis}</p>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="mx-auto max-w-lg space-y-4">
          {/* Bill Total — the star of the show */}
          <Card className={`border-2 transition-colors duration-1000 ${
            currentRemaining === 0 ? "border-emerald-400 bg-emerald-50" : "border-gray-200"
          }`}>
            <CardContent className="p-6 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                Remaining Balance
              </p>
              <p
                className={`text-4xl font-bold tabular-nums transition-colors duration-500 ${
                  currentRemaining === 0 ? "text-emerald-600" : "text-gray-900"
                }`}
                aria-live="polite"
                role="status"
              >
                PHP {displayedTotal.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                of PHP {bill.totalBill.toLocaleString()} total hospital bill
              </p>
              <div className="mt-3">
                <Progress value={percentCovered} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">{percentCovered}% covered</p>
              </div>
              {currentRemaining === 0 && (
                <div className="mt-3 flex items-center justify-center gap-2 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-semibold">Fully Covered!</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Funding Waterfall */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Funding Sources
            </h2>
            <div className="space-y-2">
              {bill.fundingSources.map((source, index) => (
                <FundingSourceCard
                  key={source.id}
                  source={source}
                  revealed={index < revealedSources}
                  animate={shouldAnimate}
                />
              ))}

              {/* Crowdfunding card */}
              <div
                className={`transition-all duration-700 ${
                  showCrowdfunding
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <Card className="border-rose-200 bg-rose-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-rose-100 p-2">
                        <Heart className="h-5 w-5 text-rose-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            Community Crowdfunding
                          </h3>
                          <Badge className="bg-rose-100 text-rose-600 text-[10px]">
                            {bill.crowdfunding.raised >= bill.crowdfunding.goal
                              ? "Fully Funded"
                              : "Active"}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Direct-to-hospital payment via GCash / Maya
                        </p>
                        <div className="mt-2 space-y-1.5">
                          <Progress
                            value={Math.min(
                              (bill.crowdfunding.raised / bill.crowdfunding.goal) * 100,
                              100
                            )}
                            className="h-2"
                          />
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-rose-600">
                              PHP {bill.crowdfunding.raised.toLocaleString()}
                            </span>
                            <span className="text-gray-500">
                              of PHP {bill.crowdfunding.goal.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              {bill.crowdfunding.donorCount} donors
                            </span>
                            <span className="flex items-center gap-1">
                              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                              Hospital verified
                            </span>
                          </div>
                        </div>

                        {/* Payment method placeholders */}
                        <div className="mt-3 flex gap-2">
                          <div className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600">
                            <Smartphone className="h-3.5 w-3.5 text-blue-500" />
                            GCash
                          </div>
                          <div className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600">
                            <Smartphone className="h-3.5 w-3.5 text-green-500" />
                            Maya
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Bill Line Items */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Bill Breakdown</h3>
              <div className="space-y-2">
                {bill.lineItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-medium tabular-nums">
                      PHP {item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="tabular-nums">PHP {bill.totalBill.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="mr-2 h-4 w-4 text-emerald-500" />
              ) : (
                <Share2 className="mr-2 h-4 w-4" />
              )}
              {copied ? "Link Copied!" : "Share This Bill's Journey"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FundingSourceCard({
  source,
  revealed,
  animate,
}: {
  source: FundingSource;
  revealed: boolean;
  animate: boolean;
}) {
  const config = statusConfig[revealed ? source.status : "pending"];
  const Icon = config.icon;

  return (
    <Card
      className={`border transition-all ${animate ? "duration-700" : "duration-0"} ${
        revealed ? config.bg : "bg-gray-50 border-gray-200 opacity-60"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`rounded-lg p-2 transition-colors ${animate ? "duration-700" : "duration-0"} ${
              revealed ? config.text + " bg-white/60" : "text-gray-400 bg-gray-100"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm">{source.name}</h3>
              <Badge className={`text-[10px] ${revealed ? config.badgeClass : "bg-gray-100 text-gray-500"}`}>
                <Icon className="mr-1 h-3 w-3" />
                {revealed ? config.label : "Pending"}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{source.agency}</p>
            {revealed && (source.status === "approved" || source.status === "partial") && (
              <p className={`mt-1.5 text-sm font-semibold ${config.text}`}>
                - PHP {source.approvedAmount.toLocaleString()}
              </p>
            )}
            {revealed && source.status === "denied" && source.denialReason && (
              <p className="mt-1.5 text-xs text-red-600">
                Reason: {source.denialReason}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BillTrackerPage({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const { billId } = use(params);

  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading bill tracker...</div>}>
      <BillTrackerContent billId={billId} />
    </Suspense>
  );
}
