import { Facebook, Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { SocialLinkItem } from "@/types";

export type { SocialLinkItem };

/** TikTok SVG — styled to match Lucide outline stroke aesthetic (2px stroke, round caps/joins) */
export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export const socialLinks: SocialLinkItem[] = [
  { key: "facebook", href: siteConfig.facebookUrl, Icon: Facebook, label: "Facebook" },
  { key: "instagram", href: siteConfig.instagramUrl, Icon: Instagram, label: "Instagram" },
  { key: "tiktok", href: siteConfig.tiktokUrl, Icon: TikTokIcon, label: "TikTok" },
  { key: "linkedin", href: siteConfig.linkedinUrl, Icon: Linkedin, label: "LinkedIn" },
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
