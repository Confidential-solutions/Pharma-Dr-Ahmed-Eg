import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, ShieldCheck, HeartPulse } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { Logo, navItems } from "./SiteHeader";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  const helpLinks = [
    { to: "/prescription", labelAr: "اطلب واصرف روشتتك", labelEn: "Order Prescription" },
    { to: "/help", labelAr: "الأسئلة الشائعة والمساعدة", labelEn: "Help & FAQs" },
    { to: "/return-policy", labelAr: "سياسة الاسترجاع والاستبدال", labelEn: "Return & Refund Policy" },
    { to: "/terms", labelAr: "الشروط والأحكام", labelEn: "Terms & Conditions" },
    { to: "/privacy", labelAr: "سياسة الخصوصية وسرية المرضى", labelEn: "Privacy Policy" },
  ] as const;

  return (
    <footer className="mt-24 border-t bg-card">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand & Socials */}
        <div className="space-y-4">
          <Logo />
          <p className="text-muted-foreground leading-relaxed">{t.footer.tagline}</p>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <ShieldCheck className="h-4 w-4" />
            <span>{isAr ? "مرخصة رسمياً من وزارة الصحة المصرية" : "Licensed Egyptian Community Pharmacy"}</span>
          </div>
          <SocialLinks />
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="mb-4 font-bold text-foreground">{t.footer.links}</h3>
          <ul className="space-y-2.5">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t.nav[n.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Patient Care & Help Links */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-bold text-foreground">
            <HeartPulse className="h-4 w-4 text-primary" />
            {isAr ? "رعاية المرضى والمساعدة" : "Patient Care & Help"}
          </h3>
          <ul className="space-y-2.5">
            {helpLinks.map((h) => (
              <li key={h.to}>
                <Link
                  to={h.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {isAr ? h.labelAr : h.labelEn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Working Hours & Contact Info */}
        <div className="space-y-4">
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-bold text-foreground">
              <Clock className="h-4 w-4 text-primary" />
              {t.hoursTitle}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {siteConfig.hours.map((h) => (
                <li key={h.days.en}>
                  <span className="block font-medium text-foreground">{h.days[lang]}</span>
                  {h.time[lang]}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 pt-2 border-t">
            <p className="flex gap-2 text-xs text-muted-foreground">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              {t.address}
            </p>
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span dir="ltr" className="unicode-isolate">
                {siteConfig.phoneDisplay}
              </span>
            </a>
            <a
              href={siteConfig.emailHref}
              className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span dir="ltr" className="unicode-isolate">
                {siteConfig.email}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Subfooter */}
      <div className="border-t py-6">
        <div className="container-page flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-start">
          <div>
            © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/return-policy" className="hover:text-primary transition-colors">
              {isAr ? "سياسة الاسترجاع" : "Return Policy"}
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-primary transition-colors">
              {isAr ? "الشروط والأحكام" : "Terms"}
            </Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
