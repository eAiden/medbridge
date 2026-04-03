"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { philippineRegions, commonDiagnoses } from "@/lib/programs-data";

const steps = [
  "Personal Info",
  "Employment & Income",
  "Medical Details",
  "Coverage",
];

export default function AssessPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    region: "",
    province: "",
    city: "",
    employmentStatus: "",
    monthlyIncome: "",
    hasPhilHealth: "",
    philHealthCategory: "",
    diagnosis: "",
    hospitalName: "",
    estimatedBill: "",
    hasExistingCoverage: "",
    existingCoverageAmount: "",
  });

  const update = (key: string, value: string | null) => {
    setForm((prev) => ({ ...prev, [key]: value ?? "" }));
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return form.fullName && form.age && form.region && form.city;
      case 1:
        return form.employmentStatus && form.monthlyIncome && form.hasPhilHealth;
      case 2:
        return form.diagnosis && form.hospitalName && form.estimatedBill;
      case 3:
        return form.hasExistingCoverage;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    Object.entries(form).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`/results?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-emerald-600 px-4 pb-6 pt-6 text-white">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <Search className="h-5 w-5" />
            <h1 className="text-xl font-bold">Eligibility Assessment</h1>
          </div>
          <p className="text-sm text-emerald-100">
            Answer a few questions to find programs you qualify for.
          </p>
          {/* Progress */}
          <div className="mt-4 flex gap-1.5">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col gap-1">
                <div
                  className={`h-1.5 rounded-full transition-colors ${
                    i <= step ? "bg-white" : "bg-emerald-400/40"
                  }`}
                />
                <span className="text-[10px] text-emerald-200">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-6">
        <div className="mx-auto max-w-lg">
          <Card>
            <CardContent className="p-5 space-y-5">
              {step === 0 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Juan dela Cruz"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="35"
                      value={form.age}
                      onChange={(e) => update("age", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select value={form.region} onValueChange={(v) => update("region", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {philippineRegions.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">Province</Label>
                    <Input
                      id="province"
                      placeholder="e.g., Quezon"
                      value={form.province}
                      onChange={(e) => update("province", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City / Municipality</Label>
                    <Input
                      id="city"
                      placeholder="e.g., Quezon City"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                    />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label>Employment Status</Label>
                    <Select
                      value={form.employmentStatus}
                      onValueChange={(v) => update("employmentStatus", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                        <SelectItem value="informal">Informal Worker (no contract)</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="senior">Senior Citizen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Monthly Household Income (PHP)</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      placeholder="15000"
                      value={form.monthlyIncome}
                      onChange={(e) => update("monthlyIncome", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>PhilHealth Member?</Label>
                    <Select
                      value={form.hasPhilHealth}
                      onValueChange={(v) => update("hasPhilHealth", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {form.hasPhilHealth === "yes" && (
                    <div className="space-y-2">
                      <Label>PhilHealth Category</Label>
                      <Select
                        value={form.philHealthCategory}
                        onValueChange={(v) => update("philHealthCategory", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="formal">Formal Economy (employed)</SelectItem>
                          <SelectItem value="informal">Informal Economy</SelectItem>
                          <SelectItem value="indigent">Indigent / Sponsored</SelectItem>
                          <SelectItem value="sponsored">Sponsored</SelectItem>
                          <SelectItem value="senior">Senior Citizen</SelectItem>
                          <SelectItem value="lifetime">Lifetime Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label>Diagnosis / Condition</Label>
                    <Select
                      value={form.diagnosis}
                      onValueChange={(v) => update("diagnosis", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonDiagnoses.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">Hospital Name</Label>
                    <Input
                      id="hospitalName"
                      placeholder="e.g., Philippine General Hospital"
                      value={form.hospitalName}
                      onChange={(e) => update("hospitalName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedBill">Estimated Hospital Bill (PHP)</Label>
                    <Input
                      id="estimatedBill"
                      type="number"
                      placeholder="500000"
                      value={form.estimatedBill}
                      onChange={(e) => update("estimatedBill", e.target.value)}
                    />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="space-y-2">
                    <Label>Do you have any existing coverage or assistance?</Label>
                    <Select
                      value={form.hasExistingCoverage}
                      onValueChange={(v) => update("hasExistingCoverage", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {form.hasExistingCoverage === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="existingCoverageAmount">
                        Existing Coverage Amount (PHP)
                      </Label>
                      <Input
                        id="existingCoverageAmount"
                        type="number"
                        placeholder="100000"
                        value={form.existingCoverageAmount}
                        onChange={(e) =>
                          update("existingCoverageAmount", e.target.value)
                        }
                      />
                    </div>
                  )}

                  {/* Summary */}
                  <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-sm space-y-1">
                    <p className="font-semibold text-emerald-800">Summary</p>
                    <p className="text-gray-700">
                      <span className="text-gray-500">Patient:</span> {form.fullName}, {form.age} yrs old
                    </p>
                    <p className="text-gray-700">
                      <span className="text-gray-500">Location:</span> {form.city}, {form.region}
                    </p>
                    <p className="text-gray-700">
                      <span className="text-gray-500">Diagnosis:</span> {form.diagnosis}
                    </p>
                    <p className="text-gray-700">
                      <span className="text-gray-500">Hospital:</span> {form.hospitalName}
                    </p>
                    <p className="text-gray-700">
                      <span className="text-gray-500">Estimated Bill:</span> PHP{" "}
                      {Number(form.estimatedBill).toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                      <span className="text-gray-500">Income:</span> PHP{" "}
                      {Number(form.monthlyIncome).toLocaleString()}/mo
                    </p>
                    <p className="text-gray-700">
                      <span className="text-gray-500">PhilHealth:</span>{" "}
                      {form.hasPhilHealth === "yes" ? `Yes (${form.philHealthCategory})` : "No"}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-4 flex gap-3">
            {step > 0 && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep((s) => s - 1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                disabled={!canProceed()}
                onClick={() => setStep((s) => s + 1)}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                disabled={!canProceed()}
                onClick={handleSubmit}
              >
                <Search className="mr-2 h-4 w-4" />
                Find Programs
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
