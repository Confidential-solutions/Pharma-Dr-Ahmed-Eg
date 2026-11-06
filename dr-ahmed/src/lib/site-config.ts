// ⚠️ Edit these values to update contact info site-wide.
export const siteConfig = {
  // ── Contact ──────────────────────────────────────────────────────────────
  phoneDisplay: "+20 102 304 3122",
  phoneHref: "tel:+201023043122",
  whatsappNumber: "201023043122",
  email: "dr.ahmed.tarak73@gmail.com",
  emailHref: "mailto:dr.ahmed.tarak73@gmail.com",

  // ── Social media ─────────────────────────────────────────────────────────
  facebookUrl: "https://www.facebook.com/profile.php?id=61596102338642",
  instagramUrl: "https://www.instagram.com/pharma_ahmed_selim",
  tiktokUrl: "https://www.tiktok.com/@ahmed.tarek8125",
  linkedinUrl: "https://www.linkedin.com/in/pharma-dr-ahmed-tarek/",
  mapQuery: "مسجد الشيخ إسماعيل ميت الرخا زفتى الغربية",
  // Working hours — edit freely
  hours: [
    { days: { ar: "السبت – الخميس", en: "Saturday – Thursday" }, time: { ar: "٩ صباحًا – ١٢ منتصف الليل", en: "9:00 AM – 12:00 AM" } },
    { days: { ar: "الجمعة", en: "Friday" }, time: { ar: "١ ظهرًا – ١٢ منتصف الليل", en: "1:00 PM – 12:00 AM" } },
  ],
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&z=16&output=embed`;
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapQuery)}`;
