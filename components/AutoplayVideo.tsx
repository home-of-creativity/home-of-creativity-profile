"use client";

import { useRef, type RefObject } from "react";
import { useAutoplayOnView } from "@/lib/use-autoplay-on-view";

export function AutoplayVideo({
  src,
  poster,
  className,
  root,
  onCanPlay,
  onError,
}: {
  src: string;
  poster?: string;
  className?: string;
  root?: RefObject<Element | null>;
  onCanPlay?: () => void;
  onError?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayOnView(videoRef, root);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster && poster !== src ? poster : undefined}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      onCanPlay={onCanPlay}
      onError={onError}
    />
  );
}
