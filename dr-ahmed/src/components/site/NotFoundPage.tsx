import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  MapPin,
  Pill,
  Phone,
  Sparkles,
  Stethoscope,
  MessageCircle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppFab";

export function NotFoundPage() {
  const { t, lang, isRtl } = useI18n();
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const quickLinks = [
    { to: "/services", label: t.nav.services, icon: Stethoscope },
    { to: "/location", label: t.nav.location, icon: MapPin },
    { to: "/contact", label: t.nav.contact, icon: MessageCircle },
  ] as const;

  return (
    <main
      role="main"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background px-4 py-16 text-center"
    >
      {/* Ambient background glow & radial lights */}
      <div
        className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 end-10 -z-10 h-80 w-80 rounded-full bg-mint/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative z-10 mx-auto flex max-w-xl flex-col items-center">
        {/* Floating animated pharmacy badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          {/* Pulsing halo */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.65, 0.35],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-2 rounded-full bg-gradient-primary blur-md"
            aria-hidden="true"
          />

          {/* Floating animated icon container */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-primary/20 bg-card/90 text-primary shadow-elegant backdrop-blur-md"
          >
            <div className="relative">
              {/* Animated medical cross */}
              <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" aria-hidden="true">
                <rect x="18" y="6" width="12" height="36" rx="4" fill="currentColor" />
                <rect x="6" y="18" width="36" height="12" rx="4" fill="currentColor" />
              </svg>
              {/* Sparkle decorative accent */}
              <motion.span
                animate={{ rotate: [0, 180, 360], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -end-1 text-primary-glow"
              >
                <Sparkles className="h-4 w-4" />
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Status pill badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="badge-pill mb-4"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
          <span>
            {t.brandShort} • {t.errors.notFoundCode}
          </span>
        </motion.span>

        {/* 404 Large Display Typography with glowing text gradient */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6, type: "spring", stiffness: 300, damping: 25 }}
          className="text-7xl font-extrabold tracking-tight sm:text-8xl md:text-9xl"
        >
          <span className="text-gradient drop-shadow-sm">{t.errors.notFoundCode}</span>
        </motion.h1>

        {/* Localized Titles */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-4 space-y-2"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t.errors.notFoundTitle}
          </h2>
          <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.errors.notFoundDesc}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Button
            asChild
            variant="hero"
            size="xl"
            className="rounded-full shadow-soft hover:shadow-elegant"
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              {t.errors.backHome}
            </Link>
          </Button>

          <Button
            asChild
            variant="whatsapp"
            size="xl"
            className="rounded-full shadow-soft hover:shadow-elegant"
          >
            <a
              href={whatsappLink(t.waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.cta.whatsapp}
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.errors.contactUs}
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="xl"
            className="rounded-full shadow-soft backdrop-blur-sm"
          >
            <a href={siteConfig.phoneHref}>
              <Phone className="h-4 w-4" />
              <span dir="ltr" className="unicode-isolate">
                {siteConfig.phoneDisplay}
              </span>
            </a>
          </Button>
        </motion.div>

        {/* Quick Suggestion Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-12 w-full rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-md"
        >
          <p className="text-xs font-medium text-muted-foreground">
            {lang === "ar"
              ? "أو يمكنك استكشاف أحد الأقسام التالية:"
              : "Or explore one of these sections:"}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary hover:bg-secondary hover:text-primary"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  <span>{link.label}</span>
                  <Arrow className="h-3 w-3 opacity-60" />
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
