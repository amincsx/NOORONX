"use client";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NOORONX",
    "alternateName": "نورانکس",
    "url": "https://nooronx.liara.run",
    "logo": "https://nooronx.liara.run/images/logo.png",
    "description": "شرکت NOORONX ارائه‌دهنده خدمات نصب و راه‌اندازی پنل‌های خورشیدی، مشاوره انرژی پاک و راه‌حل‌های پایدار",
    "founder": {
      "@type": "Person",
      "name": "Mohammad Reza Zia"
    },
    "foundingDate": "2023",
    "industry": "Solar Energy",
    "numberOfEmployees": "10-50",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IR",
      "addressLocality": "Tehran"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "url": "https://nooronx.com/contact",
      "availableLanguage": ["Persian", "English"]
    },
    "sameAs": [
      "https://instagram.com/nooronx",
      "https://linkedin.com/company/nooronx",
      "https://twitter.com/nooronx"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Solar Energy Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Solar Panel Installation",
            "description": "نصب و راه‌اندازی پنل‌های خورشیدی"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Solar Energy Consultation",
            "description": "مشاوره انرژی خورشیدی و طراحی سیستم"
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NOORONX",
    "alternateName": "نورانکس",
    "url": "https://nooronx.com",
    "description": "شرکت NOORONX ارائه‌دهنده خدمات نصب و راه‌اندازی پنل‌های خورشیدی، مشاوره انرژی پاک و راه‌حل‌های پایدار",
    "inLanguage": ["fa-IR", "en-US"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nooronx.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NOORONX",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nooronx.com/images/logo.png"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "خانه",
        "item": "https://nooronx.com"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "خدمات",
        "item": "https://nooronx.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "آموزش", 
        "item": "https://nooronx.com/education"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "اخبار",
        "item": "https://nooronx.com/news"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}