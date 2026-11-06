import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { images } from "@/lib/images";
import { PageHero, Reveal } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "معرض الصور | صيدلية د. أحمد طارق سليم" },
      { name: "description", content: "صور من داخل صيدلية د. أحمد طارق سليم في ميت الرخا: الأدوية، التجميل، رعاية الطفل والمزيد." },
      { property: "og:title", content: "معرض صور صيدلية د. أحمد طارق سليم" },
      { property: "og:description", content: "جولة سريعة داخل الصيدلية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

const list = [images.hero, images.pharmacist, images.medicines, images.beauty, images.baby, images.bp, images.delivery, images.storefront];
const spans = ["sm:col-span-2 sm:row-span-2", "sm:row-span-2", "", "", "sm:col-span-2", "", "", "sm:col-span-2 lg:col-span-4"];

function Gallery() {
  const { t } = useI18n();
  const [active, setActive] = useState<number | null>(null);
  return (
    <>
      <PageHero title={t.gallery.title} sub={t.gallery.sub} image={images.hero} />
      <section className="container-page section-py">
        <div className="grid grid-flow-dense auto-rows-[14rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((src, i) => (
            <Reveal key={src} delay={(i % 4) * 0.06} className={cn("h-full", spans[i])}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative h-full w-full overflow-hidden rounded-3xl border border-border/40 shadow-soft transition-all duration-300 hover:shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={src}
                  alt={t.gallery.items[i]}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-foreground/80 to-transparent p-4 text-start font-medium text-background transition-transform duration-300 group-hover:translate-y-0">
                  {t.gallery.items[i]}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={t.gallery.items[active]}
            className="fixed inset-0 z-[60] grid place-items-center bg-foreground/80 p-4 backdrop-blur-sm"
          >
            <button
              type="button"
              aria-label="close"
              className="absolute top-4 end-4 grid h-11 w-11 place-items-center rounded-full bg-card text-foreground shadow-soft transition-transform hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.figure
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={list[active]} alt={t.gallery.items[active]} className="max-h-[80dvh] w-auto rounded-2xl shadow-elegant" />
              <figcaption className="mt-3 text-center font-medium text-background">{t.gallery.items[active]}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
