"use client";

import { useEffect, useState, useTransition } from "react";
import { AspectRatio, Carousel, Image, VStack } from "@chakra-ui/react";
import { fetchAllProducts } from "../actions/shopify-actions";
import { subscribeToEmailList } from "../actions/cms-actions";
import ProductItem from "./product-item";

// Bootstrap column class that fits `count` images on one row on large screens.
const columnClass = (count) => `col-lg-${Math.max(2, Math.floor(12 / count))}`;

// Renders the home page from the content managed in jireh-cms. `preview` is
// set on the /preview page, where the content is unsaved.
export default function HomeContent({ content, preview = false }) {
  const { carousel, banner, showcase, featuredProducts, subscribe } = content;
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (featuredProducts.count === 0) return;
    fetchAllProducts().then((result) =>
      setProducts(
        result.sort(
          (a, b) => new Date(b.node.createdAt) - new Date(a.node.createdAt),
        ),
      ),
    );
  }, [featuredProducts.count]);

  return (
    <div className="home-page container">
      {carousel.slides.length > 0 && (
        <div className="row my-5">
          <Carousel.Root
            // Remount when the slides change (in the preview), since the
            // carousel measures its slides once.
            key={`${carousel.autoplayMs}|${carousel.slides.map((s) => s.url).join("|")}`}
            slideCount={carousel.slides.length}
            mx="auto"
            maxW="xl"
            autoplay={{ delay: carousel.autoplayMs }}
            allowMouseDrag={true}
            autoSize={true}
          >
            {/* The item group scrolls on the x axis, which makes the browser treat
                it as scrollable on y too. Lock y so the wheel/touch scrolls the page. */}
            <Carousel.ItemGroup overflowY="hidden">
              {carousel.slides.map((slide, index) => (
                <Carousel.Item key={index} index={index}>
                  {/* overflow="hidden" clips AspectRatio's 16:9 spacer, which is
                      taller than the 600px cap and would otherwise overflow. */}
                  <AspectRatio
                    ratio={9 / 16}
                    w="full"
                    maxH="600px"
                    overflow="hidden"
                  >
                    <Image src={slide.url} alt={slide.alt} objectFit="contain" />
                  </AspectRatio>
                </Carousel.Item>
              ))}
            </Carousel.ItemGroup>
            <Carousel.Control justifyContent="center" gap="4">
              <Carousel.Indicators />
            </Carousel.Control>
          </Carousel.Root>
        </div>
      )}

      {(banner.logoUrl || banner.ctaText) && (
        <div className="row my-5">
          <VStack>
            {banner.logoUrl && (
              <img
                src={banner.logoUrl}
                alt="Jireh Athletics"
                style={{ width: "50%" }}
              />
            )}
            {banner.ctaText && (
              <a href={banner.ctaHref} className="home-page-banner-shop-btn">
                {banner.ctaText}
              </a>
            )}
          </VStack>
        </div>
      )}

      {showcase.map((row, rowIndex) => (
        <div key={rowIndex} className="row my-5">
          <div className="home-page-showcase">
            <div className="row" style={{ alignItems: "center" }}>
              {row.images.map((image, index) => (
                <div
                  key={index}
                  className={`${columnClass(row.images.length)} my-4`}
                >
                  <img src={image.url} alt={image.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {featuredProducts.count > 0 && (
        <div className="row my-5">
          <div className="home-page-collection">
            <div className="row">
              {products?.slice(0, featuredProducts.count).map((product) => (
                <ProductItem key={product.node.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}

      {subscribe.enabled && (
        <SubscribeSection
          heading={subscribe.heading}
          subheading={subscribe.subheading}
          preview={preview}
        />
      )}
    </div>
  );
}

function SubscribeSection({ heading, subheading, preview }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event) => {
    event.preventDefault();
    if (preview) {
      setMessage("Sign-ups are turned off in the preview.");
      return;
    }
    if (email.trim() === "") return;
    startTransition(async () => {
      const result = await subscribeToEmailList(email);
      if (result.ok) {
        setEmail("");
        setMessage(
          result.alreadySubscribed
            ? "You're already on the list."
            : "Thanks for subscribing!",
        );
      } else {
        setMessage(result.error);
      }
    });
  };

  return (
    <div className="row my-5">
      <div className="home-page-subscribe">
        <div className="col-md-8 col-sm-12">
          {heading && (
            <h1 className="text-uppercase text-center mb-4">
              <strong>{heading}</strong>
            </h1>
          )}
          {subheading && (
            <h6 className="text-uppercase text-center mb-4">{subheading}</h6>
          )}
          <form className="input-group" onSubmit={onSubmit}>
            <input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage(null);
              }}
              placeholder="Enter your email address"
              type="email"
              aria-label="Email address"
              className="form-control"
            />
            <button className="subscribe-btn" type="submit" disabled={isPending}>
              {isPending && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              <strong>Subscribe</strong>
            </button>
          </form>
          {message && (
            <p className="text-center mt-3" role="status">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
