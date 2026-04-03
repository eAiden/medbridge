"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import Link from "next/link";
import {
  Shield,
  Heart,
  HandHeart,
  Ticket,
  Building2,
  HeartHandshake,
  Landmark,
  Building,
  MapPin,
  Wallet,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { matchPrograms } from "@/lib/eligibility-engine";
import type { UserProfile, MatchResult } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Heart,
  HandHeart,
  Ticket,
  Building2,
  HeartHandshake,
  Landmark,
  Building,
  MapPin,
  Wallet,
};

function ResultsContent() {
  const searchParams = useSearchParams();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const profile: UserProfile = useMemo(() => ({
    fullName: searchParams.get("fullName") || "",
    age: Number(searchParams.get("age")) || 0,
    location: {
      region: searchParams.get("region") || "",
      province: searchParams.get("province") || "",
      city: searchParams.get("city") || "",
    },
    monthlyIncome: Number(searchParams.get("monthlyIncome")) || 0,
    employmentStatus: (searchParams.get("employmentStatus") || "unemployed") as UserProfile["employmentStatus"],
    hasPhilHealth: searchParams.get("hasPhilHealth") === "yes",
    philHealthCategory: (searchParams.get("philHealthCategory") || undefined) as UserProfile["philHealthCategory"],
    diagnosis: searchParams.get("diagnosis") || "",
    hospitalName: searchParams.get("hospitalName") || "",
    estimatedBill: Number(searchParams.get("estimatedBill")) || 0,
    hasExistingCoverage: searchParams.get("hasExistingCoverage") === "yes",
    existingCoverageAmount: Number(searchParams.get("existingCoverageAmount")) || 0,
  }), [searchParams]);

  const results = useMemo(() => matchPrograms(profile), [profile]);

  const totalPotentialCoverage = results.reduce((sum, r) => sum + r.estimatedCoverage, 0);
  const gap = Math.max(0, profile.estimatedBill - profile.existingCoverageAmount - totalPotentialCoverage);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-emerald-600 px-4 pb-6 pt-6 text-white">
        <div className="mx-auto max-w-lg">
          <h1 className="text-xl font-bold">Your Results</h1>
          <p className="mt-1 text-sm text-emerald-100">
            {results.length} programs found for {profile.fullName}
          </p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="px-4 -mt-0">
        <div className="mx-auto max-w-lg">
          <Card className="mt-4 border-emerald-200 bg-emerald-50">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Hospital Bill</span>
                <span className="font-semibold">PHP {profile.estimatedBill.toLocaleString()}</span>
              </div>
              {profile.existingCoverageAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Existing Coverage</span>
                  <span className="font-semibold text-emerald-600">
                    - PHP {profile.existingCoverageAmount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Potential Gov&apos;t Assistance</span>
                <span className="font-semibold text-emerald-600">
                  - PHP {totalPotentialCoverage.toLocaleString()}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Remaining Gap</span>
                <span className={`font-bold text-lg ${gap > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                  PHP {gap.toLocaleString()}
                </span>
              </div>
              {gap > 0 && (
                <Link href="/crowdfund/create">
                  <Button size="sm" className="w-full mt-2 bg-rose-500 hover:bg-rose-600 text-white">
                    <Heart className="mr-2 h-4 w-4" />
                    Start Crowdfunding Campaign for the Gap
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Program List */}
      <div className="px-4 py-6">
        <div className="mx-auto max-w-lg space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Matching Programs
          </h2>

          {results.map((result) => (
            <ProgramResultCard
              key={result.program.id}
              result={result}
              expanded={expandedId === result.program.id}
              onToggle={() =>
                setExpandedId(expandedId === result.program.id ? null : result.program.id)
              }
            />
          ))}

          {results.length === 0 && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="mx-auto h-8 w-8 text-amber-500 mb-2" />
                <p className="font-semibold text-gray-900">No exact matches found</p>
                <p className="text-sm text-gray-500 mt-1">
                  Try adjusting your information or visit a Malasakit Center for personalized help.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function ProgramResultCard({
  result,
  expanded,
  onToggle,
}: {
  result: MatchResult;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { program, matchScore, estimatedCoverage, matchReasons, warnings } = result;
  const Icon = iconMap[program.icon] || Shield;

  const scoreColor =
    matchScore >= 70 ? "text-emerald-600 bg-emerald-50" :
    matchScore >= 40 ? "text-amber-600 bg-amber-50" :
    "text-gray-500 bg-gray-50";

  const scoreBadge =
    matchScore >= 70 ? "Strong Match" :
    matchScore >= 40 ? "Possible Match" :
    "Low Match";

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        <button onClick={onToggle} className="w-full p-4 text-left">
          <div className="flex items-start gap-3">
            <div className={`rounded-lg p-2 ${scoreColor}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-900 text-sm">{program.name}</h3>
                <Badge variant="secondary" className={`text-[10px] ${scoreColor}`}>
                  {scoreBadge} ({matchScore}%)
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{program.agency}</p>
              <p className="mt-1.5 text-sm font-semibold text-emerald-600">
                Est. Coverage: PHP {estimatedCoverage.toLocaleString()}
              </p>
            </div>
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400 shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
            )}
          </div>
        </button>

        {expanded && (
          <div className="border-t border-gray-100 px-4 pb-4 space-y-4">
            <p className="text-sm text-gray-600 mt-3">{program.description}</p>

            {/* Match Reasons */}
            {matchReasons.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1.5">Why You Qualify</p>
                <div className="space-y-1">
                  {matchReasons.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-emerald-700">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1.5">Notes</p>
                <div className="space-y-1">
                  {warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-amber-700">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Required Documents */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1.5">Required Documents</p>
              <ul className="space-y-1">
                {program.requiredDocuments.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <FileText className="h-3.5 w-3.5 shrink-0 mt-0.5 text-gray-400" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-gray-50 p-2">
                <p className="text-gray-500">Processing Time</p>
                <p className="font-medium text-gray-900">{program.processingTime}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-2">
                <p className="text-gray-500">Success Rate</p>
                <div className="flex items-center gap-2">
                  <Progress value={program.successRate} className="h-1.5 flex-1" />
                  <span className="font-medium text-gray-900">{program.successRate}%</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Link href={`/apply/${program.id}`} className="flex-1">
                <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <FileText className="mr-1.5 h-3.5 w-3.5" />
                  Generate Letter
                </Button>
              </Link>
            </div>

            {/* Contact */}
            <div className="text-xs text-gray-500">
              <p>{program.officeAddress}</p>
              <p>{program.contactInfo}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading results...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
