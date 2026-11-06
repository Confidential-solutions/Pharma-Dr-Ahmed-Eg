import { createFileRoute } from "@tanstack/react-router";
import { HandHeart, MapPin, ShieldCheck, Target, Timer, UserCheck, BadgeCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { images } from "@/lib/images";
import { Card, IconBadge, PageHero, Reveal, SectionHeading } from "@/components/site/primitives";
import { OrderCta } from "@/components/site/InfoBlocks";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن | صيدلية د. أحمد طارق سليم – ميت الرخا" },
      { name: "description", content: "تعرّف على صيدلية د. أحمد طارق سليم في ميت الرخا، زفتى: قيمنا في الثقة والدقة والسرعة والاهتمام." },
      { property: "og:title", content: "من نحن – صيدلية د. أحمد طارق سليم" },
      { property: "og:description", content: "حكاية صيدلية مجتمعية اتبنت على الثقة في ميت الرخا." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const valueIcons = [ShieldCheck, Target, Timer, HandHeart];
const whyIcons = [MapPin, UserCheck, BadgeCheck];

function About() {
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t.about.title} sub={t.about.sub} image={images.storefront} />
      <section className="container-page section-py grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="mb-4 block h-1 w-12 rounded-full bg-gradient-primary" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{t.about.storyTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.about.story1}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t.about.story2}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <img
            src={images.pharmacist}
            alt={t.gallery.items[1]}
            loading="lazy"
            width={1200}
            height={1408}
            className="mx-auto aspect-[4/5] w-full max-w-md rounded-[2rem] object-cover shadow-elegant"
          />
        </Reveal>
      </section>
      <section className="border-y bg-secondary/40 section-py">
        <div className="container-page">
          <SectionHeading title={t.about.valuesTitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.07}>
                <Card className="h-full text-center">
                  <IconBadge icon={valueIcons[i]} className="mx-auto" />
                  <h3 className="mt-4 text-xl font-bold text-foreground">{v.t}</h3>
                  <p className="mt-2 text-muted-foreground">{v.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="container-page section-py">
        <SectionHeading title={t.about.whyTitle} />
        <div className="grid gap-5 md:grid-cols-3">
          {t.about.why.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.07}>
              <Card className="flex h-full gap-4">
                <IconBadge icon={whyIcons[i]} />
                <div>
                  <h3 className="text-lg font-bold text-foreground">{w.t}</h3>
                  <p className="mt-1 text-muted-foreground">{w.d}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
      <OrderCta />
    </>
  );
}
