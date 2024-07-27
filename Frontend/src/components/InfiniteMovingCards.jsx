import React from "react";
import { InfiniteMovingCards } from "./Aceternity_Components/Infinite_Moving_Cards/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsCompo ({ testimonials }) {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
