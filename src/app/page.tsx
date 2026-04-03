import Link from "next/link";
import { Search, FileText, Heart, ArrowRight, ShieldCheck, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 px-4 pb-12 pt-14 text-white">
        <div className="mx-auto max-w-lg">
          <div className="mb-1 flex items-center gap-2 text-emerald-200 text-sm font-medium">
            <ShieldCheck className="h-4 w-4" />
            <span>Trusted by Filipino families</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight">
            MedBridge
          </h1>
          <p className="mt-2 text-lg text-emerald-100 leading-snug">
            Find government medical assistance, generate guarantee letters, and crowdfund hospital bills — all in one place.
          </p>
          <Link href="/assess">
            <Button
              size="lg"
              className="mt-6 w-full bg-white text-emerald-700 hover:bg-emerald-50 font-semibold text-base shadow-lg"
            >
              Check My Eligibility
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-gray-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-lg justify-around text-center">
          <div>
            <p className="text-2xl font-bold text-emerald-600">10+</p>
            <p className="text-xs text-gray-500">Programs Tracked</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">PHP 2M+</p>
            <p className="text-xs text-gray-500">Coverage Available</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">Free</p>
            <p className="text-xs text-gray-500">Always Free</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-lg space-y-4">
          <h2 className="text-lg font-bold text-gray-900">How MedBridge Helps</h2>

          <Link href="/assess" className="block">
            <Card className="border-emerald-100 transition-shadow hover:shadow-md">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="rounded-xl bg-emerald-50 p-3">
                  <Search className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Eligibility Engine</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Answer a few questions and instantly see every government program you qualify for — PhilHealth, DSWD, PCSO, DOH, and more.
                  </p>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-gray-300" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/apply" className="block">
            <Card className="border-blue-100 transition-shadow hover:shadow-md">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="rounded-xl bg-blue-50 p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Application Automation</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Generate guarantee letters, track documents, and submit applications to multiple agencies — no political connections needed.
                  </p>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-gray-300" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/crowdfund" className="block">
            <Card className="border-rose-100 transition-shadow hover:shadow-md">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="rounded-xl bg-rose-50 p-3">
                  <Heart className="h-6 w-6 text-rose-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Verified Crowdfunding</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Crowdfund the gap that government programs don&apos;t cover. Bills verified, funds go directly to the hospital.
                  </p>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-gray-300" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Trust section */}
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
