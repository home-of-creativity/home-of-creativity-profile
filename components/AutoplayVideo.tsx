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
  onCanPlay,
  onError,
}: {
  src?: string;
  poster?: string;
  className?: string;
  root?: RefObject<Element | null>;
  preload?: "none" | "metadata" | "auto";
  eager?: boolean;
  onCanPlay?: () => void;
  onError?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const unlocked = useInViewOnce(videoRef, { root, rootMargin: "160px 0px" });
  const activeSrc = eager || unlocked ? src : undefined;
  const showPoster = (eager || unlocked) && poster && poster !== src ? poster : undefined;
  useAutoplayOnView(videoRef, root, activeSrc);

  useEffect(() => {
    if (activeSrc) void rememberLoadedMedia(activeSrc);
    if (showPoster) void rememberLoadedMedia(showPoster);
  }, [activeSrc, showPoster]);

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
