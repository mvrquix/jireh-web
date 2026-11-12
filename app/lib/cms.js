// Server-side reads from jireh-cms (../jireh-cms), which manages the home page
// content. Its base URL comes from CMS_URL, e.g. http://localhost:3001.

const TIMEOUT_MS = 5000;

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

export function cmsUrl(path) {
  const base = process.env.CMS_URL;
  return base ? new URL(path, base) : null;
}

const text = (value) => (typeof value === "string" ? value : "");

const images = (list) =>
  (Array.isArray(list) ? list : [])
    .filter((image) => typeof image?.url === "string" && image.url)
    .map((image) => ({ url: image.url, alt: text(image.alt) }));

// The CMS already validates content. This only guards the page against a
// malformed response.
function normalize(content) {
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
    featuredProducts: { count: Number.isInteger(count) ? count : 3 },
    subscribe: {
      enabled: subscribe?.enabled === true,
      heading: text(subscribe?.heading),
      subheading: text(subscribe?.subheading),
    },
  };
}

let warnedMissingUrl = false;

export async function getHomeContent() {
  const url = cmsUrl("/api/public/home");
  if (!url) {
    if (!warnedMissingUrl) {
      console.warn("CMS_URL is not set; using the built-in home page content.");
      warnedMissingUrl = true;
    }
    return FALLBACK_HOME_CONTENT;
  }

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return normalize(await response.json());
  } catch (error) {
    console.error(
      `Could not load home page content from ${url}; using the built-in content.`,
      error,
    );
    return FALLBACK_HOME_CONTENT;
  }
}
