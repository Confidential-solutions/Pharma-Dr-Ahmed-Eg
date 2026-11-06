import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

const dict = {
  ar: {
    brand: "صيدلية د. أحمد طارق سليم",
    brandShort: "صيدلية د. أحمد طارق",
    nav: { home: "الرئيسية", about: "من نحن", services: "خدماتنا", location: "الموقع والمواعيد", gallery: "معرض الصور", contact: "تواصل معنا" },
    cta: { whatsapp: "كلمنا واتساب", call: "اتصل بنا", order: "اطلب دواءك الآن", directions: "افتح في خرائط جوجل", more: "اعرف أكتر", allServices: "كل الخدمات" },
    hero: {
      badge: "صيدليتك في ميت الرخا",
      title: "خدمة صيدلانية متميزة",
      titleAccent: "في ميت الرخا",
      text: "في قلب البلد، جنب مسجد الشيخ إسماعيل. أدوية أصلية، نصيحة صيدلانية أمينة، ومعاملة كأنك من أهل البيت.",
      stat1: "قريبين منك", stat1d: "وسط البلد",
      stat2: "استشارة", stat2d: "من صيدلي متخصص",
      stat3: "واتساب", stat3d: "اطلب بسهولة",
    },
    servicesTitle: "خدماتنا", servicesSub: "كل اللي تحتاجه لصحتك وصحة عيلتك في مكان واحد.",
    services: [
      { k: "meds", t: "أدوية", d: "أدوية أصلية ومضمونة بأسعار رسمية، ونساعدك تلاقي البديل المناسب." },
      { k: "beauty", t: "مستحضرات تجميل", d: "منتجات عناية بالبشرة والشعر من ماركات موثوقة." },
      { k: "baby", t: "رعاية الأم والطفل", d: "ألبان أطفال، حفاضات، ومستلزمات العناية بالأم والطفل." },
      { k: "chronic", t: "الأدوية المزمنة", d: "متابعة أدوية الضغط والسكر والقلب وتجهيزها شهريًا." },
      { k: "delivery", t: "توصيل للبيت", d: "ابعت الروشتة على واتساب ونوصّلك طلبك داخل المنطقة." },
      { k: "consult", t: "استشارة صيدلانية", d: "اسأل عن جرعتك أو تداخلات الأدوية ببساطة ومن غير تعقيد." },
    ],
    aboutTitle: "صيدلي ابن البلد", aboutText:
      "صيدلية د. أحمد طارق سليم صيدلية مجتمعية في وسط ميت الرخا. هدفنا بسيط: إن كل واحد يدخل الصيدلية يخرج مطمّن، فاهم دواءه، وعارف إن فيه حد يقدر يسأله في أي وقت.",
    hoursTitle: "مواعيد العمل", hoursNote: "المواعيد قابلة للتغيير في المناسبات والأعياد.",
    locationTitle: "موقعنا", address: "ميت الرخا، مركز زفتى، محافظة الغربية – وسط البلد بجوار مسجد الشيخ إسماعيل",
    orderTitle: "محتاج دوا؟ ابعتلنا الروشتة",
    orderText: "صوّر الروشتة وابعتها على واتساب، وهنرد عليك بالتوفّر والسعر في أسرع وقت.",
    about: {
      title: "من نحن", sub: "حكاية صيدلية اتبنت على الثقة.",
      storyTitle: "حكايتنا",
      story1: "بدأ د. أحمد طارق سليم الصيدلية علشان يقدّم لأهل ميت الرخا خدمة صيدلانية محترمة قريبة منهم، من غير ما يضطروا يسافروا لزفتى أو طنطا عشان دوا أو سؤال.",
      story2: "إحنا مؤمنين إن الصيدلي مش بس بيبيع دوا؛ هو أول حد بتسأله، وبيشرحلك إزاي تاخد علاجك صح، وبينبّهك لو فيه حاجة محتاجة دكتور.",
      valuesTitle: "قيمنا",
      values: [
        { t: "الثقة", d: "أدوية من مصادر موثوقة ونصيحة أمينة دايمًا." },
        { t: "الدقة", d: "مراجعة كل روشتة وجرعة بعناية." },
        { t: "السرعة", d: "خدمة سريعة من غير ما نستعجل على حساب صحتك." },
        { t: "الاهتمام", d: "بنعاملك كواحد من العيلة." },
      ],
      whyTitle: "ليه تختارنا؟",
      why: [
        { t: "قريبين منك", d: "في وسط البلد، سهل توصلنا في أي وقت." },
        { t: "خدمة شخصية", d: "بنعرف زباينّا وبنتابع معاهم علاجهم." },
        { t: "موثوقية", d: "صيدلي متخصص موجود للرد على أسئلتك." },
      ],
    },
    servicesPage: {
      title: "خدماتنا", sub: "خدمات صيدلانية متكاملة لأهل ميت الرخا وزفتى.",
      details: [
        { k: "delivery", t: "التوصيل للمنازل", d: "ابعت طلبك أو صورة الروشتة على واتساب، ونجهّزه ونوصّله لحد باب البيت داخل نطاق المنطقة. (يتم تأكيد التوفر ونطاق التوصيل عند الطلب.)" },
        { k: "chronic", t: "إدارة الأدوية المزمنة", d: "لو بتاخد علاج شهري للضغط أو السكر أو القلب، نقدر نسجّل علاجك ونجهّزه في ميعاده، ونفكّرك قبل ما يخلص." },
        { k: "baby", t: "رعاية الأم والطفل", d: "ألبان ومكملات الأطفال، مستلزمات الرضاعة والعناية، ونصايح بسيطة للأم الجديدة." },
        { k: "beauty", t: "التجميل والعناية الشخصية", d: "منتجات عناية بالبشرة والشعر والجسم، ونساعدك تختار المناسب لنوع بشرتك." },
        { k: "bp", t: "قياس الضغط والاستشارة", d: "قياس ضغط سريع في الصيدلية واستشارة عن أدويتك. (اسأل عن الخدمة في الصيدلية.)" },
        { k: "meds", t: "صرف الروشتات", d: "صرف الروشتات بدقة، مع شرح طريقة الاستخدام والجرعات وأي تداخلات مهمة." },
      ],
    },
    locationPage: {
      title: "الموقع والمواعيد", sub: "تعالى زورنا في قلب ميت الرخا.",
      howTitle: "إزاي توصلنا", how: [
        "الصيدلية في وسط بلد ميت الرخا، مركز زفتى.",
        "جنب مسجد الشيخ إسماعيل مباشرةً – أي حد في البلد هيدلّك.",
        "لو تايه، كلمنا على واتساب وابعتلك اللوكيشن.",
      ],
    },
    contact: {
      title: "تواصل معنا", sub: "عندك سؤال أو عايز تطلب دوا؟ إحنا موجودين.",
      formTitle: "ابعت رسالة", name: "الاسم", phone: "رقم الموبايل", type: "نوع الطلب", message: "رسالتك",
      types: { order: "طلب دواء", consult: "استشارة", delivery: "توصيل", other: "أخرى" },
      send: "إرسال عبر واتساب", sentNote: "هيتفتح واتساب برسالتك جاهزة، اضغط إرسال.",
      errName: "اكتب اسمك", errPhone: "اكتب رقم موبايل صحيح", errMsg: "اكتب رسالتك",
      direct: "تواصل مباشر", facebook: "صفحتنا على فيسبوك", placeholderNote: "رقم مؤقت – سيتم تحديثه",
    },
    gallery: { title: "معرض الصور", sub: "جولة سريعة داخل الصيدلية.", items: ["داخل الصيدلية", "د. أحمد طارق سليم", "الأدوية", "مستحضرات التجميل", "رعاية الطفل", "قياس الضغط", "التوصيل", "واجهة الصيدلية"] },
    footer: { links: "روابط سريعة", rights: "جميع الحقوق محفوظة.", tagline: "صيدليتك الأمينة في ميت الرخا." },
    theme: "تبديل الوضع", lang: "English", menu: "القائمة", toTop: "الرجوع لأعلى",
    waMsg: "السلام عليكم، عايز أستفسر عن دواء",
  },
  en: {
    brand: "Dr. Ahmed Tarek Salim Pharmacy",
    brandShort: "Dr. Ahmed Tarek Pharmacy",
    nav: { home: "Home", about: "About", services: "Services", location: "Location & Hours", gallery: "Gallery", contact: "Contact" },
    cta: { whatsapp: "Chat on WhatsApp", call: "Call us", order: "Order your medicine", directions: "Open in Google Maps", more: "Learn more", allServices: "All services" },
    hero: {
      badge: "Your pharmacy in Mit al-Rakha",
      title: "Trusted pharmacy care",
      titleAccent: "in Mit al-Rakha",
      text: "Right in the town center, next to Sheikh Ismail Mosque. Genuine medicines, honest advice, and the warmth of a neighborhood pharmacist.",
      stat1: "Close by", stat1d: "Town center",
      stat2: "Advice", stat2d: "From a pharmacist",
      stat3: "WhatsApp", stat3d: "Order easily",
    },
    servicesTitle: "Our services", servicesSub: "Everything you need for your family's health, in one place.",
    services: [
      { k: "meds", t: "Medicines", d: "Genuine medicines at official prices, with help finding suitable alternatives." },
      { k: "beauty", t: "Beauty & cosmetics", d: "Skin and hair care from trusted brands." },
      { k: "baby", t: "Mother & baby care", d: "Infant formula, diapers and mother care essentials." },
      { k: "chronic", t: "Chronic medication", d: "Monthly follow-up for blood pressure, diabetes and heart medicines." },
      { k: "delivery", t: "Home delivery", d: "Send your prescription on WhatsApp and we deliver within the area." },
      { k: "consult", t: "Pharmacist advice", d: "Ask about doses or drug interactions in plain words." },
    ],
    aboutTitle: "A pharmacist from the neighborhood", aboutText:
      "Dr. Ahmed Tarek Salim Pharmacy is a community pharmacy in the heart of Mit al-Rakha. Our goal is simple: everyone leaves reassured, understanding their medicine, and knowing someone is always there to ask.",
    hoursTitle: "Working hours", hoursNote: "Hours may change on holidays and special occasions.",
    locationTitle: "Find us", address: "Mit al-Rakha, Zefta, Gharbia, Egypt – Town center, next to Sheikh Ismail Mosque",
    orderTitle: "Need medicine? Send us your prescription",
    orderText: "Snap a photo of your prescription and send it on WhatsApp — we'll reply with availability and price quickly.",
    about: {
      title: "About us", sub: "A pharmacy built on trust.",
      storyTitle: "Our story",
      story1: "Dr. Ahmed Tarek Salim started the pharmacy to give the people of Mit al-Rakha respectful, close-to-home pharmacy care — no need to travel to Zefta or Tanta for a medicine or a question.",
      story2: "We believe a pharmacist doesn't just sell medicine; they're the first person you ask, who explains how to take your treatment correctly and tells you when you need to see a doctor.",
      valuesTitle: "Our values",
      values: [
        { t: "Trust", d: "Medicines from reliable sources and honest advice." },
        { t: "Accuracy", d: "Every prescription and dose reviewed carefully." },
        { t: "Speed", d: "Quick service without rushing your health." },
        { t: "Care", d: "We treat you like family." },
      ],
      whyTitle: "Why choose us?",
      why: [
        { t: "Local", d: "In the town center, easy to reach." },
        { t: "Personal service", d: "We know our customers and follow up on their treatment." },
        { t: "Reliable", d: "A qualified pharmacist ready to answer your questions." },
      ],
    },
    servicesPage: {
      title: "Our services", sub: "Complete pharmacy services for Mit al-Rakha and Zefta.",
      details: [
        { k: "delivery", t: "Home delivery", d: "Send your order or prescription photo on WhatsApp, and we prepare and deliver it to your door within the area. (Availability and delivery range confirmed when ordering.)" },
        { k: "chronic", t: "Chronic medication management", d: "On monthly treatment for blood pressure, diabetes or heart? We record it, prepare it on time and remind you before it runs out." },
        { k: "baby", t: "Mother & baby care", d: "Infant formula and supplements, feeding and care essentials, and simple tips for new mothers." },
        { k: "beauty", t: "Beauty & personal care", d: "Skin, hair and body care, with help choosing what suits your skin type." },
        { k: "bp", t: "Blood pressure check & advice", d: "Quick in-store blood pressure check and medication advice. (Ask in store about this service.)" },
        { k: "meds", t: "Prescription dispensing", d: "Accurate dispensing with clear explanation of usage, doses and important interactions." },
      ],
    },
    locationPage: {
      title: "Location & hours", sub: "Visit us in the heart of Mit al-Rakha.",
      howTitle: "How to reach us", how: [
        "The pharmacy is in the town center of Mit al-Rakha, Zefta.",
        "Right next to Sheikh Ismail Mosque — anyone in town can point you there.",
        "Lost? Message us on WhatsApp and we'll send the location.",
      ],
    },
    contact: {
      title: "Contact us", sub: "Have a question or need a medicine? We're here.",
      formTitle: "Send a message", name: "Name", phone: "Mobile number", type: "Request type", message: "Your message",
      types: { order: "Medicine order", consult: "Consultation", delivery: "Delivery", other: "Other" },
      send: "Send via WhatsApp", sentNote: "WhatsApp will open with your message ready — just press send.",
      errName: "Enter your name", errPhone: "Enter a valid mobile number", errMsg: "Enter your message",
      direct: "Direct contact", facebook: "Our Facebook page", placeholderNote: "Placeholder number – to be updated",
    },
    gallery: { title: "Gallery", sub: "A quick look inside the pharmacy.", items: ["Inside the pharmacy", "Dr. Ahmed Tarek Salim", "Medicines", "Beauty products", "Baby care", "Blood pressure check", "Delivery", "Storefront"] },
    footer: { links: "Quick links", rights: "All rights reserved.", tagline: "Your trusted pharmacy in Mit al-Rakha." },
    theme: "Toggle theme", lang: "العربية", menu: "Menu", toTop: "Back to top",
    waMsg: "Hello, I'd like to ask about a medicine",
  },
};

export type Dict = (typeof dict)["ar"];

const Ctx = createContext<{ lang: Lang; t: Dict; toggleLang: () => void }>({
  lang: "ar",
  t: dict.ar,
  toggleLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    if (localStorage.getItem("lang") === "en") setLang("en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggleLang = () => {
    const next = lang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", next);
    setLang(next);
  };

  return <Ctx.Provider value={{ lang, t: dict[lang] as Dict, toggleLang }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
