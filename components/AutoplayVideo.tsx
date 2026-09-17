"use client";

import { useEffect, useRef, type RefObject } from "react";
import { rememberLoadedMedia } from "@/lib/media-cache";
import { useAutoplayOnView } from "@/lib/use-autoplay-on-view";
import { useInViewOnce } from "@/lib/use-in-view";

export function AutoplayVideo({
  src,
  poster,
  className,
  root,
  preload = "none",
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
  const unlocked = useInViewOnce(videoRef, { root, rootMargin: "160px 0px" });
  const activeSrc = unlocked ? src : undefined;
  useAutoplayOnView(videoRef, root, activeSrc);

  useEffect(() => {
    if (activeSrc) void rememberLoadedMedia(activeSrc);
    if (unlocked && poster) void rememberLoadedMedia(poster);
  }, [activeSrc, unlocked, poster]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={activeSrc || undefined}
      poster={unlocked && poster && poster !== src ? poster : undefined}
      muted
      loop
      playsInline
      autoPlay
      preload={activeSrc ? preload : "none"}
      onCanPlay={() => {
        if (!activeSrc) return;
        void rememberLoadedMedia(activeSrc);
        onCanPlay?.();
      }}
      onError={() => {
        if (!activeSrc) return;
        onError?.();
      }}
    />
  );
}
