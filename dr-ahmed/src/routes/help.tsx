import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  HelpCircle,
  Search,
  Truck,
  FileText,
  CreditCard,
  Pill,
  MessageCircle,
  PhoneCall,
  Clock,
  ChevronDown,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Card, Reveal } from "@/components/site/primitives";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "مركز المساعدة والأسئلة الشائعة | صيدلية د. أحمد طارق سليم" },
      {
        name: "description",
        content:
          "إجابات على الأسئلة الشائعة حول طلب الروشتات، ومواعيد ومناطق التوصيل، والأدوية الناقصة، وسياسات الدفع والاسترجاع.",
      },
      { property: "og:title", content: "مركز المساعدة – صيدلية د. أحمد طارق سليم" },
    ],
  }),
  component: HelpPage,
});

interface FaqItem {
  qAr: string;
  qEn: string;
  aAr: string;
  aEn: string;
  category: "orders" | "delivery" | "meds" | "payment";
}

const faqs: FaqItem[] = [
  {
    category: "orders",
    qAr: "إزاي أطلب دواء أو أبعت الروشتة للصيدلية؟",
    qEn: "How can I order medication or send my prescription?",
    aAr: "تقدر تبعت الروشتة أو صورة العلبة بكل سهولة من خلال صفحة 'اطلب روشتتك' على الموقع، أو تبعتها مباشرة على الواتساب على رقم 01023043122. الصيدلي هيراجعها فوراً ويتواصل معاك لتأكيد الأسعار وميعاد التوصيل.",
    aEn: "You can submit your prescription photo via our dedicated 'Prescription' page on the website or message it directly via WhatsApp to +20 102 304 3122. Our pharmacist will review it immediately and confirm availability and delivery.",
  },
  {
    category: "delivery",
    qAr: "إيه هي مناطق ومواعيد التوصيل للمنازل؟",
    qEn: "What are the home delivery areas and timings?",
    aAr: "خدمة التوصيل تغطي قرية ميت الرخا بالكامل ومحيطها ومدينة زفتى والقرى المجاورة. التوصيل متاح طوال ساعات عمل الصيدلية (يومياً من 9:00 صباحاً حتى 11:30 مساءً، والجمعة من 1:00 ظهراً). وقت التوصيل داخل ميت الرخا عادة بين 15 و 30 دقيقة فقط.",
    aEn: "We deliver across Meet El-Rakha, Zifta, and adjacent villages throughout pharmacy operating hours (Sat-Thu 9:00 AM - 11:30 PM, Fri 1:00 PM - 11:30 PM). Average delivery within Meet El-Rakha is 15-30 minutes.",
  },
  {
    category: "meds",
    qAr: "لو في دواء ناقص أو مش لاقيه، هل الصيدلية بتوفره؟",
    qEn: "If a chronic medication is scarce or out of stock, can you source it?",
    aAr: "نعم بكل تأكيد. نسعى دائماً لتوفير الأدوية الناقصة أو توفير البدائل الدوائية المطابقة لنفس المادة الفعالة والتركيز بعد مراجعة الصيدلي واستئذان الطبيب المعالج إذا تطلب الأمر. كلمنا وهنبحث لك عنه في شبكة موزعينا المعتمدين.",
    aEn: "Yes! We make special inquiries through certified pharmaceutical distributors to source rare or scarce medications, or suggest bioequivalent generic alternatives with identical active ingredients.",
  },
  {
    category: "payment",
    qAr: "إيه طرق الدفع المتاحة عندي عند الاستلام؟",
    qEn: "What payment methods are accepted?",
    aAr: "متاح الدفع نقداً (كاش) عند الاستلام مع مندوب التوصيل، أو التحويل الفوري عبر فودافون كاش أو إنستاباي (InstaPay)، أو بالبطاقات البنكية داخل مقر الصيدلية.",
    aEn: "We accept Cash on Delivery, mobile wallet transfers (Vodafone Cash), instant bank transfers via InstaPay, and credit/debit cards at the pharmacy.",
  },
  {
    category: "orders",
    qAr: "هل الصيدلية بتقدم خدمات قياس الضغط والسكر؟",
    qEn: "Do you offer in-pharmacy blood pressure and blood glucose checks?",
    aAr: "نعم، نقدم في الصيدلية قياس دقيق لضغط الدم ونسبة السكر العشوائي في الدم وتتبع الأوزان مجاناً أو بأسعار رمزية لخدمة أهالينا في ميت الرخا.",
    aEn: "Yes, we provide accurate digital blood pressure monitoring, random blood glucose testing, and weight tracking as a core community service in Meet El-Rakha.",
  },
  {
    category: "payment",
    qAr: "ما هي سياسة استرجاع أو استبدال الأدوية؟",
    qEn: "What is your medication return and refund policy?",
    aAr: "طبقاً لتعليمات وزارة الصحة المصرية وقانون مهنة الصيدلة، يُمنع استرجاع الأدوية بعد خروجها للحفاظ على سلامة التخزين، بينما الأجهزة والمستلزمات الطبية ومستحضرات التجميل غير المفتوحة قابلة للاستبدال خلال 14 يوماً بفاتورة الشراء.",
    aEn: "Per Egyptian Ministry of Health guidelines, medicinal drugs cannot be returned to guarantee storage integrity. Non-opened cosmetic items and medical devices can be exchanged within 14 days with receipt.",
  },
];

export function HelpPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { id: "all", labelAr: "كل الأسئلة", labelEn: "All Questions" },
    { id: "orders", labelAr: "الطلبات والروشتات", labelEn: "Orders & Prescriptions" },
    { id: "delivery", labelAr: "التوصيل للمنازل", labelEn: "Home Delivery" },
    { id: "meds", labelAr: "الأدوية والبدائل", labelEn: "Medications & Substitutes" },
    { id: "payment", labelAr: "الدفع والسياسات", labelEn: "Payment & Policies" },
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const qText = isAr ? item.qAr : item.qEn;
    const aText = isAr ? item.aAr : item.aEn;
    const matchesQuery =
      !query.trim() ||
      qText.toLowerCase().includes(query.toLowerCase()) ||
      aText.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container-page text-center">
          <Reveal>
            <span className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <HelpCircle className="h-4 w-4" />
              {isAr ? "دعم وخدمة المرضى" : "Patient Support & Guidance"}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {isAr ? "مركز المساعدة والأسئلة الشائعة" : "Help Center & FAQs"}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {isAr
                ? "كل ما تحتاج معرفته عن صرف الأدوية، خدمة التوصيل، طرق الدفع، وضمان جودة الرعاية الصيدلانية."
                : "Everything you need to know about prescription dispensing, home delivery, payment, and health support."}
            </p>

            {/* Search Input */}
            <div className="mx-auto mt-8 max-w-lg">
              <div className="relative">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    isAr ? "ابحث عن سؤالك هنا (مثال: توصيل، روشتة، كاش)..." : "Search help topics (e.g. delivery, prescription)..."
                  }
                  className="w-full rounded-full border border-border bg-card py-3.5 pe-4 ps-12 text-sm shadow-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories & FAQs */}
      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-10 text-center">
                <HelpCircle className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-3 font-semibold text-foreground">
                  {isAr ? "لم نجد نتائج مطابقة لبحثك" : "No matching questions found"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isAr ? "تقدر تتواصل معنا مباشرة وسنجيبك فوراً." : "Reach out to us directly for an immediate answer."}
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <Reveal key={idx} delay={idx * 0.04}>
                    <div className="overflow-hidden rounded-2xl border bg-card transition hover:border-primary/40">
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-start"
                      >
                        <span className="font-bold text-foreground text-base sm:text-lg">
                          {isAr ? faq.qAr : faq.qEn}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                            isOpen && "rotate-180 text-primary"
                          )}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t bg-muted/10 px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {isAr ? faq.aAr : faq.aEn}
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })
            )}
          </div>

          {/* Need Direct Help Banner */}
          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-secondary/30 p-8 text-center space-y-4">
              <Sparkles className="mx-auto h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">
                {isAr ? "ملقتش إجابة على سؤالك؟" : "Didn't find what you need?"}
              </h3>
              <p className="mx-auto max-w-md text-sm text-muted-foreground sm:text-base">
                {isAr
                  ? "فريق صيدلية د. أحمد طارق سليم متواجد دائماً للرد على كل استفساراتك واستشاراتك الطبية."
                  : "Dr. Ahmed Tarek Selim and our team are on standby to answer all your health questions."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={whatsappLink(isAr ? "السلام عليكم، عندي استفسار من مركز المساعدة" : "Hello, I have an inquiry from Help Center")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-whatsapp-foreground shadow-soft transition hover:opacity-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  {isAr ? "تواصل واتساب فوراً" : "WhatsApp Chat"}
                </a>
                <Link
                  to="/prescription"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
                >
                  <FileText className="h-4 w-4" />
                  {isAr ? "صرف روشتة الآن" : "Upload Prescription"}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

