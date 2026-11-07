# ♿ Accessibility Statement & Standards

> **Dr. Ahmed Pharmacy (`صيدلية د. أحمد طارق سليم`)** is committed to digital equity and healthcare accessibility. We ensure that our platform is welcoming, usable, and accessible to everyone, including patients with visual, auditory, motor, cognitive disabilities, elderly patients, and assistive technology users.

---

## 🎯 Our Standards & Target Conformance

We target conformance with the **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA** and follow universal design principles across our bilingual platform (Arabic primary, English secondary).

---

## 🏛️ Core Accessibility Pillars

### 1. Bilingual & Bidirectional Support (RTL & LTR)
- **Native Directionality:** The interface automatically switches between `dir="rtl"` (Arabic) and `dir="ltr"` (English) with dedicated typography stacks (`Readex Pro` & `IBM Plex Sans Arabic` for Arabic; `Inter` for English).
- **CSS Logical Properties:** All layouts use logical margins, paddings, and borders (`ms-*`, `me-*`, `ps-*`, `pe-*`, `border-s`, `border-e`, `start-*`, `end-*`) to prevent layout overlap or reading order confusion.
- **BiDi Isolation:** Phone numbers, email addresses, and mixed alphanumeric codes use `dir="ltr"` with `unicode-bidi: isolate` (`unicode-isolate`) to guarantee natural reading order for screen readers.

### 2. Keyboard Navigation & Focus Management
- **Full Keyboard Operability:** Every interactive element (navigation links, buttons, theme toggles, modal dialogs, and form inputs) is fully operable via standard keyboard controls (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`).
- **Visible Focus Indicators:** High-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-ring`) are applied consistently across all interactive controls.
- **Focus Trapping:** Modal dialogs (Authentication dialog, image lightboxes, mobile menu) trap focus within the active overlay and return focus to the triggering element upon dismissal.
- **Escape Dismissal:** Pressing `Escape` reliably closes all open menus, modals, and image lightboxes.

### 3. Screen Readers & Semantic Structure
- **Semantic HTML5:** Native landmark tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<dialog>`) are used throughout to allow screen reader users to jump between page regions.
- **Accessible State Labels:** Dynamic controls declare their state using standard ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-modal="true"`, `aria-invalid`, `role="status"`).
- **Decorative Media Exclusion:** Decorative SVGs, gradient overlays, and background illustrations carry `aria-hidden="true"` so assistive technologies only announce meaningful content.
- **Meaningful Alternative Text:** All clinical service images, pharmacy photographs, and prescription upload previews feature descriptive `alt` attributes localized in the user's active language.

### 4. Color Contrast & Visual Design
- **High-Contrast Palette:** All text elements meet or exceed WCAG AA contrast ratios (minimum 4.5:1 for body copy and 3:1 for large display text) in both Light and Dark modes.
- **No Color-Only Information:** Status badges, error messages, and alerts convey status through icons and text labels in addition to color.
- **Responsive Scalability:** The application supports text zoom up to 200% without loss of content, horizontal scrolling, or broken layouts.

### 5. Motion & Vestibular Safety
- **Motion Reduction:** Respects the user's operating system preferences via `prefers-reduced-motion: reduce`.
- **Gentle Transitions:** Transitions rely on smooth spring physics and subtle opacity shifts rather than aggressive flashing or high-frequency animations.

---

## 🧪 Evaluated & Supported Environments

We test and support the platform across modern browsers, operating systems, and assistive technologies:

| Category | Supported / Evaluated Combinations |
|---|---|
| **Browsers** | Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge |
| **Mobile Platforms** | iOS (Safari), Android (Chrome, Samsung Internet) |
| **Screen Readers** | NVDA (Windows), JAWS (Windows), VoiceOver (iOS & macOS), TalkBack (Android) |
| **Input Methods** | Keyboard-only, touchscreen, switch access, high-contrast display modes |

---

## 📣 Reporting Accessibility Barriers

If you encounter any difficulty accessing any part of our website or service, please let us know so we can assist you and resolve the barrier:

- **WhatsApp Support:** [+20 102 304 3122](https://wa.me/201023043122)
- **Direct Phone:** [+20 102 304 3122](tel:+201023043122)
- **Email:** [dr.ahmed.tarak73@gmail.com](mailto:dr.ahmed.tarak73@gmail.com)
- **GitHub Issues:** [Open an Accessibility Issue](https://github.com/Confidential-solutions/Pharma-Dr-Ahmed-Eg/issues/new?template=bug_report.yml)

When reporting an issue, please describe:
1. The webpage URL or task you were trying to complete.
2. The barrier or unexpected behavior encountered.
3. The browser, operating system, or assistive technology in use (if applicable).

We acknowledge accessibility inquiries promptly and prioritize fixes in our continuous deployment releases.
