import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, ShieldAlert, CheckCircle, Stethoscope, AlertTriangle, Scale, Lock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Card, Reveal } from "@/components/site/primitives";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "الشروط والأحكام | صيدلية د. أحمد طارق سليم" },
      {
        name: "description",
        content:
          "الشروط والأحكام المنظمة لخدمات صيدلية د. أحمد طارق سليم وصرف الأدوية والاستشارات والتوصيل المنزلي.",
      },
      { property: "og:title", content: "الشروط والأحكام – صيدلية د. أحمد طارق سليم" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container-page text-center">
          <Reveal>
            <span className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Scale className="h-4 w-4" />
              {isAr ? "الضوابط واللوائح الصيدلانية" : "Legal & Pharmaceutical Terms"}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {isAr
                ? "تحدد هذه الوثيقة الشروط المنظمة لاستخدام موقع وخدمات صيدلية د. أحمد طارق سليم، وقواعد صرف الأدوية وتوصيلها."
                : "These terms govern the use of Dr. Ahmed Tarek Selim Pharmacy website, pharmaceutical services, and delivery."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Medical Disclaimer Banner */}
          <Reveal>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-500 text-white shadow-soft">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-amber-700 dark:text-amber-400">
                    {isAr ? "إخلاء المسؤولية الطبية والاستشارية" : "Medical & Consultation Disclaimer"}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80 sm:text-base">
                    {isAr
                      ? "المعلومات الطبية والاستشارات الصيدلانية المقدمة عبر الموقع أو الواتساب هي إرشادات وتثقيف صيدلاني لمساعدة المريض في معرفة جرعات وتفاعلات دوائه، ولا تعتبر بأي حال من الأحوال بديلاً عن الفحص الطبي أو استشارة الطبيب البشري المعالج. في الحالات الطارئة أو الأعراض الحادة، يجب التوجه فوراً لأقرب مستشفى أو الاتصال بالإسعاف (123)."
                      : "Medical guidance and pharmaceutical advice provided through this site or WhatsApp represent pharmacy educational counseling. They do not replace a full in-person clinical diagnosis by a licensed physician. In emergencies, call 123 or proceed to the nearest hospital."}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Section 1: Dispensing Rules */}
          <Reveal delay={0.05}>
            <Card className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  {isAr ? "1. ضوابط صرف الروشتات والأدوية" : "1. Prescription & Dispensing Regulations"}
                </h3>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground sm:text-base leading-relaxed">
                <li>
                  {isAr
                    ? "نلتزم بالقوانين المصرية المنظمة للصيدلة؛ لا يتم صرف الأدوية الخاضعة لجدول الرقابة أو المواد المؤثرة على الحالة النفسية إلا بروشتة أصلية معتمدة ومستوفية الشروط الطبية."
                    : "Scheduled and controlled medications are strictly dispensed upon presentation of an authentic, stamped medical prescription as mandated by Egyptian law."}
                </li>
                <li>
                  {isAr
                    ? "المضادات الحيوية والأدوية التخصصية تصرف تحت إشراف صيدلي معتمد وفقاً لبروتوكولات الاستخدام الرشيد للدواء."
                    : "Antibiotics and specialized drugs are dispensed under certified pharmacist supervision following rational medicine use protocols."}
                </li>
                <li>
                  {isAr
                    ? "للصيدلي الحق القانوني والأخلاقي في مراجعة الجرعة، أو رفض صرف أي تركيبة يتبين فيها تداخل دوائي خطير حفاظاً على حياة المريض."
                    : "The pharmacist holds the professional obligation to verify dosages and clarify contraindications before dispensing."}
                </li>
              </ul>
            </Card>
          </Reveal>

          {/* Section 2: Home Delivery */}
          <Reveal delay={0.1}>
            <Card className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  {isAr ? "2. خدمة التوصيل للمنازل" : "2. Home Delivery Terms"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
                {isAr
                  ? "تغطي خدمة التوصيل قرية ميت الرخا ومركز زفتى والقرى المجاورة. يتم التوصيل في حقائب معزولة تحمي الأدوية من الحرارة وأشعة الشمس المباشرة. يرجى تزويدنا برقم هاتف وعنوان دقيق لتفادي أي تأخير."
                  : "Home delivery covers Meet El-Rakha, Zifta, and nearby villages using temperature-protective carriers. Please provide accurate addresses and contact phone numbers."}
              </p>
            </Card>
          </Reveal>

          {/* Section 3: Pricing & Availability */}
          <Reveal delay={0.15}>
            <Card className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Scale className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  {isAr ? "3. الأسعار والتسعيرة الجبرية" : "3. Pricing & Official Ministry Tariff"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
                {isAr
                  ? "جميع أسعار الأدوية في الصيدلية تخضع للتسعيرة الجبرية المحددة رسمياً من هيئة الدواء المصرية ووزارة الصحة. الصيدلية لا تفرض أي زيادات أو هوامش ربحية فوق السعر الرسمي المطبوع."
                  : "All pharmaceutical prices strictly comply with official tariffs set by the Egyptian Drug Authority (EDA). We charge no markup over regulated prices."}
              </p>
            </Card>
          </Reveal>

          {/* Section 4: Privacy & Data */}
          <Reveal delay={0.2}>
            <Card className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  {isAr ? "4. خصوصية بيانات المرضى" : "4. Patient Confidentiality"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground sm:text-base leading-relaxed">
                {isAr
                  ? "تلتزم الصيدلية بأعلى معايير السرية التامة لصور الروشتات وتاريخ الأدوية المزمنة للمرضى، ولا يتم مشاركة أي معلومة مع أي طرف خارجي. للمزيد، يُرجى مراجعة "
                  : "We adhere to patient confidentiality standards regarding prescription images and health notes. For details, please see our "}
                <Link to="/privacy" className="font-semibold text-primary underline">
                  {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
                .
              </p>
            </Card>
          </Reveal>

          {/* Quick links to policies */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
            <Link to="/return-policy" className="text-sm font-medium text-primary hover:underline">
              {isAr ? "← الاطلاع على سياسة الاسترجاع والاستبدال" : "← View Return & Exchange Policy"}
            </Link>
            <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {isAr ? "تواصل معنا للاستفسارات القانونية" : "Contact for inquiries"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

