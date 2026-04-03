"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  ShieldCheck,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Share2,
  Building2,
  Wallet,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sampleCampaigns } from "@/lib/sample-campaigns";

export default function CampaignDetailPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = use(params);
  const [showDonation, setShowDonation] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [donated, setDonated] = useState(false);

  const campaign = sampleCampaigns.find((c) => c.id === campaignId);

  if (!campaign) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Campaign not found.</p>
        <Link href="/crowdfund" className="text-rose-600 underline mt-2 block">
          Back to campaigns
        </Link>
      </div>
    );
  }

  const percentFunded = Math.round(
    (campaign.amountRaised / campaign.fundingGoal) * 100
  );

  const handleDonate = () => {
    setDonated(true);
    setTimeout(() => {
      setDonated(false);
      setShowDonation(false);
      setDonationAmount("");
      setSelectedMethod(null);
    }, 3000);
  };

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
            Back to Campaigns
          </Link>
          <h1 className="text-lg font-bold">Help {campaign.patientName}</h1>
          <p className="text-sm text-rose-100 mt-1">{campaign.diagnosis}</p>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="mx-auto max-w-lg space-y-4">
          {/* Funding Progress */}
          <Card className="border-rose-200">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  PHP {campaign.amountRaised.toLocaleString()}
                </span>
                {campaign.status === "funded" ? (
                  <Badge className="bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Fully Funded
                  </Badge>
                ) : (
                  <Badge className="bg-rose-100 text-rose-600">
                    <Clock className="mr-1 h-3 w-3" />
                    {campaign.daysLeft} days left
                  </Badge>
                )}
              </div>
              <Progress value={Math.min(percentFunded, 100)} className="h-3" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{percentFunded}% funded</span>
                <span>Goal: PHP {campaign.fundingGoal.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {campaign.donorCount} donors
                </span>
              </div>

              {campaign.status === "active" && (
                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1 bg-rose-500 hover:bg-rose-600"
                    onClick={() => setShowDonation(true)}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Donate Now
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Donation Modal */}
          {showDonation && !donated && (
            <Card className="border-rose-300 bg-rose-50">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-gray-900">Donate to {campaign.patientName}</h3>
                <p className="text-xs text-gray-500">
                  Funds go directly to {campaign.hospitalName} billing department.
                </p>

                {/* Quick amounts */}
                <div className="grid grid-cols-4 gap-2">
                  {[100, 500, 1000, 5000].map((amount) => (
                    <Button
                      key={amount}
                      variant={donationAmount === String(amount) ? "default" : "outline"}
                      size="sm"
                      className={donationAmount === String(amount) ? "bg-rose-500 hover:bg-rose-600" : ""}
                      onClick={() => setDonationAmount(String(amount))}
                    >
                      {amount >= 1000 ? `${amount / 1000}K` : amount}
                    </Button>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Custom Amount (PHP)</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>

                {/* Payment methods */}
                <div className="space-y-1.5">
                  <Label className="text-xs">Payment Method</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "gcash", label: "GCash", icon: Smartphone, color: "text-blue-600" },
                      { id: "maya", label: "Maya", icon: Smartphone, color: "text-green-600" },
                      { id: "bank", label: "Bank Transfer", icon: Building2, color: "text-gray-600" },
                      { id: "card", label: "Card", icon: CreditCard, color: "text-purple-600" },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors ${
                          selectedMethod === method.id
                            ? "border-rose-500 bg-white shadow-sm"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <method.icon className={`h-4 w-4 ${method.color}`} />
                        <span className="font-medium">{method.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowDonation(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-rose-500 hover:bg-rose-600"
                    disabled={!donationAmount || !selectedMethod}
                    onClick={handleDonate}
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Donate PHP {Number(donationAmount || 0).toLocaleString()}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {donated && (
            <Card className="border-emerald-300 bg-emerald-50">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500 mb-3" />
                <h3 className="font-bold text-lg text-gray-900">Salamat po!</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your PHP {Number(donationAmount).toLocaleString()} donation has been sent directly to{" "}
                  {campaign.hospitalName}.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Funding Breakdown */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm">Funding Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Hospital Bill</span>
                  <span className="font-medium">PHP {campaign.totalBill.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>PhilHealth Coverage</span>
                  <span className="font-medium">- PHP {campaign.philHealthCoverage.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Guarantee Letters</span>
                  <span className="font-medium">- PHP {campaign.guaranteeLetterCoverage.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900">Crowdfunding Goal</span>
                  <span className="text-rose-600">PHP {campaign.fundingGoal.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Story */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Patient Story</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{campaign.story}</p>
            </CardContent>
          </Card>

          {/* Verifications */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Verifications</h3>
              <div className="space-y-2">
                {campaign.verifications.map((v, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                  >
                    {v.verified ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-300 shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{v.label}</p>
                      {v.verifiedDate && (
                        <p className="text-xs text-gray-500">
                          Verified on {new Date(v.verifiedDate).toLocaleDateString("en-PH")}
                        </p>
                      )}
                    </div>
                    {v.verified && (
                      <Badge className="bg-emerald-100 text-emerald-700 text-[10px]">
                        <ShieldCheck className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
