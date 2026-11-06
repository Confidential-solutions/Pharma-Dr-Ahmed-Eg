import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageCircleHeart,
  Phone,
  Stethoscope,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { images } from "@/lib/images";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import {
  Card,
  IconBadge,
  Reveal,
  SectionHeading,
  serviceIcons,
} from "@/components/site/primitives";
import { HoursCard, MapCard, OrderCta } from "@/components/site/InfoBlocks";
import { WhatsAppIcon } from "@/components/site/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "صيدلية د. أحمد طارق سليم | صيدلية ميت الرخا – زفتى" },
      {
        name: "description",
        content:
          "صيدلية ميت الرخا وزفتى: أدوية أصلية، استشارة صيدلانية، أدوية مزمنة، رعاية الأم والطفل، وتوصيل. بجوار مسجد الشيخ إسماعيل.",
      },
      {
        name: "keywords",
        content: "صيدلية ميت الرخا, صيدلية زفتى, دكتور أحمد طارق سليم, صيدلية الغربية",
      },
      { property: "og:title", content: "صيدلية د. أحمد طارق سليم – ميت الرخا" },
      {
        property: "og:description",
        content: "خدمة صيدلانية متميزة في ميت الرخا، بجوار مسجد الشيخ إسماعيل.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useI18n();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const stats = [
    { icon: MapPin, a: t.hero.stat1, b: t.hero.stat1d },
    { icon: Stethoscope, a: t.hero.stat2, b: t.hero.stat2d },
    { icon: MessageCircleHeart, a: t.hero.stat3, b: t.hero.stat3d },
  ];

  return (
    <>
      {/* Hero — full-bleed background image */}
      <section className="relative min-h-[85vh] overflow-hidden flex items-center">
        {/* Background image */}
        <img
          src={images.hero}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient overlay — dark at bottom for readability, lighter at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        {/* Coloured ambient glow on top of overlay */}
        <div className="absolute inset-0 bg-hero opacity-70" />

        {/* Content */}
        <div className="container-page relative z-10 py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-pill"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-whatsapp" />
              {t.hero.badge}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {t.hero.title} <span className="text-gradient">{t.hero.titleAccent}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
            >
              {t.hero.text}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <Button
                asChild
                variant="whatsapp"
                size="xl"
                className="rounded-full shadow-soft hover:shadow-elegant"
              >
                <a href={whatsappLink(t.waMsg)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.cta.whatsapp}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="rounded-full shadow-soft backdrop-blur-sm"
              >
                <a href={siteConfig.phoneHref}>
                  <Phone className="h-4 w-4" />
                  {t.cta.call}
                </a>
              </Button>
            </motion.div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.a}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="card-surface p-3 text-center sm:p-4 backdrop-blur-sm"
                >
                  <s.icon className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-2 text-sm font-bold text-foreground">{s.a}</p>
                  <p className="text-xs text-muted-foreground">{s.b}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass absolute bottom-6 start-6 flex items-center gap-3 rounded-2xl border p-4 shadow-elegant z-10"
        >
          <CheckCircle2 className="h-8 w-8 shrink-0 text-primary" />
          <div>
            <p className="font-bold text-foreground">{t.brandShort}</p>
            <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section className="container-page section-py">
        <SectionHeading title={t.servicesTitle} sub={t.servicesSub} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.06}>
              <Card className="h-full">
                <IconBadge icon={serviceIcons[s.k]} />
                <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.d}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button
            asChild
            variant="soft"
            size="lg"
            className="rounded-full shadow-soft hover:shadow-elegant"
          >
            <Link to="/services">
              {t.cta.allServices}
              <Arrow className="ms-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About preview */}
      <section className="border-t bg-secondary/40 section-py">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative mx-auto w-full max-w-md">
            <img
              src={images.pharmacist}
              alt={t.gallery.items[1]}
              loading="lazy"
              width={1200}
              height={1408}
              className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-elegant"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="mb-4 block h-1 w-12 rounded-full bg-gradient-primary" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t.aboutTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.aboutText}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.about.values.map((v) => (
                <li key={v.t} className="flex items-center gap-2 font-medium text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  {v.t}
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" size="lg" className="mt-8 rounded-full">
              <Link to="/about">
                {t.cta.more}
                <Arrow className="ms-1 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Hours + Map */}
      <section className="container-page section-py">
        <SectionHeading title={t.locationTitle} sub={t.address} />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <HoursCard />
          </Reveal>
          <Reveal delay={0.1}>
            <MapCard />
          </Reveal>
        </div>
      </section>

      <OrderCta />
    </>
  );
}
