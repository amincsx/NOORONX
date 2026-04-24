"use client";

const siteUrl = "https://nooronx.com";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "NOORONX",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description:
      "NOORONX provides solar consulting, design, installation, and commercial clean-energy solutions for residential and business projects.",
    email: "Nooronxco@gmail.com",
    telephone: "+98-21-88306001",
    foundingDate: "2023",
    areaServed: ["IR"],
    sameAs: [
      "https://instagram.com/nooronx",
      "https://linkedin.com/company/nooronx",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}#local-business`,
    name: "NOORONX",
    url: siteUrl,
    image: `${siteUrl}/og-image.jpg`,
    telephone: "+98-21-88306001",
    email: "Nooronxco@gmail.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IR",
      addressLocality: "Tehran",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Thursday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: "NOORONX",
    url: siteUrl,
    inLanguage: ["fa-IR", "en-US"],
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NOORONX core services",
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        serviceType: "Solar energy consultation",
        provider: { "@id": `${siteUrl}#organization` },
        areaServed: "Iran",
        url: `${siteUrl}/services/consultation`,
      },
      {
        "@type": "Service",
        position: 2,
        serviceType: "Solar system installation",
        provider: { "@id": `${siteUrl}#organization` },
        areaServed: "Iran",
        url: `${siteUrl}/services/installation`,
      },
      {
        "@type": "Service",
        position: 3,
        serviceType: "Solar system design",
        provider: { "@id": `${siteUrl}#organization` },
        areaServed: "Iran",
        url: `${siteUrl}/design`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What do you need to estimate a solar project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Energy usage, project location, investment goal, and budget range are enough to start a qualified estimate.",
        },
      },
      {
        "@type": "Question",
        name: "Can customers request consultation before buying products?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. NOORONX offers consultation before purchase so customers can understand cost, sizing, and project fit.",
        },
      },
      {
        "@type": "Question",
        name: "Which pages should users visit to compare products and services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Users can start with the catalog for products, the design page for planning, and the contact page for direct sales support.",
        },
      },
    ],
  };

  const schemas = [
    organizationSchema,
    localBusinessSchema,
    websiteSchema,
    servicesSchema,
    faqSchema,
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
