import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./Aceternity_Components/Text_Reveal_Card/components/ui/text-reveal-card";

export function TextRevealCardComp({ text , revealText}) {
  return (
    <div className="flex items-center justify-center bg-[#0E0E10] h-[40rem] rounded-2xl w-full">
      <TextRevealCard
        text={text}
        revealText={revealText}
      />
    </div>
  );
}
