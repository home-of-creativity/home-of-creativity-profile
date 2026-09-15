"use client";

import { useEffect, type RefObject } from "react";

export function usePhoneFeedScroll(ref: RefObject<HTMLElement | null>, ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    const el = ref.current;
    if (!el) return;

    let pointerId: number | null = null;
    let startY = 0;
    let startScroll = 0;
    let dragged = false;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      pointerId = event.pointerId;
      startY = event.clientY;
      startScroll = el.scrollTop;
      dragged = false;
      el.classList.add("is-dragging");
      el.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (pointerId !== event.pointerId) return;
      const delta = event.clientY - startY;
      if (!dragged && Math.abs(delta) < 8) return;
      dragged = true;
      el.scrollTop = startScroll - delta;
      event.preventDefault();
    };

    const endPointer = (event: PointerEvent) => {
      if (pointerId !== event.pointerId) return;
      pointerId = null;
      el.classList.remove("is-dragging");
      if (!dragged) return;
      const blockClick = (clickEvent: Event) => {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();
        el.removeEventListener("click", blockClick, true);
      };
      el.addEventListener("click", blockClick, true);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      el.scrollTop += event.deltaY;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endPointer);
    el.addEventListener("pointercancel", endPointer);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endPointer);
      el.removeEventListener("pointercancel", endPointer);
      el.removeEventListener("wheel", onWheel);
    };
  }, [ref, ready]);
}
