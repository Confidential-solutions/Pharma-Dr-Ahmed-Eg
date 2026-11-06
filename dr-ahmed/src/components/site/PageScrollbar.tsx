import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

// Custom page scrollbar: no arrow buttons, sits on the inline-end side
// (left in Arabic/RTL, right in English/LTR), draggable, auto-hides when idle.
export function PageScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(1);
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [headerH, setHeaderH] = useState(72);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.3 });
  const top = useTransform(smooth, (v) => `${v * (100 - ratio * 100)}%`);

  useEffect(() => {
    const header = document.querySelector("header");
    const measure = () => {
      const h = header?.getBoundingClientRect().height ?? 0;
      setHeaderH(h);
      // Thumb size = visible content area (below sticky header) / scrollable content
      const doc = document.documentElement.scrollHeight - h;
      setRatio(Math.min(1, (innerHeight - h) / Math.max(1, doc)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    if (header) ro.observe(header);
    window.addEventListener("resize", measure);
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setActive(true);
      clearTimeout(t);
      t = setTimeout(() => setActive(false), 1200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  const scrollToPointer = (clientY: number, offset = 0.5) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = (clientY - r.top) / r.height - (ratio * offset);
    const max = document.documentElement.scrollHeight - innerHeight;
    window.scrollTo({ top: Math.max(0, Math.min(1, p / (1 - ratio))) * max, behavior: "instant" as ScrollBehavior });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    scrollToPointer(e.clientY);
    const move = (ev: PointerEvent) => scrollToPointer(ev.clientY);
    const up = () => {
      setDragging(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  if (ratio >= 1) return null;
  const visible = active || dragging;

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      aria-hidden
      style={{ top: headerH }}
      className="group fixed bottom-0 end-0 z-[55] hidden w-3 cursor-pointer touch-none md:block"
    >
      <div className={`absolute inset-y-0 end-0 w-2 bg-muted/70 backdrop-blur transition-opacity duration-500 group-hover:opacity-100 ${visible ? "opacity-100" : "opacity-0"}`} />
      <motion.div
        style={{ top, height: `${ratio * 100}%` }}
        className={`absolute end-0 w-2 rounded-full bg-gradient-primary shadow-soft transition-[width,opacity] duration-300 group-hover:w-3 ${dragging ? "w-3" : ""} ${visible ? "opacity-100" : "opacity-60"}`}
      />
    </div>
  );
}
