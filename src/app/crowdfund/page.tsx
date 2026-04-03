"use client";

import Link from "next/link";
import {
  Heart,
  Plus,
  ShieldCheck,
  Clock,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { sampleCampaigns } from "@/lib/sample-campaigns";

export default function CrowdfundPage() {
  const activeCampaigns = sampleCampaigns.filter((c) => c.status === "active");
  const fundedCampaigns = sampleCampaigns.filter((c) => c.status === "funded");

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-rose-500 px-4 pb-6 pt-6 text-white">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5" />
            <h1 className="text-xl font-bold">Verified Crowdfunding</h1>
          </div>
          <p className="text-sm text-rose-100">
            Hospital-verified campaigns. Funds go directly to the hospital.
          </p>
        </div>
      </div>

      {/* Trust banner */}
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto max-w-lg flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-emerald-600">
            <ShieldCheck className="h-4 w-4" />
            <span className="font-medium">Bills Verified</span>
          </div>
          <div className="flex items-center gap-1 text-blue-600">
            <Heart className="h-4 w-4" />
            <span className="font-medium">Direct-to-Hospital</span>
          </div>
          <div className="flex items-center gap-1 text-amber-600">
            <Users className="h-4 w-4" />
            <span className="font-medium">Community Endorsed</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="mx-auto max-w-lg space-y-6">
          {/* Create campaign */}
          <Link href="/crowdfund/create">
            <Button className="w-full bg-rose-500 hover:bg-rose-600">
              <Plus className="mr-2 h-4 w-4" />
              Start a Campaign
            </Button>
          </Link>

          {/* Active campaigns */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Active Campaigns
            </h2>
            {activeCampaigns.map((campaign) => (
              <Link key={campaign.id} href={`/crowdfund/${campaign.id}`}>
                <CampaignCard campaign={campaign} />
              </Link>
            ))}
          </div>

          {/* Funded campaigns */}
          {fundedCampaigns.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Successfully Funded
              </h2>
              {fundedCampaigns.map((campaign) => (
                <Link key={campaign.id} href={`/crowdfund/${campaign.id}`}>
                  <CampaignCard campaign={campaign} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: (typeof sampleCampaigns)[0] }) {
  const percentFunded = Math.round(
    (campaign.amountRaised / campaign.fundingGoal) * 100
  );
  const verifiedCount = campaign.verifications.filter((v) => v.verified).length;

  return (
    <Card className="transition-shadow hover:shadow-md mb-3">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{campaign.patientName}</h3>
            <p className="text-xs text-gray-500">
              {campaign.age} yrs old &middot; {campaign.hospitalName}
            </p>
          </div>
          {campaign.status === "funded" ? (
            <Badge className="bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Funded
            </Badge>
          ) : (
            <Badge className="bg-rose-100 text-rose-600">
              <Clock className="mr-1 h-3 w-3" />
              {campaign.daysLeft}d left
            </Badge>
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{campaign.diagnosis}</p>

        {/* Progress */}
        <div className="space-y-1.5">
          <Progress value={Math.min(percentFunded, 100)} className="h-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-900">
              PHP {campaign.amountRaised.toLocaleString()}
            </span>
            <span className="text-gray-500">
              of PHP {campaign.fundingGoal.toLocaleString()} ({percentFunded}%)
            </span>
          </div>
        </div>

        {/* Verifications */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-emerald-600">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{verifiedCount} verified</span>
          </div>
          <span className="text-gray-300">&middot;</span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Users className="h-3.5 w-3.5" />
            <span>{campaign.donorCount} donors</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
