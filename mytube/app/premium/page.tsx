 "use client";

import { useEffect, useState } from "react";
import {
  Crown,
  CheckCircle2,
  Loader2,
  Download,
  Star,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Plan = {
  name: string;
  price: string;
  downloads: string;
  quality: string;
  features: string[];
  color: string;
};

const plans: Plan[] = [
  {
    name: "Free",
    price: "₹0",
    downloads: "1 Download / Day",
    quality: "720p",
    color: "border-zinc-600",
    features: [
      "Limited Downloads",
      "Ads Enabled",
      "Standard Streaming",
      "Community Access",
    ],
  },
  {
    name: "Bronze",
    price: "₹99 / month",
    downloads: "5 Downloads / Day",
    quality: "1080p",
    color: "border-orange-500",
    features: [
      "HD Streaming",
      "Reduced Ads",
      "Priority Downloads",
      "Creator Support",
    ],
  },
  {
    name: "Silver",
    price: "₹199 / month",
    downloads: "20 Downloads / Day",
    quality: "1440p",
    color: "border-gray-300",
    features: [
      "No Ads",
      "Offline Mode",
      "Premium Videos",
      "Fast Downloads",
    ],
  },
  {
    name: "Gold",
    price: "₹399 / month",
    downloads: "Unlimited",
    quality: "4K UHD",
    color: "border-yellow-500",
    features: [
      "Unlimited Downloads",
      "No Ads",
      "4K Streaming",
      "Watch Party",
      "Priority Support",
    ],
  },
];

export default function PremiumPage() {
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("subscriptionPlan");

    if (saved) {
      setCurrentPlan(saved);
    }
  }, []);

  const startPayment = (plan: Plan) => {
    if (plan.name === currentPlan) return;

    setSelectedPlan(plan);
    setProcessing(true);

       setTimeout(() => {
      localStorage.setItem("subscriptionPlan", plan.name);

      setCurrentPlan(plan.name);

      setProcessing(false);
      setPaymentSuccess(true);

      setTimeout(() => {
        setPaymentSuccess(false);
        setSelectedPlan(null);
      }, 2500);

    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-8 py-12">

        <div className="text-center mb-12">

          <div className="flex justify-center mb-4">
            <Crown className="w-16 h-16 text-yellow-400" />
          </div>

          <h1 className="text-5xl font-bold">
            MyTube Premium
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Unlock premium features and enjoy the best MyTube experience.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 bg-zinc-900 rounded-full px-6 py-3">

            <ShieldCheck className="text-green-400" />

            <span>
              Current Plan:
            </span>

            <span className="font-bold text-red-500">
              {currentPlan}
            </span>

          </div>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-7">

          {plans.map((plan) => (

            <div
              key={plan.name}
              className={`rounded-2xl border-2 ${plan.color} bg-zinc-900 p-7 hover:scale-105 transition duration-300`}
            >

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  {plan.name}
                </h2>

                {plan.name === "Gold" && (
                  <Sparkles className="text-yellow-400" />
                )}

              </div>

              <p className="text-4xl font-bold mt-5">
                {plan.price}
              </p>

              <p className="text-gray-400 mt-3">
                {plan.downloads}
              </p>

              <p className="text-gray-400">
                Max Quality: {plan.quality}
              </p>

              <div className="mt-6 space-y-3">

                {plan.features.map((feature) => (

                  <div
                    key={feature}
                    className="flex items-center gap-2"
                  >

                    <CheckCircle2
                      size={18}
                      className="text-green-400"
                    />

                    <span>{feature}</span>

                  </div>

                ))}

              </div>

                            <button
                onClick={() => startPayment(plan)}
                disabled={currentPlan === plan.name}
                className={`mt-8 w-full py-3 rounded-xl font-semibold transition ${
                  currentPlan === plan.name
                    ? "bg-green-600 cursor-default"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {currentPlan === plan.name
                  ? "Current Plan"
                  : "Pay with Razorpay"}
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* Payment Processing Modal */}

      {processing && selectedPlan && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-zinc-900 rounded-2xl w-[420px] p-8 text-center border border-zinc-700">

            <img
              src="https://razorpay.com/assets/razorpay-logo.svg"
              alt="Razorpay"
              className="h-9 mx-auto mb-8"
            />

            <Loader2 className="w-14 h-14 mx-auto animate-spin text-blue-400" />

            <h2 className="text-2xl font-bold mt-6">
              Processing Payment...
            </h2>

            <p className="text-gray-400 mt-3">
              {selectedPlan.name} Plan
            </p>

            <div className="mt-6 rounded-xl bg-zinc-800 p-4">

              <div className="flex justify-between">

                <span>Amount</span>

                <span>{selectedPlan.price}</span>

              </div>

              <div className="flex justify-between mt-3">

                <span>Gateway</span>

                <span>Razorpay</span>

              </div>

              <div className="flex justify-between mt-3">

                <span>Status</span>

                <span className="text-yellow-400">
                  Processing...
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

            {/* Payment Success */}

      {paymentSuccess && selectedPlan && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-zinc-900 rounded-2xl w-[420px] p-8 text-center border border-green-600">

            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />

            <h2 className="text-3xl font-bold mt-6">
              Payment Successful
            </h2>

            <p className="text-gray-400 mt-3">
              Welcome to the
            </p>

            <h3 className="text-2xl font-bold text-yellow-400 mt-2">
              {selectedPlan.name} Plan
            </h3>

            <div className="mt-8 bg-zinc-800 rounded-xl p-5">

              <div className="flex justify-between mb-3">
                <span>Subscription</span>
                <span>{selectedPlan.name}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span>Downloads</span>
                <span>{selectedPlan.downloads}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span>Streaming</span>
                <span>{selectedPlan.quality}</span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-green-400 font-semibold">
                  Active
                </span>
              </div>

            </div>

            <p className="text-sm text-gray-500 mt-6">
              Thank you for choosing MyTube Premium.
            </p>

          </div>

        </div>

      )}

      <div className="border-t border-zinc-800 mt-14 py-8 text-center text-gray-500">

        <div className="flex justify-center items-center gap-2">

          <ShieldCheck className="w-5 h-5 text-blue-400" />

          <span>Secure Payments powered by Razorpay</span>

        </div>

        <div className="flex justify-center items-center gap-2 mt-3">

          <Download className="w-4 h-4" />

          <span>
            Premium members enjoy faster downloads and exclusive features.
          </span>

        </div>

        <div className="flex justify-center items-center gap-2 mt-2">

          <Star className="w-4 h-4 text-yellow-400" />

          <span>Demo Payment Gateway for Internship Project</span>

        </div>

      </div>

    </div>
  );
}