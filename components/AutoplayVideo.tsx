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
  eager = false,
  onReady,
  onError,
}: {
  src?: string;
  poster?: string;
  className?: string;
  root?: RefObject<Element | null>;
  preload?: "none" | "metadata" | "auto";
  eager?: boolean;
  onReady?: () => void;
  onError?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const unlocked = useInViewOnce(videoRef, { root, rootMargin: "160px 0px" });
  const activeSrc = eager || unlocked ? src : undefined;
  const showPoster = (eager || unlocked) && poster && poster !== src ? poster : undefined;
  useAutoplayOnView(videoRef, root, activeSrc);

  useEffect(() => {
    if (showPoster) void rememberLoadedMedia(showPoster);
  }, [showPoster]);

  const ready = () => {
    if (activeSrc) onReady?.();
  };

  return (
    <video
      ref={videoRef}
      className={className}
      src={activeSrc || undefined}
      poster={showPoster}
      muted
      loop
      playsInline
      autoPlay
      preload={activeSrc ? preload : "none"}
      onLoadedData={ready}
      onPlaying={ready}
      onCanPlay={ready}
      onError={() => {
        if (!activeSrc) return;
        onError?.();
      }}
    />
  );
}
