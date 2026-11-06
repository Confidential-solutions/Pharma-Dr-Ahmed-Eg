import { Facebook, Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { SocialLinkItem } from "@/types";

export type { SocialLinkItem };

/** TikTok SVG — clean inline SVG */
export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.98a8.26 8.26 0 0 0 4.83 1.55V7.08a4.84 4.84 0 0 1-1.06-.39z" />
    </svg>
  );
}

export const socialLinks: SocialLinkItem[] = [
  { key: "facebook",  href: siteConfig.facebookUrl,  Icon: Facebook,   label: "Facebook"  },
  { key: "instagram", href: siteConfig.instagramUrl, Icon: Instagram,  label: "Instagram" },
  { key: "tiktok",    href: siteConfig.tiktokUrl,    Icon: TikTokIcon, label: "TikTok"    },
  { key: "linkedin",  href: siteConfig.linkedinUrl,  Icon: Linkedin,   label: "LinkedIn"  },
];

interface SocialLinksProps {
  className?: string;
  itemClassName?: string;
  iconClassName?: string;
}

export function SocialLinks({
  className,
  itemClassName,
  iconClassName = "h-5 w-5",
}: SocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {socialLinks.map(({ key, href, Icon, label }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            "inline-grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105 shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            itemClassName,
          )}
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
}
