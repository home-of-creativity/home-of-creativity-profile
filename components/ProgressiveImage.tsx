"use client";

import Image from "next/image";
import { useRef, useState, type ImgHTMLAttributes, type RefObject } from "react";
import { rememberLoadedMedia } from "@/lib/media-cache";
import { useInViewOnce } from "@/lib/use-in-view";
import { cn } from "@/lib/cn";

function markLoaded(url: string | undefined) {
  void rememberLoadedMedia(url);
}

export function ProgressiveImage({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
  sizes,
  priority = false,
  referrerPolicy,
  draggable,
  root,
  rootMargin,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  referrerPolicy?: ImgHTMLAttributes<HTMLImageElement>["referrerPolicy"];
  draggable?: boolean;
  root?: RefObject<Element | null>;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref, { disabled: priority, root, rootMargin });
  const [loaded, setLoaded] = useState(false);
  const active = Boolean(src) && (priority || inView);

  return (
    <div ref={ref} className={cn("h-full w-full", className)}>
      {active ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src ?? ""}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          decoding="async"
          referrerPolicy={referrerPolicy}
          draggable={draggable}
          className={cn("media-reveal", loaded && "is-loaded", imgClassName)}
          onLoad={() => {
            setLoaded(true);
            markLoaded(src ?? undefined);
          }}
        />
      ) : null}
    </div>
  );
}

export function DeferredFillImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
  rootMargin,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref, { disabled: priority, rootMargin });
  const show = priority || inView;
  const [loaded, setLoaded] = useState(false);

  return (
    <div ref={ref} className="absolute inset-0">
      {show ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("media-reveal", loaded && "is-loaded", className)}
          onLoad={() => {
            setLoaded(true);
            markLoaded(src);
          }}
        />
      ) : null}
    </div>
  );
}
