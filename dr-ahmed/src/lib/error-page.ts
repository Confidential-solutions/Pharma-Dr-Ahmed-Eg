/**
 * error-page.ts
 * -------------
 * Renders the SSR-level 500 error page — shown when the server fails
 * before React even mounts. Keep this as plain HTML with inline styles
 * (no Tailwind, no fonts) so it always works, even on a bare failure.
 */
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>خطأ في صيدلية د. أحمد طارق سليم</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      *, *::before, *::after { box-sizing: border-box; }
      body {
        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        background: #f9fafb;
        color: #111827;
        display: grid;
        place-items: center;
        min-height: 100vh;
        margin: 0;
        padding: 1.5rem;
      }
      .card {
        max-width: 30rem;
        width: 100%;
        text-align: center;
        padding: 2.5rem 2rem;
        background: #fff;
        border-radius: 1rem;
        box-shadow: 0 1px 4px rgba(0,0,0,.08);
      }
      .cross {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 5rem;
        height: 5rem;
        border-radius: 9999px;
        background: #dcfce7;
        margin-bottom: 1.25rem;
      }
      h1 { font-size: 1.25rem; margin: 0 0 .5rem; font-weight: 700; }
      .subtitle { color: #6b7280; font-size: .9rem; margin: 0 0 .4rem; }
      .subtitle-en { color: #9ca3af; font-size: .78rem; margin: 0 0 1.75rem; }
      .actions { display: flex; gap: .625rem; justify-content: center; flex-wrap: wrap; }
      a, button {
        padding: .5rem 1.25rem;
        border-radius: .5rem;
        font: inherit;
        cursor: pointer;
        text-decoration: none;
        border: 1px solid transparent;
        font-size: .875rem;
        font-weight: 500;
        transition: background .15s;
      }
      .primary { background: #16a34a; color: #fff; }
      .primary:hover { background: #15803d; }
      .secondary { background: #fff; color: #111827; border-color: #d1d5db; }
      .secondary:hover { background: #f3f4f6; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="cross" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
          <rect x="18" y="6"  width="12" height="36" rx="3" fill="#16a34a"/>
          <rect x="6"  y="18" width="36" height="12" rx="3" fill="#16a34a"/>
        </svg>
      </div>
      <h1>حدث خطأ غير متوقع</h1>
      <p class="subtitle">نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى.</p>
      <p class="subtitle-en">An unexpected error occurred. Please try again or return home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">حاول مجددًا</button>
        <a class="secondary" href="/">الصفحة الرئيسية</a>
      </div>
    </div>
  </body>
</html>`;
}
