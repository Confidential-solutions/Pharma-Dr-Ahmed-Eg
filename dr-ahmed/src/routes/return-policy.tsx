import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  PackageCheck,
  ThermometerSnowflake,
  Sparkles,
  PhoneCall,
  Clock,
  HelpCircle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Card, IconBadge, Reveal, SectionHeading } from "@/components/site/primitives";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/return-policy")({
  head: () => ({
    meta: [
      { title: "سياسة الاسترجاع والاستبدال | صيدلية د. أحمد طارق سليم" },
      {
        name: "description",
        content:
          "سياسة استرجاع واستبدال الأدوية والمستلزمات الطبية ومستحضرات التجميل وفقاً لمعايير وزارة الصحة المصرية ونقابة الصيادلة.",
      },
      { property: "og:title", content: "سياسة الاسترجاع والاستبدال – صيدلية د. أحمد طارق سليم" },
      {
        property: "og:description",
        content: "تعرف على شروط استرجاع واستبدال المنتجات لحماية صحة المرضى وسلامة الدواء.",
      },
    ],
  }),
  component: ReturnPolicyPage,
});

function ReturnPolicyPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container-page text-center">
          <Reveal>
            <span className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" />
              {isAr ? "معايير وزارة الصحة المصرية" : "Egyptian Ministry of Health Standards"}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {isAr ? "سياسة الاسترجاع والاستبدال" : "Return & Exchange Policy"}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {isAr
                ? "حرصاً منا على صحة وسلامة عملائنا الكرام، نلتزم بالضوابط الصحية والقانونية المنظمة لتداول الأدوية والمستحضرات الطبية."
                : "To safeguard patient health and ensure the integrity of pharmaceutical products, our policies strictly comply with medical storage regulations."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-10">
          {/* Important Regulatory Notice */}
          <Reveal>
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-destructive text-destructive-foreground shadow-soft">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-destructive">
                    {isAr ? "ضوابط استرجاع الأدوية (هام جداً)" : "Medication Return Regulation (Important)"}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80 sm:text-base">
                    {isAr
                      ? "وفقاً للمادة 79 من قانون مزاولة مهنة الصيدلة المصري رقم 127 لسنة 1955 وقرارات وزارة الصحة، يمنع منعاً باتاً استرجاع أو استبدال أي دواء بعد خروجه من الصيدلية، وذلك لضمان عدم تأثر الدواء بسوء التخزين، أو درجات الحرارة والرطوبة، وحمايةً للمريض التالي من أي دواء فاقد لفاعليته."
                      : "Under Egyptian Pharmacy Law No. 127 of 1955 and Ministry of Health directives, medicinal drugs cannot be returned or exchanged once they leave the pharmacy. This guarantees medications have not been exposed to adverse humidity or storage conditions."}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Categories Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Cold Chain / Fridge Meds */}
            <Reveal delay={0.05}>
              <Card className="h-full space-y-3 p-6">
                <IconBadge icon={ThermometerSnowflake} />
                <h3 className="text-lg font-bold text-foreground">
                  {isAr ? "أدوية الثلاجة والأمصال" : "Refrigerated Medications & Vaccines"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAr
                    ? "أدوية الثلاجة (الإنسولين، الأمصال، قطرات العين، وغيرها) غير قابلة للإرجاع أو الاستبدال نهائياً بمجرد استلامها، للحفاظ على سلسلة التبريد المعتمدة (2 إلى 8 درجات مئوية)."
                    : "Cold chain medications (Insulin, serums, specialty eye drops) cannot be returned under any circumstances to preserve required 2°C–8°C storage."}
                </p>
              </Card>
            </Reveal>

            {/* Medical Devices */}
            <Reveal delay={0.1}>
              <Card className="h-full space-y-3 p-6">
                <IconBadge icon={PackageCheck} />
                <h3 className="text-lg font-bold text-foreground">
                  {isAr ? "الأجهزة والمستلزمات الطبية" : "Medical Devices & Equipment"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAr
                    ? "أجهزة قياس الضغط والسكر والحرارة قابلة للاستبدال أو الصيانة خلال 14 يوماً من الشراء بشرط وجود الفاتورة، وأن يكون الجهاز في عبوته الأصلية بجميع ملحقاته، وفي حالة وجود عيب صناعة."
                    : "Blood pressure monitors, glucometers, and thermometers can be exchanged within 14 days if defective, accompanied by the purchase receipt and in their original packaging."}
                </p>
              </Card>
            </Reveal>

            {/* Cosmetics & Skin Care */}
            <Reveal delay={0.15}>
              <Card className="h-full space-y-3 p-6">
                <IconBadge icon={Sparkles} />
                <h3 className="text-lg font-bold text-foreground">
                  {isAr ? "مستحضرات التجميل والعناية" : "Cosmetics & Personal Care"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAr
                    ? "يمكن استرجاع أو استبدال مستحضرات التجميل والعناية الشخصية خلال 14 يوماً فقط إذا كانت العبوة بتغليف المصنع الأصلي المحكم (غلاف السوليفان سليم تماماً) ولم يتم فتحها أو استخدامها."
                    : "Cosmetics and skin care items can be returned within 14 days only if they are sealed in their original unopened manufacturer wrapping."}
                </p>
              </Card>
            </Reveal>

            {/* Wrong Orders or Delivery Issues */}
            <Reveal delay={0.2}>
              <Card className="h-full space-y-3 p-6">
                <IconBadge icon={RotateCcw} />
                <h3 className="text-lg font-bold text-foreground">
                  {isAr ? "أخطاء التوصيل أو الاستلام" : "Delivery Discrepancies"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAr
                    ? "في حال استلام منتج مختلف عن المطلوب في الروشتة أو وجود تلف ظاهر في عبوة التوصيل، يرجى إبلاغ مندوب التوصيل فوراً عند الاستلام أو التواصل مع الصيدلية في خلال 6 ساعات لاستبداله مجاناً."
                    : "If an item does not match your prescription or arrives damaged, please notify the delivery courier immediately or contact us within 6 hours for immediate free replacement."}
                </p>
              </Card>
            </Reveal>
          </div>

          {/* Steps to Request Exchange */}
          <Reveal delay={0.25}>
            <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-4">
              <h3 className="text-xl font-bold text-foreground">
                {isAr ? "خطوات استبدال منتج مؤهل" : "How to Request an Eligible Exchange"}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground sm:text-base leading-relaxed">
                <li>
                  {isAr
                    ? "إحضار أو تصوير فاتورة الشراء الصادرة من صيدلية د. أحمد طارق سليم."
                    : "Have your receipt or purchase confirmation from Dr. Ahmed Pharmacy ready."}
                </li>
                <li>
                  {isAr
                    ? "التأكد من أن المنتج بحالته الأصلية وغلاف المصنع المغلق."
                    : "Ensure the item remains unopened in its original manufacturer packaging."}
                </li>
                <li>
                  {isAr
                    ? "زيارة الصيدلية في ميت الرخا – زفتى، أو التواصل معنا عبر الواتساب لتنسيق الاستبدال مع مندوب التوصيل."
                    : "Visit the pharmacy in Meet El-Rakha – Zifta, or contact us via WhatsApp to arrange courier pickup."}
                </li>
              </ol>

              <div className="pt-4 flex flex-wrap items-center gap-4 border-t">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
                >
                  <PhoneCall className="h-4 w-4" />
                  {isAr ? "تواصل مع الصيدلي" : "Call Pharmacist"}
                </a>
                <Link
                  to="/help"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent"
                >
                  <HelpCircle className="h-4 w-4 text-primary" />
                  {isAr ? "الأسئلة الشائعة" : "View FAQs"}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

