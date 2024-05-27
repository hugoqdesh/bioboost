"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Nav from "./dashboard/Nav";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PricingPlan = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { id } = await res.json();

    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: id });

    setLoading(false);
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-[#1f2126] rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-4">Premium Plan</h2>
          <p className=" text-center mb-6">
            Get access to all premium features for only €0.99/month
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <span className="bg-blue-100 text-blue-500 p-2 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="">Feature 1</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-blue-100 text-blue-500 p-2 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="">Feature 2</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-blue-100 text-blue-500 p-2 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="">Feature 3</span>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={handleClick}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Loading..." : "Subscribe for €0.99/month"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPlan;
