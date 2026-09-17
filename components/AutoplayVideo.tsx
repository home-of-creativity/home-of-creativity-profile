"use client";

import { useRef, type RefObject } from "react";
import { useAutoplayOnView } from "@/lib/use-autoplay-on-view";

export function AutoplayVideo({
  src,
  poster,
  className,
  root,
  preload = "metadata",
  onCanPlay,
  onError,
}: {
  src?: string;
  poster?: string;
  className?: string;
  root?: RefObject<Element | null>;
  preload?: "none" | "metadata" | "auto";
  onCanPlay?: () => void;
  onError?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayOnView(videoRef, root, src);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src || undefined}
      poster={poster && poster !== src ? poster : undefined}
      muted
      loop
      playsInline
      autoPlay
      preload={src ? preload : "none"}
      onCanPlay={onCanPlay}
      onError={onError}
    />
  );
}
