// ⚠️ Edit these values to update contact info site-wide.
export const siteConfig = {
  // TODO: replace with the real numbers (international format, digits only for whatsapp)
  phoneDisplay: "+20 1XX XXX XXXX",
  phoneHref: "tel:+201000000000",
  whatsappNumber: "201000000000",
  facebookUrl: "https://facebook.com/",
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
