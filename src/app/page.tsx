import Link from "next/link";
import {
  Search,
  FileText,
  Heart,
  ArrowRight,
  ShieldCheck,
  Users,
  Zap,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 px-4 pb-14 pt-14 text-white">
        <div className="mx-auto max-w-lg">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-emerald-100 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Trusted by Filipino families</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight">
            Your hospital bill,
            <br />
            <span className="text-emerald-200">covered.</span>
          </h1>
          <p className="mt-3 text-base text-emerald-100 leading-relaxed max-w-sm">
            MedBridge finds every government program you qualify for, generates your guarantee letters, and crowdfunds the rest.
          </p>
          <Link href="/assess">
            <Button
              size="lg"
              className="mt-6 bg-white text-emerald-700 hover:bg-emerald-50 font-semibold text-base shadow-lg"
            >
              Check My Eligibility
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Bill Tracker Teaser — the "whoa" moment */}
      <section className="bg-gray-900 px-4 py-8">
        <div className="mx-auto max-w-lg">
          <Link href="/track/bill-001?autoplay=true" className="block group">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Live Demo
                </p>
                <p className="mt-1 text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Watch a PHP 847,200 bill disappear
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  See how 4 government programs + community crowdfunding cover a real hospital bill to zero.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-2xl font-bold text-emerald-400 tabular-nums">PHP 0</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
                  <TrendingDown className="h-3.5 w-3.5" />
                  <span>from PHP 847K</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              {["PhilHealth", "Malasakit", "PCSO", "DSWD", "Crowd"].map((src, i) => (
                <div
                  key={src}
                  className="flex-1 rounded-sm bg-emerald-500/80 py-1 text-center text-[10px] font-medium text-white"
                  style={{ opacity: 1 - i * 0.1 }}
                >
                  {src}
                </div>
              ))}
            </div>
          </Link>
        </div>
      </section>

      {/* Hero Feature — Eligibility Engine gets the spotlight */}
      <section className="px-4 pt-8 pb-4">
        <div className="mx-auto max-w-lg">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">
            How it works
          </p>
          <Link href="/assess" className="block group">
            <Card className="border-emerald-200 bg-emerald-50/50 transition-shadow hover:shadow-md overflow-hidden">
              <CardContent className="p-0">
                <div className="p-5 pb-4">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    Find programs you qualify for
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Answer 4 quick questions. We match you to PhilHealth, DSWD, PCSO, DOH, Malasakit Centers, and more. See estimated coverage, required documents, and success rates.
                  </p>
                </div>
                {/* Simulated UI preview */}
                <div className="mx-5 mb-5 rounded-lg border border-emerald-200 bg-white p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">Malasakit Center</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      92% match
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">PCSO IMAP</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      85% match
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">DSWD AICS</span>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                      70% match
                    </span>
                  </div>
                  <div className="pt-1 text-[10px] text-gray-400 text-center">
                    10+ programs checked in seconds
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Secondary features — 2-column, compact, asymmetric with the hero above */}
      <section className="px-4 pb-8">
        <div className="mx-auto max-w-lg grid grid-cols-2 gap-3">
          <Link href="/apply" className="block group">
            <Card className="h-full border-gray-200 transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <FileText className="h-5 w-5 text-blue-600 mb-2" />
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Generate Letters
                </h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Pre-filled guarantee letters for every agency. Copy, print, submit.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/crowdfund" className="block group">
            <Card className="h-full border-gray-200 transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <Heart className="h-5 w-5 text-rose-500 mb-2" />
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-rose-500 transition-colors">
                  Crowdfund the Gap
                </h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Hospital-verified campaigns. Funds go directly to billing via GCash.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Social proof — narrative instead of stats */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-lg">
          <div className="rounded-lg bg-white border border-gray-200 p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900 leading-relaxed">
                  <span className="font-semibold">Maria, 45, breast cancer.</span>{" "}
                  PHP 847,200 hospital bill. PhilHealth, Malasakit Center, PCSO, and DSWD covered PHP 520,000. Community crowdfunding covered the rest.
                </p>
                <p className="mt-2 text-sm font-semibold text-emerald-600">
                  Final bill: PHP 0
                </p>
              </div>
            </div>
            <Link href="/track/bill-001?autoplay=true">
              <p className="text-xs text-emerald-600 font-medium hover:underline">
                See how it happened →
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Why MedBridge — kept lean */}
      <section className="border-t border-gray-200 bg-white px-4 py-8">
        <div className="mx-auto max-w-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Why MedBridge?</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Zap className="mt-0.5 h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">No more Facebook guesswork</p>
                <p className="text-xs text-gray-500">
                  Centralized, accurate info instead of scattered tips in Facebook groups
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-500 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Need-based, not connection-based</p>
                <p className="text-xs text-gray-500">
                  Access programs based on your actual eligibility, not who you know
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5 text-blue-500 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Verified crowdfunding</p>
                <p className="text-xs text-gray-500">
                  Every campaign is hospital-verified. Donations go directly to the hospital billing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
