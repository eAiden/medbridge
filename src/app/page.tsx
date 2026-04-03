import Link from "next/link";
import {
  Search,
  FileText,
  Heart,
  ArrowRight,
  ShieldCheck,
  Users,
  Zap,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 px-4 pb-16 pt-14 text-white">
        <div className="mx-auto max-w-lg">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-emerald-100 backdrop-blur-sm border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Trusted by Filipino families</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
            Your hospital bill,
            <br />
            <span className="text-emerald-200">covered.</span>
          </h1>
          <p className="mt-4 text-base text-emerald-100 leading-relaxed max-w-[50ch]">
            MedBridge finds every government program you qualify for, generates your guarantee letters, and crowdfunds the rest.
          </p>
          <Link href="/assess">
            <Button
              size="lg"
              className="mt-8 bg-white text-emerald-700 hover:bg-emerald-50 font-semibold text-base shadow-lg active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              Check My Eligibility
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Bill Tracker Teaser */}
      <section className="bg-zinc-900 px-4 py-8">
        <div className="mx-auto max-w-lg">
          <Link href="/track/bill-001?autoplay=true" className="block group">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                  Live Demo
                </p>
                <p className="mt-1.5 text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                  Watch a PHP 847,200 bill disappear
                </p>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                  4 government programs + community crowdfunding cover a hospital bill to zero.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-3xl font-bold text-emerald-400 tabular-nums tracking-tight">PHP 0</p>
                <div className="mt-1 flex items-center justify-end gap-1 text-xs text-emerald-500/80">
                  <TrendingDown className="h-3.5 w-3.5" />
                  <span>from PHP 847K</span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex gap-1.5">
              {["PhilHealth", "Malasakit", "PCSO", "DSWD", "Crowd"].map((src, i) => (
                <div
                  key={src}
                  className="flex-1 rounded bg-emerald-500/70 py-1.5 text-center text-[10px] font-medium text-white/90 transition-all duration-300 group-hover:bg-emerald-500"
                  style={{ opacity: 1 - i * 0.08 }}
                >
                  {src}
                </div>
              ))}
            </div>
          </Link>
        </div>
      </section>

      {/* Hero Feature: Eligibility Engine */}
      <section className="px-4 pt-10 pb-4">
        <div className="mx-auto max-w-lg">
          <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-400 mb-4">
            How it works
          </p>
          <Link href="/assess" className="block group">
            <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/30 p-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] active:scale-[0.99]">
              <h2 className="text-xl font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors duration-300 tracking-tight">
                Find programs you qualify for
              </h2>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed max-w-[55ch]">
                Answer 4 quick questions. We match you to PhilHealth, DSWD, PCSO, DOH, Malasakit Centers, and more.
              </p>
              {/* Simulated UI preview */}
              <div className="mt-4 rounded-xl border border-emerald-200/80 bg-white p-4 space-y-2.5">
                {[
                  { name: "Malasakit Center", score: "92%", color: "bg-emerald-100 text-emerald-700" },
                  { name: "PCSO IMAP", score: "85%", color: "bg-emerald-100 text-emerald-700" },
                  { name: "DSWD AICS", score: "70%", color: "bg-amber-100 text-amber-700" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-700">{item.name}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${item.color}`}>
                      {item.score} match
                    </span>
                  </div>
                ))}
                <div className="pt-1.5 border-t border-zinc-100 text-[10px] text-zinc-400 text-center">
                  10+ programs checked in seconds
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Secondary features: 2-col grid */}
      <section className="px-4 pb-10">
        <div className="mx-auto max-w-lg grid grid-cols-2 gap-3">
          <Link href="/apply" className="block group">
            <div className="h-full rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)] active:scale-[0.98]">
              <FileText className="h-5 w-5 text-blue-600 mb-3" />
              <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors duration-300">
                Generate Letters
              </h3>
              <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                Pre-filled guarantee letters for every agency. Copy, print, submit.
              </p>
            </div>
          </Link>
          <Link href="/crowdfund" className="block group">
            <div className="h-full rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)] active:scale-[0.98]">
              <Heart className="h-5 w-5 text-rose-500 mb-3" />
              <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-rose-500 transition-colors duration-300">
                Crowdfund the Gap
              </h3>
              <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                Hospital-verified campaigns. Funds go directly to billing via GCash.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Social proof: narrative */}
      <section className="border-t border-zinc-100 bg-zinc-50 px-4 py-10">
        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.04)]">
            <p className="text-sm text-zinc-800 leading-relaxed">
              <span className="font-semibold">Maria, 45, breast cancer.</span>{" "}
              PHP 847,200 hospital bill at Philippine General Hospital. PhilHealth, Malasakit Center, PCSO, and DSWD covered PHP 520,000. Community crowdfunding covered the rest.
            </p>
            <p className="mt-3 text-base font-bold text-emerald-600 tracking-tight">
              Final bill: PHP 0
            </p>
            <Link href="/track/bill-001?autoplay=true" className="mt-3 inline-block">
              <span className="text-xs text-emerald-600 font-medium hover:text-emerald-700 transition-colors duration-200">
                See how it happened &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why MedBridge */}
      <section className="border-t border-zinc-200 bg-white px-4 py-10">
        <div className="mx-auto max-w-lg">
          <h2 className="text-lg font-bold text-zinc-900 mb-5 tracking-tight">Why MedBridge?</h2>
          <div className="space-y-4">
            {[
              {
                icon: Zap,
                color: "text-amber-500",
                title: "No more Facebook guesswork",
                desc: "Centralized, accurate info instead of scattered tips in Facebook groups",
              },
              {
                icon: ShieldCheck,
                color: "text-emerald-600",
                title: "Need-based, not connection-based",
                desc: "Access programs based on your actual eligibility, not who you know",
              },
              {
                icon: Users,
                color: "text-blue-600",
                title: "Verified crowdfunding",
                desc: "Every campaign is hospital-verified. Donations go directly to the hospital billing.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <item.icon className={`mt-0.5 h-[18px] w-[18px] ${item.color} shrink-0`} />
                <div>
                  <p className="text-sm font-medium text-zinc-900">{item.title}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
