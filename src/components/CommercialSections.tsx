"use client";

import Link from "next/link";

type Language = "fa" | "en";

type CommercialSectionsProps = {
  lang: Language;
};

type CommercialContent = {
  badge?: string;
  title?: string;
  description?: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  stats: { value: string; label: string }[];
  offersTitle: string;
  offers: { title: string; description: string; href: string; cta: string }[];
  processTitle: string;
  process: { step: string; title: string; description: string }[];
  seoTitle: string;
  seoPoints: string[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  faqLinks: { href: string; label: string }[];
};

const content: Record<Language, CommercialContent> = {
  fa: {
    primaryCta: { href: "/contact", label: "دریافت مشاوره رایگان" },
    secondaryCta: { href: "/catalog", label: "مشاهده محصولات" },
    stats: [
      { value: "48h", label: "زمان پاسخ اولیه" },
      { value: "3", label: "مسیر خدمات اصلی" },
      { value: "24/7", label: "مسیر ثبت درخواست" },
      { value: "SEO", label: "ساختار محتوای جدید" },
    ],
    offersTitle: "خدماتی که سریع تصمیم خرید را آسان تر می کنند",
    offers: [
      {
        title: "مشاوره و امکان سنجی",
        description:
          "ارزیابی اولیه پروژه، بررسی مصرف، پیشنهاد ظرفیت مناسب و مسیر اقتصادی برای شروع.",
        href: "/services/consultation",
        cta: "مشاهده سرویس",
      },
      {
        title: "طراحی و تامین تجهیزات",
        description:
          "چیدمان فنی، انتخاب پنل و تجهیزات، و ارائه راهکار متناسب با بودجه و هدف پروژه.",
        href: "/design",
        cta: "بررسی طراحی",
      },
      {
        title: "نصب، راه اندازی و نگهداری",
        description:
          "از اجرا تا پشتیبانی پس از تحویل، همه چیز در یک مسیر روشن و قابل پیگیری.",
        href: "/services/installation",
        cta: "شروع همکاری",
      },
    ],
    processTitle: "مسیر همکاری",
    process: [
      {
        step: "1",
        title: "ثبت درخواست",
        description: "فرم تماس یا تماس مستقیم برای جمع آوری اطلاعات اولیه پروژه.",
      },
      {
        step: "2",
        title: "بررسی فنی و مالی",
        description: "تحلیل نیاز، بودجه و ظرفیت مناسب برای رسیدن به بهترین بازده.",
      },
      {
        step: "3",
        title: "پیشنهاد و اجرا",
        description: "ارائه پیشنهاد شفاف، زمان بندی اجرا و شروع عملیات نصب یا تامین.",
      },
    ],
    seoTitle: "چرا این صفحه برای فروش و سئو بهتر است",
    seoPoints: [
      "هدینگ های مشخص برای سرویس ها، سوالات متداول و مسیر همکاری",
      "لینک داخلی مستقیم به صفحات پول ساز مثل تماس، طراحی و نصب",
      "کپی تجاری تر با تمرکز روی اعتماد، سرعت پاسخ و تصمیم خرید",
    ],
    faqTitle: "سوالات متداول مشتریان",
    faqs: [
      {
        question: "برای شروع پروژه خورشیدی چه اطلاعاتی لازم است؟",
        answer:
          "مقدار مصرف برق، موقعیت پروژه، هدف سرمایه گذاری و بازه بودجه بهترین نقطه شروع برای پیشنهاد دقیق هستند.",
      },
      {
        question: "آیا قبل از خرید می توان مشاوره گرفت؟",
        answer:
          "بله، مسیر تماس و مشاوره برای همین طراحی شده تا قبل از تصمیم نهایی، دید روشنی از هزینه و بازده داشته باشید.",
      },
      {
        question: "اگر فقط بخواهم محصولات را مقایسه کنم از کجا شروع کنم؟",
        answer:
          "بهترین نقطه شروع صفحه کاتالوگ است تا محصولات، دسته بندی ها و مسیر انتخاب سریع تر دیده شوند.",
      },
    ],
    faqLinks: [
      { href: "/contact", label: "تماس با تیم فروش" },
      { href: "/faq", label: "مشاهده سوالات بیشتر" },
      { href: "/education", label: "مطالعه آموزش ها" },
    ],
  },
  en: {
    badge: "Commercial Frontend v0.2.0",
    title: "Built to convert visitors into qualified solar leads",
    description:
      "The new NOORONX homepage now puts trust, service clarity, buying momentum, and search-friendly structure at the center of the experience.",
    primaryCta: { href: "/en/contact", label: "Get Free Consultation" },
    secondaryCta: { href: "/en/catalog", label: "Browse Products" },
    stats: [
      { value: "48h", label: "first response goal" },
      { value: "3", label: "core service tracks" },
      { value: "24/7", label: "lead capture path" },
      { value: "SEO", label: "content-led structure" },
    ],
    offersTitle: "Commercial blocks that support purchase decisions",
    offers: [
      {
        title: "Consulting and feasibility",
        description:
          "Early project review, energy-demand mapping, sizing guidance, and a realistic commercial path.",
        href: "/en/services/consultation",
        cta: "View Service",
      },
      {
        title: "System design and sourcing",
        description:
          "Technical planning, product selection, and proposal-ready system architecture aligned with budget.",
        href: "/en/design",
        cta: "Explore Design",
      },
      {
        title: "Installation and aftercare",
        description:
          "From deployment to post-installation support, the delivery path is clear and easy to trust.",
        href: "/en/services/installation",
        cta: "Start Project",
      },
    ],
    processTitle: "How we work",
    process: [
      {
        step: "1",
        title: "Send project details",
        description: "We collect the first commercial and technical signals through contact or inquiry.",
      },
      {
        step: "2",
        title: "Review technical fit",
        description: "We evaluate demand, constraints, and budget to shape a smart recommendation.",
      },
      {
        step: "3",
        title: "Approve and launch",
        description: "You receive a clearer proposal, timeline, and next step toward delivery.",
      },
    ],
    seoTitle: "Why this structure performs better",
    seoPoints: [
      "Stronger intent-focused headings for services, process, and FAQs",
      "More internal links to commercial pages such as contact, design, and installation",
      "Homepage copy that supports trust, qualification, and purchase momentum",
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "What do you need to estimate a solar project?",
        answer:
          "Your energy usage, project location, investment goal, and budget range are enough to start with a useful recommendation.",
      },
      {
        question: "Can I get expert advice before buying equipment?",
        answer:
          "Yes. The consultation path is meant to help you understand cost, sizing, and return potential before committing.",
      },
      {
        question: "Where should I start if I only want to compare products?",
        answer:
          "Start from the catalog so you can compare product types, categories, and fit before contacting sales.",
      },
    ],
    faqLinks: [
      { href: "/en/contact", label: "Talk to Sales" },
      { href: "/faq", label: "More FAQs" },
      { href: "/en/education", label: "Read Education" },
    ],
  },
};

export default function CommercialSections({ lang }: CommercialSectionsProps) {
  const t = content[lang];

  return (
    <section className="relative z-20 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="commercial-shell rounded-[2rem] p-6 sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-6">
              {t.badge && <div className="commercial-badge">{t.badge}</div>}
              {(t.title || t.description) && (
                <div className="space-y-4">
                  {t.title && (
                    <h2 className="commercial-title text-3xl sm:text-4xl lg:text-6xl">
                      {t.title}
                    </h2>
                  )}
                  {t.description && (
                    <p className="max-w-3xl text-base leading-8 text-white/78 sm:text-lg">
                      {t.description}
                    </p>
                  )}
                </div>
              )}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={t.primaryCta.href} className="btn-primary text-center text-base sm:text-lg">
                  {t.primaryCta.label}
                </Link>
                <Link href={t.secondaryCta.href} className="commercial-secondary text-center text-base sm:text-lg">
                  {t.secondaryCta.label}
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {t.stats.map((item: { value: string; label: string }) => (
                <div key={item.label} className="commercial-stat rounded-3xl p-5">
                  <div className="text-2xl font-bold text-white sm:text-3xl">{item.value}</div>
                  <div className="mt-2 text-sm leading-6 text-white/68">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {t.offers.map((offer: { title: string; description: string; href: string; cta: string }) => (
              <article key={offer.title} className="commercial-card rounded-[1.75rem] p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-amber-200/80">Offer</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{offer.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{offer.description}</p>
                <Link href={offer.href} className="commercial-link mt-6 inline-flex">
                  {offer.cta}
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="commercial-panel rounded-[1.75rem] p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-white">{t.processTitle}</h3>
              <div className="mt-6 space-y-5">
                {t.process.map((item: { step: string; title: string; description: string }) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="commercial-step">{item.step}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                      <p className="mt-1 text-sm leading-7 text-white/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="commercial-panel rounded-[1.75rem] p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-white">{t.seoTitle}</h3>
              <div className="mt-6 space-y-3">
                {t.seoPoints.map((point: string) => (
                  <div key={point} className="commercial-list-item">
                    {point}
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-amber-200/75">SEO + CRO</p>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  {lang === "fa"
                    ? "این بخش ها هم برای کاربر خواناتر هستند و هم به گوگل کمک می کنند موضوع صفحه، خدمات اصلی و مسیر تبدیل را بهتر درک کند."
                    : "These blocks help users scan faster while also giving search engines a clearer understanding of services, intent, and conversion paths."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-[1.75rem] border border-white/10 bg-black/20 p-6 sm:p-8">
            <h3 className="text-2xl font-semibold text-white">{t.faqTitle}</h3>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {t.faqs.map((faq: { question: string; answer: string }) => (
                <article key={faq.question} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <h4 className="text-lg font-semibold text-white">{faq.question}</h4>
                  <p className="mt-3 text-sm leading-7 text-white/70">{faq.answer}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {t.faqLinks.map((link: { href: string; label: string }) => (
                <Link key={link.href + link.label} href={link.href} className="commercial-chip">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
