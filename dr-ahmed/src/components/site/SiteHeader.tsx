import { Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Cross, Home, Images, Info, Languages, MapPin, MessageSquare, Stethoscope, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// Lazy-load AuthDialog so Radix Dialog + Tabs + Sonner are not on the critical render path
const AuthDialog = lazy(() => import("./AuthDialog").then((m) => ({ default: m.AuthDialog })));

export const navItems = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/services", key: "services" },
  { to: "/location", key: "location" },
  { to: "/gallery", key: "gallery" },
  { to: "/contact", key: "contact" },
] as const;

const navIcons: Record<(typeof navItems)[number]["key"], LucideIcon> = {
  home: Home, about: Info, services: Stethoscope, location: MapPin, gallery: Images, contact: MessageSquare,
};

function MenuIcon({ open }: { open: boolean }) {
  const line = "absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out";
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span className={cn(line, "top-0", open && "top-1.5 rotate-45")} />
      <span className={cn(line, "top-1.5", open && "scale-x-0 opacity-0")} />
      <span className={cn(line, "top-3", open && "top-1.5 -rotate-45")} />
    </span>
  );
}

export function Logo() {
  const { t } = useI18n();
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
        <Cross className="h-5 w-5" fill="currentColor" aria-hidden />
      </span>
      <span className="truncate font-display text-base font-bold text-foreground sm:text-lg">{t.brandShort}</span>
    </Link>
  );
}

export function SiteHeader() {
  const { t, lang, toggleLang } = useI18n();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => innerWidth >= 1024 && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("sticky top-0 z-[56] transition-all duration-300", scrolled ? "glass border-b shadow-soft" : "bg-transparent")}>
      <div className="container-page grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:flex lg:justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="main">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[status=active]:text-primary"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-secondary" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  {t.nav[n.key]}
                </>
              )}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            className="hidden h-10 items-center gap-1.5 rounded-full border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary sm:flex"
          >
            <Languages className="h-4 w-4" aria-hidden />
            {t.lang}
          </button>
          <ThemeToggle />
          <Suspense fallback={<div className="h-9 w-20 animate-pulse rounded-md bg-muted/40" />}>
            <AuthDialog />
          </Suspense>
          <Button asChild variant="hero" className="hidden rounded-full md:inline-flex">
            <a href={whatsappLink(t.waMsg)} target="_blank" rel="noopener noreferrer">{t.cta.order}</a>
          </Button>
          <div ref={menuRef} className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={t.menu}
              aria-expanded={open}
              aria-haspopup="menu"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full border text-foreground transition-all duration-300 hover:border-primary hover:text-primary",
                open ? "border-primary bg-primary text-primary-foreground hover:text-primary-foreground" : "bg-card",
              )}
            >
              <MenuIcon open={open} />
            </button>
            <AnimatePresence>
              {open && (
                <motion.nav
                  key="menu"
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  style={{ transformOrigin: lang === "ar" ? "top left" : "top right" }}
                  className="absolute end-0 top-[calc(100%+0.75rem)] z-50 w-[min(18rem,calc(100vw-2.5rem))] rounded-2xl border bg-popover p-2 text-popover-foreground shadow-elegant"
                >
                  <span className="pointer-events-none absolute -top-1.5 end-3.5 h-3 w-3 rotate-45 rounded-tl-[3px] border-l border-t bg-popover" aria-hidden />
                  <ul className="menu-scroll relative flex max-h-[calc(100dvh-6.5rem)] flex-col gap-0.5 overflow-x-hidden overflow-y-auto overscroll-contain">
                    {navItems.map((n, i) => {
                      const Icon = navIcons[n.key];
                      return (
                        <motion.li key={n.to} initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ delay: 0.03 + i * 0.035 }}>
                          <Link
                            to={n.to}
                            onClick={() => setOpen(false)}
                            activeOptions={{ exact: true }}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium [@media(max-height:500px)]:py-1 text-foreground transition-colors hover:bg-secondary data-[status=active]:bg-secondary data-[status=active]:text-primary"
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-primary transition-colors [@media(max-height:500px)]:h-7 [@media(max-height:500px)]:w-7 group-hover:bg-gradient-primary group-hover:text-primary-foreground group-data-[status=active]:bg-gradient-primary group-data-[status=active]:text-primary-foreground">
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <span className="min-w-0 flex-1 truncate">{t.nav[n.key]}</span>
                            <Chevron className="h-4 w-4 shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-70 group-data-[status=active]:opacity-70" aria-hidden />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                  <div className="mt-2 flex flex-col gap-2 border-t pt-2 md:hidden">
                    <button type="button" onClick={toggleLang} className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-foreground transition-colors hover:bg-secondary sm:hidden">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-primary"><Languages className="h-4 w-4" /></span>
                      {t.lang}
                    </button>
                    <Button asChild variant="hero" className="w-full rounded-xl md:hidden">
                      <a href={whatsappLink(t.waMsg)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{t.cta.order}</a>
                    </Button>
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
