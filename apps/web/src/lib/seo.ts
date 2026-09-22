import type { Metadata } from "next";

export const SEO = {
  siteName: "QueenCity Soundboard",
  legalBusinessName: "QueenCity Soundboard",
  baseUrl: "https://queencitysoundboard.com",
  ogImage: "/og-image.png?v=2",
  defaultTitle: "QueenCity Soundboard",
  defaultDescription: "Cincinnati and Northern Kentucky's discovery hub for the hottest live music, comedy, and cultural events.",
  defaultKeywords: [
    "Cincinnati events",
    "things to do Cincinnati",
    "concerts Cincinnati",
    "Northern Kentucky events",
    "Covington KY events",
    "Latin music Cincinnati",
    "QueenCity Soundboard",
  ],
  serviceAreas: [
    "Cincinnati, Ohio",
    "Covington, Kentucky",
    "Newport, Kentucky",
    "Northern Kentucky",
    "Greater Cincinnati",
  ],
  socialProfiles: [
    "https://www.instagram.com/queencitysoundboard",
    "https://www.tiktok.com/@queencitysoundboard",
    "https://x.com/queencitysound",
  ],
  contactEmail: "event@queencitysoundboard.com",
  contactPhone: "+1-859-491-2444",
};

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const canonical = input.path.startsWith("/") ? input.path : `/${input.path}`;
  const url = `${SEO.baseUrl}${canonical}`;

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords ?? SEO.defaultKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SEO.siteName,
      type: "website",
      images: [
        {
          url: SEO.ogImage,
          width: 1200,
          height: 630,
          alt: SEO.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [SEO.ogImage],
    },
  };
}
