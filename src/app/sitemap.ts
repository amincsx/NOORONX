import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db";
import News from "@/models/News";
import { dataStore } from "@/lib/dataStore";

const SITE_URL = "https://nooronx.com";

const staticPages = [
  "",
  "/about",
  "/contact",
  "/calculator",
  "/catalog",
  "/design",
  "/education",
  "/news",
  "/faq",
  "/privacy",
  "/terms",
  "/warranty",
  "/support",
  "/team",
  "/services/consultation",
  "/services/inspection",
  "/services/installation",
  "/services/maintenance",
  "/en",
  "/en/about",
  "/en/contact",
  "/en/catalog",
  "/en/design",
  "/en/education",
  "/en/news",
  "/en/team",
  "/en/services/consultation",
  "/en/services/installation",
];

function buildStaticEntries(): MetadataRoute.Sitemap {
  return staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/en" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/en" ? 0.9 : 0.7,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [...buildStaticEntries()];

  try {
    await connectToDatabase();

    const publishedNews = await News.find({ published: true }).lean();
    entries.push(
      ...publishedNews.flatMap((newsItem) => [
        {
          url: `${SITE_URL}/news/${newsItem._id}`,
          lastModified: new Date(newsItem.updatedAt || newsItem.createdAt),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        },
        {
          url: `${SITE_URL}/en/news/${newsItem._id}`,
          lastModified: new Date(newsItem.updatedAt || newsItem.createdAt),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        },
      ]),
    );

    const Education = (await import("@/models/Education")).default;
    const publishedEducation = await Education.find({ published: true }).lean();
    entries.push(
      ...publishedEducation.flatMap((eduItem: any) => [
        {
          url: `${SITE_URL}/education/${eduItem._id}`,
          lastModified: new Date(eduItem.updatedAt || eduItem.createdAt),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
        {
          url: `${SITE_URL}/en/education/${eduItem._id}`,
          lastModified: new Date(eduItem.updatedAt || eduItem.createdAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        },
      ]),
    );

    const Product = (await import("@/models/Product")).default;
    const products = await Product.find({}).lean();
    entries.push(
      ...products.flatMap((product: any) => [
        {
          url: `${SITE_URL}/products/${product._id}`,
          lastModified: new Date(product.updatedAt || product.createdAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        },
        {
          url: `${SITE_URL}/en/products/${product._id}`,
          lastModified: new Date(product.updatedAt || product.createdAt),
          changeFrequency: "monthly" as const,
          priority: 0.5,
        },
      ]),
    );
  } catch {
    const fallbackNews = dataStore.getNews().filter((item) => item.published);
    entries.push(
      ...fallbackNews.flatMap((item) => [
        {
          url: `${SITE_URL}/news/${item.id}`,
          lastModified: new Date(item.updatedAt),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        },
        {
          url: `${SITE_URL}/en/news/${item.id}`,
          lastModified: new Date(item.updatedAt),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        },
      ]),
    );

    const fallbackEducation = dataStore.getEducation().filter((item) => item.published);
    entries.push(
      ...fallbackEducation.flatMap((item) => [
        {
          url: `${SITE_URL}/education/${item.id}`,
          lastModified: new Date(item.updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
        {
          url: `${SITE_URL}/en/education/${item.id}`,
          lastModified: new Date(item.updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        },
      ]),
    );

    const fallbackProducts = dataStore.getProducts();
    entries.push(
      ...fallbackProducts.flatMap((item) => [
        {
          url: `${SITE_URL}/products/${item.id}`,
          lastModified: new Date(item.updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        },
        {
          url: `${SITE_URL}/en/products/${item.id}`,
          lastModified: new Date(item.updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.5,
        },
      ]),
    );
  }

  return entries;
}
