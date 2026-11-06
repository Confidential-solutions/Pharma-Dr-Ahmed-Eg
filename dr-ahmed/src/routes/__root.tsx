import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { ThemeProvider, themeInitScript } from "../lib/theme";
import { I18nProvider } from "../lib/i18n";
import { AuthProvider } from "../lib/auth";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";
import { WhatsAppFab } from "../components/site/WhatsAppFab";
import { PageScrollbar } from "../components/site/PageScrollbar";
import { ScrollTop } from "../components/site/ScrollTop";

const langInitScript = `
(function() {
  try {
    var l = localStorage.getItem('lang');
    if (l === 'en') {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      document.documentElement.setAttribute('data-dir', 'ltr');
    } else {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      document.documentElement.setAttribute('data-dir', 'rtl');
    }
  } catch(e) {}
})();
`;

// ── 404 Not Found ─────────────────────────────────────────────────────────────
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      {/* Green cross icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary shadow-soft">
        <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden="true">
          <rect x="18" y="6" width="12" height="36" rx="3" fill="currentColor" />
          <rect x="6" y="18" width="36" height="12" rx="3" fill="currentColor" />
        </svg>
      </div>

      <p className="text-6xl font-bold tracking-tight text-primary">404</p>

      {/* Arabic */}
      <h1 className="mt-4 text-2xl font-bold text-foreground">الصفحة غير موجودة</h1>
      <p className="mt-2 text-sm text-muted-foreground">الرابط الذي فتحته غير موجود أو تم نقله.</p>

      {/* English */}
      <p className="mt-1 text-xs text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-elegant"
        >
          العودة للرئيسية
        </Link>
        <a
          href="https://wa.me/201000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground shadow-soft transition-all hover:bg-accent"
        >
          تواصل معنا
        </a>
      </div>
    </div>
  );
}

// ── Error Boundary ────────────────────────────────────────────────────────────
function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportError(error, { boundary: "root_error_boundary" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      {/* Warning icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive shadow-soft">
        <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden="true">
          <path
            d="M24 6L44 42H4L24 6Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
            fill="none"
          />
          <line
            x1="24"
            y1="20"
            x2="24"
            y2="30"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="24" cy="36" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Arabic */}
      <h1 className="text-2xl font-bold text-foreground">حدث خطأ غير متوقع</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        نعتذر عن هذا الخطأ. يمكنك المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
      </p>

      {/* English */}
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">
        An unexpected error occurred. Please try again or return home.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-elegant"
        >
          حاول مجددًا
        </button>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground shadow-soft transition-all hover:bg-accent"
        >
          الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}

// ── Route Definition ──────────────────────────────────────────────────────────
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "صيدلية د. أحمد طارق سليم | ميت الرخا – زفتى" },
      {
        name: "description",
        content:
          "صيدلية د. أحمد طارق سليم في ميت الرخا، مركز زفتى، الغربية — أدوية، مستحضرات تجميل، رعاية الأم والطفل، وتوصيل للبيت.",
      },
      { name: "keywords", content: "صيدلية, ميت الرخا, زفتى, الغربية, أدوية, pharmacy, Egypt" },
      { name: "author", content: "د. أحمد طارق سليم" },
      { name: "theme-color", content: "#16a34a" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_EG" },
      { property: "og:site_name", content: "صيدلية د. أحمد طارق سليم" },
      { property: "og:title", content: "صيدلية د. أحمد طارق سليم | ميت الرخا – زفتى" },
      {
        property: "og:description",
        content: "صيدلية موثوقة في ميت الرخا — أدوية أصيلة، توصيل للبيت، واستشارة صيدلانية.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      { rel: "dns-prefetch", href: "https://jqckzibvkggwfvsdzawa.supabase.co" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Readex+Pro:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// ── Shell (SSR HTML wrapper) ──────────────────────────────────────────────────
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// ── Root Component ────────────────────────────────────────────────────────────
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* ThemeProvider → I18nProvider → AuthProvider wraps entire app tree.
          Outlet renders the matched child route. Never remove it. */}
      <ThemeProvider>
        <I18nProvider>
          <AuthProvider>
            <div className="flex min-h-dvh flex-col">
              <SiteHeader />
              <main className="flex-1">
                <Outlet />
              </main>
              <SiteFooter />
            </div>
            <WhatsAppFab />
            <PageScrollbar />
            <ScrollTop />
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
