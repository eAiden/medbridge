"use client";

import {
  ClipboardList,
  CheckCircle2,
  Clock,
  FileText,
  Heart,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const timeline = [
  {
    date: "Mar 28, 2026",
    title: "Bill fully covered!",
    description: "All funding sources secured. PHP 847,200 covered in full.",
    status: "approved" as const,
    type: "application",
  },
  {
    date: "Mar 25, 2026",
    title: "Crowdfunding complete — PHP 327,200 raised",
    description: "187 donors contributed. Funds sent directly to PGH billing.",
    status: "approved" as const,
    type: "crowdfund",
  },
  {
    date: "Mar 23, 2026",
    title: "DSWD AICS — APPROVED (PHP 50,000)",
    description: "Guarantee letter issued to Philippine General Hospital.",
    status: "approved" as const,
    type: "application",
  },
  {
    date: "Mar 20, 2026",
    title: "PCSO IMAP — APPROVED (PHP 100,000)",
    description: "Guarantee letter issued to Philippine General Hospital.",
    status: "approved" as const,
    type: "application",
  },
  {
    date: "Mar 18, 2026",
    title: "Malasakit Center — APPROVED (PHP 250,000)",
    description: "One-stop shop processed all agency applications at PGH.",
    status: "approved" as const,
    type: "application",
  },
  {
    date: "Mar 16, 2026",
    title: "PhilHealth Case Rate — APPROVED (PHP 120,000)",
    description: "Automatic coverage applied upon hospital admission.",
    status: "approved" as const,
    type: "application",
  },
  {
    date: "Mar 15, 2026",
    title: "Crowdfunding campaign created",
    description: "Campaign verified and live. Goal: PHP 327,200.",
    status: "active" as const,
    type: "crowdfund",
  },
  {
    date: "Mar 15, 2026",
    title: "Eligibility assessment completed",
    description: "10 programs identified. 6 strong matches.",
    status: "done" as const,
    type: "assessment",
  },
];

const statusIcons = {
  "in-progress": Clock,
  pending: Clock,
  approved: CheckCircle2,
  done: CheckCircle2,
  active: Heart,
};

const statusColors = {
  "in-progress": "text-blue-500",
  pending: "text-amber-500",
  approved: "text-emerald-500",
  done: "text-gray-400",
  active: "text-rose-500",
};

export default function TrackPage() {
  const totalBill = 847200;
  const covered = 250000 + 120000 + 100000 + 50000; // Malasakit + PhilHealth + PCSO + DSWD
  const crowdfunded = 327200;
  const totalCovered = covered + crowdfunded;
  const gap = Math.max(0, totalBill - totalCovered);
  const coveragePercent = Math.round((totalCovered / totalBill) * 100);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 px-4 pb-6 pt-6 text-white">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="h-5 w-5" />
            <h1 className="text-xl font-bold">Progress Tracker</h1>
          </div>
          <p className="text-sm text-gray-400">
            Track all your applications and funding in one place.
          </p>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="mx-auto max-w-lg space-y-6">
          {/* Coverage Overview */}
          <Card className="border-emerald-200">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  Coverage Overview
                </h3>
                <Badge className="bg-emerald-100 text-emerald-700">
                  {coveragePercent}% Covered
                </Badge>
              </div>

              <Progress value={coveragePercent} className="h-3" />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Total Bill</p>
                  <p className="font-bold text-gray-900">PHP {totalBill.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3">
                  <p className="text-xs text-gray-500">Total Covered</p>
                  <p className="font-bold text-emerald-600">PHP {totalCovered.toLocaleString()}</p>
                </div>
              </div>

              {/* Live Tracker CTA */}
              <Link href="/track/bill-001?autoplay=true">
                <div className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 p-3 text-white text-center hover:from-emerald-700 hover:to-teal-700 transition-colors">
                  <p className="text-sm font-semibold">Watch the Bill Disappear</p>
                  <p className="text-xs text-emerald-100 mt-0.5">View the animated bill tracker demo</p>
                </div>
              </Link>

              {/* Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    Malasakit Center (approved)
                  </span>
                  <span className="font-medium">PHP 250,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    PhilHealth Coverage
                  </span>
                  <span className="font-medium">PHP 120,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    PCSO IMAP (approved)
                  </span>
                  <span className="font-medium">PHP 100,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    DSWD AICS (approved)
                  </span>
                  <span className="font-medium">PHP 50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1.5">
                    <Heart className="h-3.5 w-3.5 text-rose-500" />
                    Crowdfunding Raised
                  </span>
                  <span className="font-medium">PHP {crowdfunded.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Activity Timeline
            </h2>
            <div className="space-y-0">
              {timeline.map((event, i) => {
                const Icon = statusIcons[event.status];
                const color = statusColors[event.status];

                return (
                  <div key={i} className="flex gap-3">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <Icon className={`h-5 w-5 shrink-0 ${color}`} />
                      {i < timeline.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 my-1" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-4 flex-1 min-w-0">
                      <p className="text-xs text-gray-400">{event.date}</p>
                      <p className="text-sm font-medium text-gray-900 mt-0.5">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/apply">
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="p-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-900">Applications</span>
                    <ArrowRight className="h-3.5 w-3.5 text-gray-300 ml-auto" />
                  </CardContent>
                </Card>
              </Link>
              <Link href="/crowdfund">
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="p-3 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-rose-500" />
                    <span className="text-sm font-medium text-gray-900">Campaigns</span>
                    <ArrowRight className="h-3.5 w-3.5 text-gray-300 ml-auto" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
