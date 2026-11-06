import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { images } from "@/lib/images";
import { PageHero, Reveal } from "@/components/site/primitives";
import { HoursCard, MapCard } from "@/components/site/InfoBlocks";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "الموقع والمواعيد | صيدلية ميت الرخا – د. أحمد طارق سليم" },
      { name: "description", content: "عنوان صيدلية د. أحمد طارق سليم: ميت الرخا، زفتى، الغربية – بجوار مسجد الشيخ إسماعيل. مواعيد العمل والخريطة." },
      { property: "og:title", content: "موقع ومواعيد صيدلية د. أحمد طارق سليم" },
      { property: "og:description", content: "وسط بلد ميت الرخا، بجوار مسجد الشيخ إسماعيل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LocationPage,
});

function LocationPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t.locationPage.title} sub={t.locationPage.sub} image={images.storefront} />
      <section className="container-page py-20">
        <Reveal><MapCard tall /></Reveal>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal><HoursCard /></Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border bg-card p-7 shadow-soft">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground"><Navigation className="h-6 w-6" /></span>
                <h2 className="text-xl font-bold text-foreground">{t.locationPage.howTitle}</h2>
              </div>
              <ol className="space-y-4">
                {t.locationPage.how.map((h, i) => (
                  <li key={h} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-primary">{i + 1}</span>
                    <span className="text-muted-foreground">{h}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
