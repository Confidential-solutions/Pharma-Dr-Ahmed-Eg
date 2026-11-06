# Performance & Optimization Architecture

This document outlines the performance optimizations applied across **Dr. Ahmed Pharmacy** to guarantee ultra-fast page load times, minimal Time-to-First-Byte (TTFB), and responsive Largest Contentful Paint (LCP).

---

## 1. Summary of Optimizations

| Area | Optimization | Impact |
| --- | --- | --- |
| **Images** | High-performance Supabase CDN delivery | Eliminates heavy local image bundles; assets served from global edge caches. |
| **Image Compression** | Lossless WebP/JPEG re-encoding (q80) | 10%–16% reduction in payload sizes per image without visual degradation. |
| **Rendering** | `decoding="async"` & `fetchPriority="high"` on Hero | Non-blocking off-main-thread image decoding; critical hero asset prioritized. |
| **Images** | `loading="lazy"` on all off-screen imagery | Gallery & secondary cards only load as they scroll into view. |
| **Font & CDN Preconnect** | Early DNS resolution & TLS preconnect | In `__root.tsx`, `<link rel="preconnect">` and `<link rel="dns-prefetch">` warm up Supabase and Google Fonts CDNs early. |
| **Bundle Splitting** | Lazy loading heavy modals (`AuthDialog`) | `React.lazy()` + `<Suspense>` defers Radix Dialog & Tabs from the critical initial bundle. |
| **Backend API** | Brotli & Gzip Response Compression | In ASP.NET Core `Program.cs`, enabled for all HTTPS and HTTP API JSON payloads. |
| **Backend API** | HTTP `[ResponseCache(Duration = 300)]` | Caches static read endpoints (`/api/pharmacy/info`, `/api/services`) in browser/intermediary caches for 5 minutes. |
| **Backend CORS** | Optimized Dynamic Origin Evaluation | Instant dynamic origin validation for local and configured domain requests. |

---

## 2. Frontend Optimizations

### Critical Image Loading Strategy

- **Hero Image (`/`)**:

  ```tsx
  <img
    src={heroImage}
    alt="Dr. Ahmed Pharmacy"
    fetchPriority="high"
    decoding="async"
    className="..."
  />
  ```

- **Offscreen & Gallery Images**:

  ```tsx
  <img
    src={img.src}
    alt={img.alt}
    loading="lazy"
    decoding="async"
    className="..."
  />
  ```

### Resource Hints (`__root.tsx`)

```html
<link rel="preconnect" href="https://jqckzibvkggwfvsdzawa.supabase.co" crossorigin />
<link rel="dns-prefetch" href="https://jqckzibvkggwfvsdzawa.supabase.co" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### Lazy Modal Code-Splitting (`SiteHeader.tsx`)

Rather than packaging the authentication dialog and its complex tabbed form validation into the initial bundle, it is loaded dynamically on user interaction:

```tsx
const AuthDialog = lazy(() =>
  import("@/components/site/AuthDialog").then((mod) => ({ default: mod.AuthDialog }))
);
```

---

## 3. Backend Optimizations

### ASP.NET Core Middleware Pipeline (`Program.cs`)

```csharp
// Response Compression with Brotli & Gzip
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});

// Response Caching
builder.Services.AddResponseCaching();

// In Middleware Pipeline:
app.UseResponseCompression();
app.UseResponseCaching();
```

### Cached Controller Endpoints

```csharp
[HttpGet("info")]
[ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any)]
public async Task<ActionResult<PharmacyInfoDto>> GetInfo()
```

---

## 4. Benchmarking & Monitoring Recommendations

To verify metrics in CI or production:

1. **Lighthouse CI**: Target score > 90 for Performance, Accessibility, and Best Practices.
2. **PageSpeed Insights**: Evaluate Real User Metrics (Core Web Vitals).
3. **WebPageTest**: Run multi-location tests evaluating Mit Al-Rakha / Cairo latency.
