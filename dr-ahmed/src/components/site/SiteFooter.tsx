import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { Logo, navItems } from "./SiteHeader";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  const { t, lang } = useI18n();

  return (
    <footer className="mt-24 border-t bg-card">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand & Socials */}
        <div className="space-y-4">
          <Logo />
          <p className="text-muted-foreground">{t.footer.tagline}</p>
          <SocialLinks />
        </div>

        {/* Navigation Links */}
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

        {/* Working Hours */}
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

        {/* Location & Contact Info */}
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
