"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle } from "lucide-react";

// ------------------ TYPES ------------------
interface Plan {
  id: string;
  name: string;
  price: string;
  yearlyPrice: string;
  popular: boolean;
  features: string[];
  buttonText: string;
  priceColor: string;
  buttonGradient: string;
  borderGradient: string;
}

interface PricingCardProps {
  plan: Plan;
  isYearly: boolean;
  index: number;
}

// ------------------ BACKGROUND GRADIENT MESH ------------------
const BackgroundMesh = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-slate-900" />

    {/* Purple orb */}
    <motion.div
      className="absolute h-[300px] w-[300px] rounded-full bg-purple-600/30 blur-3xl"
      animate={{
        x: ["-10%", "50%", "120%", "50%", "-10%"],
        y: ["-10%", "120%", "50%", "-10%", "-10%"],
      }}
      transition={{
        duration: 40,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Cyan orb */}
    <motion.div
      className="absolute h-[300px] w-[300px] rounded-full bg-cyan-600/30 blur-3xl"
      animate={{
        x: ["120%", "50%", "-10%", "50%", "120%"],
        y: ["120%", "-10%", "50%", "120%", "120%"],
      }}
      transition={{
        duration: 35,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 5,
      }}
    />
  </div>
);

// ------------------ PRICING CARD COMPONENT ------------------
const PricingCard = ({ plan, isYearly, index }: PricingCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const springConfig = { stiffness: 350, damping: 40 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 384], [10, -10]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 320], [-10, 10]),
    springConfig
  );

  const price = isYearly ? plan.yearlyPrice : plan.price;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.15,
      }}
      className={`relative w-80 rounded-2xl bg-slate-900/60 ring-1 ring-white/10 p-8 text-center shadow-2xl backdrop-blur-lg transition-all duration-300 transform-gpu ${
        plan.popular ? "scale-105" : ""
      }`}
      style={{
        perspective: "1000px",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      {/* Shimmer effect */}
      {plan.popular && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_4s_infinite]" />
        </div>
      )}

      {/* Top border */}
      <div
        className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${plan.borderGradient}`}
      />

      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">
          POPULAR
        </div>
      )}

      {/* Title */}
      <h2 className="mb-4 text-2xl font-bold">{plan.name}</h2>

      {/* Price */}
      <div className="mb-6">
        <span className={`text-5xl font-extrabold ${plan.priceColor}`}>
          {price}
        </span>
        <span className="text-slate-400">
          / {isYearly ? "year" : "month"}
        </span>
      </div>

      {/* Features */}
      <ul className="mb-8 space-y-3 text-left">
        {plan.features.map((feature, featureIndex) => (
          <li
            key={featureIndex}
            className="flex items-start gap-3 text-slate-200"
          >
            <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`w-full bg-gradient-to-r px-6 py-3 ${plan.buttonGradient} rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none ${
          plan.popular
            ? "focus:ring-pink-500/50"
            : "focus:ring-cyan-500/50"
        }`}
        aria-label={`Select ${plan.name} plan`}
      >
        {plan.buttonText}
      </button>
    </motion.article>
  );
};

// ------------------ MAIN PRICING PAGE ------------------
const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans: Plan[] = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      yearlyPrice: "$0",
      popular: false,
      features: [
        "Basic variant predictions",
        "Longer waiting time for cold starts",
        "100 monthly requests",
        "No batch processing",
        "Single device",
      ],
      buttonText: "Get Started",
      priceColor: "text-cyan-400",
      buttonGradient: "from-cyan-500 to-blue-600",
      borderGradient: "from-cyan-400 to-blue-500",
    },
    {
      id: "individual",
      name: "Individual",
      price: "$49",
      yearlyPrice: "$490",
      popular: true,
      features: [
        "All Free features",
        "Batch processing for bulk requests",
        "Unlimited monthly usages",
        "No waiting time",
        "5 devices",
      ],
      buttonText: "Try 30 Days Free",
      priceColor: "text-pink-400",
      buttonGradient: "from-pink-500 to-purple-600",
      borderGradient: "from-pink-500 to-purple-600",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$399",
      yearlyPrice: "$3990",
      popular: false,
      features: [
        "All Individual features",
        "Priority support",
        "Advanced analytics",
        "Parallel Processing & priority access",
        "Unlimited devices",
      ],
      buttonText: "Contact Sales",
      priceColor: "text-indigo-400",
      buttonGradient: "from-purple-600 to-indigo-700",
      borderGradient: "from-purple-600 to-indigo-700",
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20 text-white">
      <BackgroundMesh />

      <div className="w-full max-w-7xl z-10">
        {/* Title */}
        <header className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-4 text-5xl font-bold tracking-tight drop-shadow-lg"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-slate-300"
          >
            Select the perfect plan for your needs. Upgrade, downgrade,
            or cancel anytime.
          </motion.p>
        </header>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mb-12 flex items-center justify-center gap-4"
        >
          <span
            className={`transition-colors ${
              !isYearly ? "text-white" : "text-slate-400"
            }`}
          >
            Monthly
          </span>
          <div className="flex items-center">
            <label
              htmlFor="pricing-toggle"
              className="relative inline-flex cursor-pointer items-center"
            >
              <input
                type="checkbox"
                id="pricing-toggle"
                className="sr-only"
                checked={isYearly}
                onChange={() => setIsYearly(!isYearly)}
                aria-label="Toggle between monthly and yearly pricing"
              />
              <div className="h-7 w-12 rounded-full bg-slate-700 transition-colors"></div>
              <motion.div
                className="absolute top-1 left-1 h-5 w-5 rounded-full bg-white"
                layout
                transition={{
                  type: "spring",
                  stiffness: 700,
                  damping: 30,
                }}
                initial={false}
                animate={{ x: isYearly ? 20 : 0 }}
              />
            </label>
          </div>
          <span
            className={`transition-colors ${
              isYearly ? "text-white" : "text-slate-400"
            }`}
          >
            Yearly{" "}
            <span className="text-green-400 font-semibold">
              (Save 15%)
            </span>
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <section className="flex flex-wrap items-center justify-center gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isYearly={isYearly}
              index={index}
            />
          ))}
        </section>
      </div>

      {/* Shimmer Animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) rotate(-30deg);
          }
          100% {
            transform: translateX(100%) rotate(-30deg);
          }
        }
      `}</style>
    </main>
  );
};

export default PricingPage;
