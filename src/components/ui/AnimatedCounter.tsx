"use client";

import { useCounter } from "@/hooks/useCounter";
import { useInView } from "@/hooks/useInView";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const count = useCounter(value, duration, inView);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
