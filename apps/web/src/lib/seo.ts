import type { Metadata } from "next";

export const SEO = {
  siteName: "QueenCity Soundboard",
  baseUrl: "https://queencitysoundboard.com",
  ogImage: "/og-image.png?v=2",
  defaultTitle: "QueenCity Soundboard",
  defaultDescription: "Live events, tickets, merch, and culture-forward nights in Cincinnati and Covington.",
  defaultKeywords: [
    "Cincinnati events",
    "Covington KY events",
    "Latin music concerts",
    "acoustic concerts",
    "Madison Theater events",
    "QueenCity Soundboard",
  ],
  venue: {
    name: "Madison Theater",
    streetAddress: "730 Madison Ave",
    city: "Covington",
    region: "KY",
    postalCode: "41011",
    country: "US",
  },
  contactEmail: "event@queencitysoundboard.com",
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
