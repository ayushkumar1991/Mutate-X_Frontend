"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function VerificationForm() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  // generate a simple math problem
  const generateProblem = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setNum1(n1);
    setNum2(n2);
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const handleSubmit = async (/** @type {{ preventDefault: () => void; }} */ e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const correctAnswer = num1 + num2;

  if (parseInt(userAnswer) === correctAnswer) {
    const redirect = searchParams.get("redirect") || "/dashboard";
    router.push(redirect);
  } else {
    setAttempts((prev) => prev + 1);
    setError("Incorrect answer. Please try again.");
    setUserAnswer("");
    generateProblem();

    if (attempts >= 2) {
      setError("Too many failed attempts. Please refresh the page.");
    }
  }

  setIsLoading(false);
};


  const refreshCaptcha = () => {
    generateProblem();
    setUserAnswer("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Human Verification
          </h1>
          <p className="text-gray-600">
            Please solve the math problem below to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Math Problem */}
          <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
            <div className="text-3xl font-mono font-bold text-gray-800 mb-2">
              {num1} + {num2} = ?
            </div>
            <button
              type="button"
              onClick={refreshCaptcha}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Generate new problem
            </button>
          </div>

          {/* Answer input */}
          <div>
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Answer
            </label>
            <input
              type="number"
              id="answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-xl font-mono"
              placeholder="Enter answer"
              required
              disabled={attempts >= 3}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-red-400 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || attempts >= 3 || !userAnswer.trim()}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isLoading || attempts >= 3 || !userAnswer.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </div>
            ) : (
              "Verify & Continue"
            )}
          </button>
        </form>

        {/* Attempts info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">Attempts: {attempts}/3</p>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            🔒 This verification helps protect against automated access
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Verification() {
  return (
    <Suspense fallback={<p className="text-center">Loading verification...</p>}>
      <VerificationForm />
    </Suspense>
  );
}
