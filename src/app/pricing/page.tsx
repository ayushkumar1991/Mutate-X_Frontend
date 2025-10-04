"use client";

import { useState, useEffect } from "react";

const PricingPage = () => {
    const [animatedPlans, setAnimatedPlans] = useState([false, false, false]);

    useEffect(() => {
        // Trigger animations on mount

        const timer = setTimeout(() => {
            setAnimatedPlans([true, true, true]);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const plans = [
        {
            id: "free",

            name: "Free",

            price: "$0",

            popular: false,

            features: [
                "Basic variant predictions",

                "Longer waiting time for cold starts",

                "Limited monthly usages (100 requests)",

                "No batch processing",

                "Single device",
            ],

            buttonText: "Get Started",

            colorClass: "free",

            priceColor: "text-cyan-400",

            buttonGradient: "from-cyan-400 to-blue-500",

            borderGradient: "from-cyan-400 to-blue-500",
        },

        {
            id: "individual",

            name: "Individual",

            price: "$49",

            popular: true,

            features: [
                "All Free features",

                "Batch processing for bulk requests",

                "Unlimited monthly usages",

                "No waiting time",

                "5 devices",
            ],

            buttonText: "Try 30 Days Free",

            colorClass: "individual",

            priceColor: "text-pink-500",

            buttonGradient: "from-pink-500 to-purple-600",

            borderGradient: "from-pink-500 to-purple-600",
        },

        {
            id: "enterprise",

            name: "Enterprise",

            price: "$399",

            popular: false,

            features: [
                "All Individual features",

                "Priority support",

                "Advanced analytics",

                "Parallel Processing & priority access",

                "Unlimited devices",
            ],

            buttonText: "Contact Sales",

            colorClass: "enterprise",

            priceColor: "text-purple-600",

            buttonGradient: "from-purple-600 to-purple-800",

            borderGradient: "from-purple-600 to-purple-800",
        },
    ];

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-5 py-10 text-white">
            {" "}
            <div className="w-full max-w-7xl">
                {/* Header */}       {" "}
                <div className="mb-12 text-center">
                    {" "}
                    <h1 className="animate-fade-in mb-5 text-5xl font-bold drop-shadow-lg">
                        Choose Your Plan          {" "}
                    </h1>
                    {" "}
                    <p className="animate-fade-in-delay text-xl opacity-90">
                        Select the perfect plan for your needs. Upgrade,
                        downgrade, or cancel anytime.          {" "}
                    </p>
                    {" "}
                </div>
                {/* Pricing Cards */}       {" "}
                <div className="flex flex-wrap justify-center gap-8">
                    {" "}
                    {plans.map((plan, index) => (
                        <div
                            key={plan.id}
                            className={`relative w-80 rounded-2xl border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-black/30 ${plan.popular ? "scale-105 hover:scale-105" : ""} ${animatedPlans[index] ? "animate-slide-up" : "translate-y-12 opacity-0"} overflow-hidden`}
                            style={{
                                animationDelay: `${index * 200}ms`,
                            }}
                        >
                            {/* Popular Badge */}             {" "}
                            {plan.popular && (
                                <div className="absolute -top-1 -right-8 rotate-45 transform bg-pink-500 px-10 py-1 text-sm font-semibold text-white shadow-lg">
                                    POPULAR                {" "}
                                </div>
                            )}
                            {/* Top Border Gradient */}
                            {" "}
                            <div
                                className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${plan.borderGradient}`}
                            />
                            {/* Plan Name */}             {" "}
                            <h2 className="mb-4 text-2xl font-bold">{plan.name}</h2>
                            {/* Price */}             {" "}
                            <div
                                className={`mb-6 text-5xl font-extrabold ${plan.priceColor}`}
                            >
                                {plan.price}             {" "}
                            </div>
                            {/* Features */}             {" "}
                            <ul className="mb-8 space-y-4">
                                {" "}
                                {plan.features.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        className="flex items-center border-b border-white/10 pb-3 text-left transition-transform duration-300 hover:translate-x-1"
                                    >
                                        {" "}
                                        <svg
                                            className="mr-3 h-5 w-5 flex-shrink-0 text-green-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            {" "}
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                            {" "}
                                        </svg>
                                        {feature}                 {" "}
                                    </li>
                                ))}
                                {" "}
                            </ul>
                            {/* Button */}             {" "}
                            <button
                                className={`w-4/5 bg-gradient-to-r px-6 py-3 ${plan.buttonGradient} rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-white/20 focus:outline-none`}
                            >
                                {plan.buttonText}             {" "}
                            </button>
                            {" "}
                        </div>
                    ))}
                    {" "}
                </div>
                {" "}
            </div>
            {" "}
            <style jsx>{`

        @keyframes fade-in {

          from {

            opacity: 0;

          }

          to {

            opacity: 1;

          }

        }



        @keyframes slide-up {

          from {

            opacity: 0;

            transform: translateY(50px);

          }

          to {

            opacity: 1;

            transform: translateY(0);

          }

        }



        .animate-fade-in {

          animation: fade-in 1s ease forwards;

        }



        .animate-fade-in-delay {

          animation: fade-in 1.2s ease forwards;

        }



        .animate-slide-up {

          animation: slide-up 0.8s ease forwards;

        }

      `}</style>
            {" "}
        </div>
    );
};

export default PricingPage;
