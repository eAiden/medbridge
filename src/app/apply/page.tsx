"use client";

import Link from "next/link";
import { FileText, Plus, Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Application } from "@/types";

const sampleApplications: Application[] = [
  {
    id: "app-001",
    programId: "malasakit-center",
    programName: "Malasakit Center (One-Stop Shop)",
    agency: "Multiple Agencies",
    status: "approved",
    dateCreated: "2026-03-20",
    dateSubmitted: "2026-03-20",
    dateUpdated: "2026-03-22",
    estimatedCoverage: 250000,
    documents: [
      { name: "Valid government-issued ID", required: true, uploaded: true },
      { name: "Medical Certificate", required: true, uploaded: true },
      { name: "Hospital Statement of Account", required: true, uploaded: true },
      { name: "Barangay Certificate of Indigency", required: true, uploaded: true },
    ],
    letterGenerated: true,
    notes: "Approved for PHP 250,000 coverage",
  },
  {
    id: "app-002",
    programId: "pcso-imap",
    programName: "PCSO Individual Medical Assistance",
    agency: "PCSO",
    status: "pending",
    dateCreated: "2026-03-25",
    dateSubmitted: "2026-03-25",
    estimatedCoverage: 75000,
    documents: [
      { name: "Medical Certificate", required: true, uploaded: true },
      { name: "Hospital SOA", required: true, uploaded: true },
      { name: "Barangay Certificate of Indigency", required: true, uploaded: false },
      { name: "Valid government-issued ID", required: true, uploaded: true },
      { name: "PCSO Request Form", required: true, uploaded: true },
    ],
    letterGenerated: true,
    notes: "Awaiting evaluation",
  },
  {
    id: "app-003",
    programId: "dswd-aics",
    programName: "DSWD AICS",
    agency: "DSWD",
    status: "draft",
    dateCreated: "2026-04-01",
    estimatedCoverage: 40000,
    documents: [
      { name: "Letter request", required: true, uploaded: false },
      { name: "Medical Certificate", required: true, uploaded: true },
      { name: "Hospital SOA", required: true, uploaded: false },
      { name: "Barangay Certificate of Indigency", required: true, uploaded: false },
      { name: "Valid government-issued ID", required: true, uploaded: true },
      { name: "Social Case Study Report", required: true, uploaded: false },
    ],
    letterGenerated: false,
    notes: "",
  },
];

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-600", icon: FileText },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-700", icon: Clock },
  pending: { label: "Pending Review", color: "bg-amber-100 text-amber-700", icon: Clock },
  approved: { label: "Approved", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  denied: { label: "Denied", color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function ApplyPage() {
  const [applications] = useState(sampleApplications);

  const approved = applications.filter((a) => a.status === "approved");
  const active = applications.filter((a) => a.status !== "approved" && a.status !== "denied");

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 px-4 pb-6 pt-6 text-white">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5" />
            <h1 className="text-xl font-bold">Applications</h1>
          </div>
          <p className="text-sm text-blue-100">
            Track your guarantee letter applications across agencies.
          </p>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="mx-auto max-w-lg space-y-6">
          {/* Quick action */}
          <Link href="/assess">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Start New Application
            </Button>
          </Link>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-emerald-200">
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold text-emerald-600">{approved.length}</p>
                <p className="text-xs text-gray-500">Approved</p>
              </CardContent>
            </Card>
            <Card className="border-amber-200">
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold text-amber-600">{active.length}</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                <p className="text-xs text-gray-500">Total</p>
              </CardContent>
            </Card>
          </div>

          {/* Application List */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Your Applications
            </h2>
            {applications.map((app) => {
              const config = statusConfig[app.status];
              const StatusIcon = config.icon;
              const docsUploaded = app.documents.filter((d) => d.uploaded).length;
              const docsTotal = app.documents.length;

              return (
                <Link key={app.id} href={`/apply/${app.programId}`}>
                  <Card className="transition-shadow hover:shadow-md mb-3">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900 text-sm">
                              {app.programName}
                            </h3>
                            <Badge className={`${config.color} text-[10px]`}>
                              <StatusIcon className="mr-1 h-3 w-3" />
                              {config.label}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{app.agency}</p>
                          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                            <span>Est. PHP {app.estimatedCoverage.toLocaleString()}</span>
                            <span>Docs: {docsUploaded}/{docsTotal}</span>
                            <span>{app.letterGenerated ? "Letter ready" : "No letter yet"}</span>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-300 shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
