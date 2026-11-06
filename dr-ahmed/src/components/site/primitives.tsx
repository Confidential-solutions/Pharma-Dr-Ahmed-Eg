import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import {
  Pill, Sparkles, Baby, HeartPulse, Truck, MessageCircleHeart, Activity, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const serviceIcons: Record<string, LucideIcon> = {
  meds: Pill, beauty: Sparkles, baby: Baby, chronic: HeartPulse, delivery: Truck, consult: MessageCircleHeart, bp: Activity,
};

export function Reveal({ delay = 0, className, children, ...rest }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ title, sub, className }: { title: string; sub?: string; className?: string }) {
  return (
    <Reveal className={cn("mx-auto mb-12 max-w-2xl text-center", className)}>
      <span className="mx-auto mb-4 block h-1 w-12 rounded-full bg-gradient-primary" />
      <h2 className="text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-lg text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export function PageHero({ title, sub, image }: { title: string; sub: string; image: string }) {
  return (
    <section className="relative overflow-hidden">
      <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" width={1600} height={900} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
      <div className="container-page relative py-20 text-center md:py-28">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-foreground md:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
        >
          {sub}
        </motion.p>
      </div>
    </section>
  );
}

export function IconBadge({ icon: Icon = Pill, className }: { icon?: LucideIcon | undefined; className?: string }) {
  return (
    <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-gradient-primary group-hover:text-primary-foreground", className)}>
      <Icon className="h-6 w-6" aria-hidden />
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("group rounded-3xl border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant", className)}>
      {children}
    </div>
  );
}
