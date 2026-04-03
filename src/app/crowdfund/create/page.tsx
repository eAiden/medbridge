"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Upload,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function CreateCampaignPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    diagnosis: "",
    hospitalName: "",
    totalBill: "",
    philHealthCoverage: "",
    guaranteeLetterCoverage: "",
    story: "",
    soaUploaded: false,
  });

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const fundingGoal = Math.max(
    0,
    Number(form.totalBill || 0) -
      Number(form.philHealthCoverage || 0) -
      Number(form.guaranteeLetterCoverage || 0)
  );

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="mx-auto max-w-lg text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Campaign Created!</h1>
          <p className="text-gray-600 mb-2">
            Your campaign for {form.patientName} is now pending verification.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Our team will verify the hospital bill and endorsements within 24-48 hours.
            Once verified, your campaign will go live.
          </p>
          <div className="flex gap-3">
            <Link href="/crowdfund" className="flex-1">
              <Button variant="outline" className="w-full">
                View Campaigns
              </Button>
            </Link>
            <Link href="/track" className="flex-1">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Track Progress
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-rose-500 px-4 pb-6 pt-6 text-white">
        <div className="mx-auto max-w-lg">
          <Link
            href="/crowdfund"
            className="inline-flex items-center gap-1 text-sm text-rose-200 hover:text-white mb-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5" />
            <h1 className="text-xl font-bold">Create Campaign</h1>
          </div>
          <p className="text-sm text-rose-100">
            Start a verified crowdfunding campaign for hospital bills.
          </p>
          {/* Steps */}
          <div className="mt-4 flex gap-1.5">
            {["Patient Info", "Financials", "Story"].map((s, i) => (
              <div key={s} className="flex-1 flex flex-col gap-1">
                <div className={`h-1.5 rounded-full transition-colors ${i <= step ? "bg-white" : "bg-rose-300/40"}`} />
                <span className="text-[10px] text-rose-200">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="mx-auto max-w-lg">
          <Card>
            <CardContent className="p-5 space-y-5">
              {step === 0 && (
                <>
                  <div className="space-y-2">
                    <Label>Patient Full Name</Label>
                    <Input
                      placeholder="e.g., Maria Santos"
                      value={form.patientName}
                      onChange={(e) => update("patientName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Patient Age</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 45"
                      value={form.age}
                      onChange={(e) => update("age", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Diagnosis / Condition</Label>
                    <Input
                      placeholder="e.g., Breast Cancer Stage III"
                      value={form.diagnosis}
                      onChange={(e) => update("diagnosis", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hospital Name</Label>
                    <Input
                      placeholder="e.g., Philippine General Hospital"
                      value={form.hospitalName}
                      onChange={(e) => update("hospitalName", e.target.value)}
                    />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label>Total Hospital Bill (PHP)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 850000"
                      value={form.totalBill}
                      onChange={(e) => update("totalBill", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>PhilHealth Coverage (PHP)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 120000"
                      value={form.philHealthCoverage}
                      onChange={(e) => update("philHealthCoverage", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Guarantee Letter Coverage (PHP)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 200000"
                      value={form.guaranteeLetterCoverage}
                      onChange={(e) => update("guaranteeLetterCoverage", e.target.value)}
                    />
                  </div>

                  <Separator />

                  <div className="rounded-lg bg-rose-50 p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Crowdfunding Goal</span>
                      <span className="font-bold text-rose-600 text-lg">
                        PHP {fundingGoal.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      = Total Bill - PhilHealth - Guarantee Letters
                    </p>
                  </div>

                  {/* SOA Upload */}
                  <div className="space-y-2">
                    <Label>Upload Statement of Account (SOA)</Label>
                    <button
                      onClick={() => update("soaUploaded", !form.soaUploaded)}
                      className={`flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors ${
                        form.soaUploaded
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-gray-300 hover:border-rose-300 hover:bg-rose-50"
                      }`}
                    >
                      {form.soaUploaded ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                          <span className="text-sm text-emerald-700 font-medium">
                            SOA uploaded (tap to remove)
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            Tap to upload hospital SOA
                          </span>
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-400">
                      Required for verification. We confirm directly with the hospital.
                    </p>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label>Patient Story</Label>
                    <Textarea
                      placeholder="Share the patient's story — their situation, why they need help, and how the funds will be used. You can write in Filipino or English."
                      rows={8}
                      value={form.story}
                      onChange={(e) => update("story", e.target.value)}
                    />
                    <p className="text-xs text-gray-400">
                      A compelling story helps donors connect with the patient&apos;s situation.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="rounded-lg bg-gray-50 p-4 text-sm space-y-1">
                    <p className="font-semibold text-gray-800 mb-2">Campaign Summary</p>
                    <p><span className="text-gray-500">Patient:</span> {form.patientName}, {form.age} yrs old</p>
                    <p><span className="text-gray-500">Diagnosis:</span> {form.diagnosis}</p>
                    <p><span className="text-gray-500">Hospital:</span> {form.hospitalName}</p>
                    <p><span className="text-gray-500">Total Bill:</span> PHP {Number(form.totalBill || 0).toLocaleString()}</p>
                    <p><span className="text-gray-500">Crowdfunding Goal:</span> <span className="font-semibold text-rose-600">PHP {fundingGoal.toLocaleString()}</span></p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-4 flex gap-3">
            {step > 0 && (
              <Button variant="outline" className="flex-1" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            )}
            {step < 2 ? (
              <Button
                className="flex-1 bg-rose-500 hover:bg-rose-600"
                onClick={() => setStep((s) => s + 1)}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="flex-1 bg-rose-500 hover:bg-rose-600"
                onClick={() => setSubmitted(true)}
              >
                <Heart className="mr-2 h-4 w-4" />
                Submit for Verification
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
