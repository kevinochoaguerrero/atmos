"use client";

import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

interface StickyScrollProps {
  content: ContentItem[];
  contentClassName?: string;
}

export const StickyScroll: React.FC<StickyScrollProps> = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  // Ensure activeCard is within bounds
  const safeActiveCard = Math.min(activeCard, cardLength - 1);

  return (
    <motion.div
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-4 gap-20 rounded-md p-10"
      ref={ref}
    >
      <div className="relative mt-10 flex items-start px-2">
        <div className="max-w-md">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: safeActiveCard === index ? 1 : 0.3 }}
                className="text-[28px] font-bold text-white"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: safeActiveCard === index ? 1 : 0.3 }}
                className="text-[17px] text-white max-w-md mt-4 leading-[22px] tracking-wide"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "hidden lg:flex flex-col gap-8 h-fit w-80 rounded-md sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {/* Check if content exists before accessing */}
        {content.length > 0 && (
          <>
            <div>{content[safeActiveCard].content ?? null}</div>
            <div className="flex justify-center">
              <Link href="/map" passHref>
                <Button className="w-fit border border-[#0052B0]">
                  Go to the source
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
