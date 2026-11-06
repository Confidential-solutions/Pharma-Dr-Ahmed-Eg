import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { Logo, navItems } from "./SiteHeader";

/** TikTok SVG — not in Lucide */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.98a8.26 8.26 0 0 0 4.83 1.55V7.08a4.84 4.84 0 0 1-1.06-.39z" />
    </svg>
  );
}

const socialLinks = [
  { href: siteConfig.facebookUrl, Icon: Facebook, label: "Facebook" },
  { href: siteConfig.instagramUrl, Icon: Instagram, label: "Instagram" },
  { href: siteConfig.tiktokUrl, Icon: TikTokIcon, label: "TikTok" },
  { href: siteConfig.linkedinUrl, Icon: Linkedin, label: "LinkedIn" },
];

export function SiteFooter() {
  const { t, lang } = useI18n();
  return (
    <footer className="mt-24 border-t bg-card">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-muted-foreground">{t.footer.tagline}</p>
          {/* Social icons row */}
          <div className="flex flex-wrap gap-2">
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-foreground">{t.footer.links}</h3>
          <ul className="space-y-2">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {t.nav[n.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-bold text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            {t.hoursTitle}
          </h3>
          <ul className="space-y-3">
            {siteConfig.hours.map((h) => (
              <li key={h.days.en} className="text-muted-foreground">
                <span className="block font-medium text-foreground">{h.days[lang]}</span>
                {h.time[lang]}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="mb-4 font-bold text-foreground">{t.locationTitle}</h3>
          <p className="flex gap-2 text-muted-foreground">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
            {t.address}
          </p>
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4 shrink-0 text-primary" />
            <span dir="ltr" className="unicode-isolate">
              {siteConfig.phoneDisplay}
            </span>
          </a>
          <a
            href={siteConfig.emailHref}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4 shrink-0 text-primary" />
            <span dir="ltr" className="unicode-isolate">
              {siteConfig.email}
            </span>
          </a>
        </div>
      </div>
      <div className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
      </div>
    </footer>
  );
}
