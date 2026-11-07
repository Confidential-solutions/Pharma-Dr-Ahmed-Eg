import type { ComponentType } from "react";

export interface SocialLinkItem {
  key: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  label: string;
}

