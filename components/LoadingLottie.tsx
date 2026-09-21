"use client";

import { Lottie } from "lottie-react";
import { useEffect, useState } from "react";
import loadingAnimation from "@/assets/loading.json";
import { cn } from "@/lib/cn";

export function LoadingLottie({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div
      className={cn("loading-lottie", className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      {reduce ? null : (
        <Lottie
          src={loadingAnimation}
          loop
          autoplay
          className="loading-lottie__player"
          style={{ width: "7rem", height: "7rem" }}
          aria-hidden
        />
      )}
      {label ? <span className="loading-lottie__label">{label}</span> : null}
    </div>
  );
}
