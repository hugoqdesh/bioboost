"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { users } from "@/users";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="lg:max-w-4xl md:max-w-3xl max-w-[22em] mx-auto p-4">
        <div className="h-100 overflow-hidden rounded-md">
          <InfiniteMovingCards items={users} direction="left" speed="slow" />
          <InfiniteMovingCards items={users} direction="right" speed="slow" />
        </div>
      </div>
    </div>
  );
}
