import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { images, serviceImage } from "@/lib/images";
import { IconBadge, PageHero, Reveal, serviceIcons } from "@/components/site/primitives";
import { OrderCta } from "@/components/site/InfoBlocks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "خدماتنا | صيدلية د. أحمد طارق سليم – زفتى" },
      { name: "description", content: "توصيل للمنازل، إدارة الأدوية المزمنة، رعاية الأم والطفل، التجميل، وقياس الضغط في صيدلية ميت الرخا." },
      { property: "og:title", content: "خدمات صيدلية د. أحمد طارق سليم" },
      { property: "og:description", content: "خدمات صيدلانية متكاملة لأهل ميت الرخا وزفتى." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t.servicesPage.title} sub={t.servicesPage.sub} image={images.medicines} />
      <section className="container-page space-y-16 py-20 md:space-y-24">
        {t.servicesPage.details.map((s, i) => (
          <div key={s.k} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <Reveal className={cn(i % 2 === 1 && "md:order-2")}>
              <div className="group overflow-hidden rounded-[2rem] shadow-elegant">
                <img src={serviceImage[s.k]} alt={s.t} loading="lazy" width={1200} height={912}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="group">
              <IconBadge icon={serviceIcons[s.k]} />
              <h2 className="mt-5 text-2xl font-bold text-foreground md:text-3xl">{s.t}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{s.d}</p>
            </Reveal>
          </div>
        ))}
      </section>
      <OrderCta />
    </>
  );
}
