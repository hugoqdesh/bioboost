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

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { id } = await res.json();

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />

      <div
        className="relative text-gray-300 flex mt-36 md:mt-20 lg:mt-40 lg:ml-32"
        id="pricing"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br to-purple-400 from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-indigo-600"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          {/* <div className="mb-10 space-y-4 px-6 md:px-0">
            <h2 className="text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Pricing
            </h2>
          </div> */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="flex flex-col items-center aspect-auto p-4 sm:p-8 border rounded-3xl bg-gray-800 border-gray-700 shadow-gray-600/10 shadow-none m-2 flex-1 max-w-md">
              <h2 className="text-lg sm:text-xl font-medium text-white mb-2">
                Pro Plan
              </h2>
              <p className="text-lg sm:text-xl text-center mb-6 mt-4">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  0.99$
                </span>{" "}
                per Month
              </p>
              <p className="text-center mb-6">
                Get access to all premium features for just 0.99$ per month. No
                hidden fees or extra charges.
              </p>
              <button
                onClick={handleClick}
                rel="noreferrer"
                className={`relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-white before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                <span className="relative text-sm font-semibold text-black">
                  {loading ? "Loading..." : "Get Started"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPlan;
