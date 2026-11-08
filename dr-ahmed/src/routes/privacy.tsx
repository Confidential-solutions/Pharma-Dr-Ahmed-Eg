import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Lock, Eye, Database, Cookie, BellRing, PhoneCall } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Card, Reveal } from "@/components/site/primitives";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية وسرية المرضى | صيدلية د. أحمد طارق سليم" },
      {
        name: "description",
        content:
          "سياسة الخصوصية وسرية بيانات المرضى والروشتات الطبية وملفات تعريف الارتباط لدى صيدلية د. أحمد طارق سليم.",
      },
      { property: "og:title", content: "سياسة الخصوصية – صيدلية د. أحمد طارق سليم" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container-page text-center">
          <Reveal>
            <span className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Shield className="h-4 w-4" />
              {isAr ? "حماية وسرية بيانات المرضى" : "Patient Privacy & Data Protection"}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {isAr
                ? "في صيدلية د. أحمد طارق سليم، نعتبر سرية بياناتك الصحية والروشتات أمانة مهنية وقانونية نلتزم بحمايتها بأعلى المعايير."
                : "At Dr. Ahmed Pharmacy, safeguarding your health information, prescriptions, and contact details is an ethical and legal commitment."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Commitment Notice */}
          <Reveal>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">
                    {isAr ? "ميثاق سرية الروشتات الطبية" : "Medical Prescription Confidentiality Pledge"}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80 sm:text-base">
                    {isAr
                      ? "جميع صور الروشتات، والتقارير الطبية، وتاريخ الأدوية المزمنة للمرضى لا يطلع عليها سوى الصيدلي المسؤول لتجهيز الدواء والتأكد من الجرعات ومطابقة التفاعلات. لا نقوم إطلاقاً ببيع أو تأجير أو مشاركة أي بيانات صحية مع أي جهة تسويقية أو تجارية خارجية."
                      : "Prescriptions, clinical reports, and chronic medicine lists are accessed solely by licensed pharmacists to prepare orders and review potential drug interactions. We never sell, lease, or share patient health records with third parties."}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Data Collected */}
          <Reveal delay={0.05}>
            <Card className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Database className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  {isAr ? "البيانات التي نجمعها ولماذا" : "Information We Collect & Why"}
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="rounded-xl border bg-muted/20 p-4">
                  <h4 className="font-semibold text-foreground">
                    {isAr ? "بيانات التواصل والتوصيل" : "Contact & Delivery Data"}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {isAr
                      ? "الاسم، ورقم الهاتف، وعنوان التوصيل (ميت الرخا / زفتى) لتوصيل الطلب وتأكيد مواعيد التسليم."
                      : "Name, phone number, and delivery location to fulfill orders and coordinate courier drops."}
                  </p>
                </div>
                <div className="rounded-xl border bg-muted/20 p-4">
                  <h4 className="font-semibold text-foreground">
                    {isAr ? "البيانات الصيدلانية" : "Pharmaceutical Inquiries"}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {isAr
                      ? "صور الروشتات وملاحظات الحساسية أو بدائل الأدوية لضمان سلامة الصرف وتجنب التداخلات."
                      : "Prescription photos and allergy notes to ensure medication safety and check contraindications."}
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* Cookies & Google Analytics */}
          <Reveal delay={0.1}>
            <Card className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  {isAr ? "ملفات تعريف الارتباط والتحليلات (Cookies & Analytics)" : "Cookies & Web Analytics"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
                {isAr
                  ? "يستخدم هذا الموقع أدوات Google Analytics 4 و Google Tag Manager لجمع إحصاءات تصفح مجهولة المصدر (مثل عدد الزوار، ونوع المتصفح، والصفحات الأكثر زيارة) بهدف تحسين سرعة الموقع وتجربة الاستخدام. لا تحتوي هذه التحليلات على أي معلومات شخصية أو طبية تكشف هوية المريض."
                  : "We use Google Analytics 4 and Google Tag Manager to collect anonymized website usage statistics (page views, browser types) to improve performance. These analytics never contain personal medical details."}
              </p>
            </Card>
          </Reveal>

          {/* Patient Rights */}
          <Reveal delay={0.15}>
            <Card className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  {isAr ? "حقوقك والتحكم في بياناتك" : "Your Rights & Control"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
                {isAr
                  ? "يحق لأي مريض أو عميل طلب حذف أو تعديل أي بيانات سابقة له مسجلة في سجل طلبات الروشتات في أي وقت عبر التواصل المباشر مع الدكتور أحمد طارق سليم."
                  : "You retain the right at any time to request updates or deletion of your registered inquiries or prescription history by contacting Dr. Ahmed."}
              </p>
            </Card>
          </Reveal>

          {/* Contact for Privacy Questions */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
            <Link to="/terms" className="text-sm font-medium text-primary hover:underline">
              {isAr ? "← الشروط والأحكام" : "← Terms & Conditions"}
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {isAr ? `تواصل للاستفسارات: ${siteConfig.email}` : `Inquiries: ${siteConfig.email}`}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

