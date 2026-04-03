"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Download,
  CheckCircle2,
  Circle,
  Upload,
  Copy,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { governmentPrograms } from "@/lib/programs-data";
import { generateGuaranteeLetter } from "@/lib/letter-generator";
import type { UserProfile } from "@/types";

// Demo profile for letter generation
const demoProfile: UserProfile = {
  fullName: "Juan dela Cruz",
  age: 45,
  location: {
    region: "NCR - National Capital Region",
    province: "Metro Manila",
    city: "Quezon City",
  },
  monthlyIncome: 12000,
  employmentStatus: "informal",
  hasPhilHealth: true,
  philHealthCategory: "informal",
  diagnosis: "Kidney Disease / Dialysis",
  hospitalName: "Philippine General Hospital",
  estimatedBill: 500000,
  hasExistingCoverage: true,
  existingCoverageAmount: 80000,
};

export default function ProgramApplicationPage({
  params,
}: {
  params: Promise<{ programId: string }>;
}) {
  const { programId } = use(params);
  const [letterGenerated, setLetterGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<Set<number>>(new Set());

  const program = useMemo(
    () => governmentPrograms.find((p) => p.id === programId),
    [programId]
  );

  if (!program) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Program not found.</p>
        <Link href="/apply" className="text-emerald-600 underline mt-2 block">
          Back to applications
        </Link>
      </div>
    );
  }

  const letter = generateGuaranteeLetter(demoProfile, program);

  const handleGenerateLetter = () => {
    setLetterGenerated(true);
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleDoc = (index: number) => {
    setUploadedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 px-4 pb-6 pt-6 text-white">
        <div className="mx-auto max-w-lg">
          <Link
            href="/apply"
            className="inline-flex items-center gap-1 text-sm text-blue-200 hover:text-white mb-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Applications
          </Link>
          <h1 className="text-lg font-bold">{program.name}</h1>
          <p className="text-sm text-blue-100 mt-1">{program.agency}</p>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="mx-auto max-w-lg space-y-6">
          {/* Step 1: Document Checklist */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Step 1: Prepare Documents
            </h2>
            <Card>
              <CardContent className="p-4 space-y-2">
                {program.requiredDocuments.map((doc, i) => (
                  <button
                    key={i}
                    onClick={() => toggleDoc(i)}
                    className="flex items-center gap-3 w-full rounded-lg p-2 text-left transition-colors hover:bg-gray-50"
                  >
                    {uploadedDocs.has(i) ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300 shrink-0" />
                    )}
                    <span
                      className={`text-sm flex-1 ${
                        uploadedDocs.has(i) ? "text-gray-400 line-through" : "text-gray-700"
                      }`}
                    >
                      {doc}
                    </span>
                    {!uploadedDocs.has(i) && (
                      <Upload className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                ))}
                <p className="text-xs text-gray-400 mt-2">
                  Tap to mark documents as ready. {uploadedDocs.size}/{program.requiredDocuments.length} prepared.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Step 2: Generate Letter */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Step 2: Generate Guarantee Letter
            </h2>
            {!letterGenerated ? (
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="mx-auto h-10 w-10 text-blue-400 mb-3" />
                  <p className="text-sm text-gray-600 mb-4">
                    Generate a formal request letter pre-filled with your information, addressed to{" "}
                    {program.agency}.
                  </p>
                  <Button
                    onClick={handleGenerateLetter}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Letter
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-emerald-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Letter Generated
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopyLetter}
                      >
                        {copied ? (
                          <Check className="mr-1 h-3.5 w-3.5" />
                        ) : (
                          <Copy className="mr-1 h-3.5 w-3.5" />
                        )}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-1 h-3.5 w-3.5" />
                        Print
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed max-h-80 overflow-y-auto">
                    {letter}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Step 3: Application Process */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Step 3: Submit Application
            </h2>
            <Card>
              <CardContent className="p-4 space-y-3">
                {program.applicationProcess.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      {i + 1}
                    </div>
                    <p className="text-sm text-gray-700 pt-0.5">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <Card className="border-gray-200">
            <CardContent className="p-4 space-y-2 text-sm">
              <p className="font-semibold text-gray-900">Contact Information</p>
              <Separator />
              <p className="text-gray-600">{program.officeAddress}</p>
              <p className="text-gray-600">{program.contactInfo}</p>
              <p className="text-gray-500 text-xs">
                Processing Time: {program.processingTime}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
