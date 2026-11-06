import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useScrolled } from "@/hooks";

// Back-to-top button on the opposite side of the WhatsApp button,
// with a circular scroll-progress ring.
export function ScrollTop() {
  const { t } = useI18n();
  const show = useScrolled(400);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          key="scroll-top"
          aria-label={t.toTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.4, y: 30, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 30, rotate: 90 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="group fixed bottom-5 start-5 z-50 grid h-14 w-14 place-items-center rounded-full border bg-card/80 text-primary shadow-elegant backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg
            viewBox="0 0 56 56"
            className="absolute inset-0 h-full w-full -rotate-90"
            aria-hidden
          >
            <circle cx="28" cy="28" r="25" fill="none" strokeWidth="3" className="stroke-muted" />
            <motion.circle
              cx="28"
              cy="28"
              r="25"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              className="stroke-primary"
              style={{ pathLength: progress }}
            />
          </svg>
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-primary-foreground transition-transform duration-300">
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
