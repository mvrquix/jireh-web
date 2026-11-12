// The home page content's built-in fallback and its validation. Used by the
// server (app/lib/cms.js) and the browser (the /preview page), so keep it free
// of server-only code.

const localImages = (names) =>
  names.map((name) => ({ url: `/assets/images/${name}`, alt: "" }));

// What the home page showed before it was data-driven. Used when CMS_URL is
// not set or the CMS can't be reached, so the storefront still renders.
export const FALLBACK_HOME_CONTENT = {
  carousel: {
    autoplayMs: 7000,
    slides: localImages(
      Array.from({ length: 7 }, (_, i) => `carousel/${i + 12}.jpg`),
    ),
  },
  banner: {
    logoUrl: "/assets/images/logo/jireh-v2.png",
    ctaText: "Shop The Collection",
    ctaHref: "/shop",
  },
  showcase: [
    { images: localImages(["home-1.jpg", "home-5.jpg"]) },
    { images: localImages(["home-2.jpg", "home-4.jpg"]) },
    { images: localImages(["home-8.JPG", "home-7.JPG", "home-9.JPG"]) },
  ],
  featuredProducts: { count: 3 },
  subscribe: {
    enabled: false,
    heading: "The Lord will Provide",
    subheading: "Join our email list to stay up to date on deals and events",
  },
};

const text = (value) => (typeof value === "string" ? value : "");

const images = (list) =>
  (Array.isArray(list) ? list : [])
    .filter((image) => typeof image?.url === "string" && image.url)
    .map((image) => ({ url: image.url, alt: text(image.alt) }));

// The CMS already validates saved content. This only guards the page against
// a malformed response or an unsaved preview.
export function normalizeHomeContent(content) {
  const { carousel, banner, showcase, featuredProducts, subscribe } =
    content ?? {};
  const count = Number(featuredProducts?.count);
  return {
    carousel: {
      autoplayMs: Number(carousel?.autoplayMs) || 7000,
      slides: images(carousel?.slides),
    },
    banner: {
      logoUrl: text(banner?.logoUrl),
      ctaText: text(banner?.ctaText),
      ctaHref: text(banner?.ctaHref) || "/shop",
    },
    showcase: (Array.isArray(showcase) ? showcase : [])
      .map((row) => ({ images: images(row?.images) }))
      .filter((row) => row.images.length > 0),
    featuredProducts: {
      count: Number.isInteger(count) ? Math.min(12, Math.max(0, count)) : 3,
    },
    subscribe: {
      enabled: subscribe?.enabled === true,
      heading: text(subscribe?.heading),
      subheading: text(subscribe?.subheading),
    },
  };
}
