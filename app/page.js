"use client";

import { useEffect, useState, useTransition } from "react";
import {
  AspectRatio,
  Carousel,
  HStack,
  IconButton,
  Image,
  VStack,
} from "@chakra-ui/react";
import { fetchAllProducts, subscribeCustomer } from "./actions/shopify-actions";
import ProductItem from "./components/product-item";
import { LuChevronLeft, LuChevronRight, LuPause, LuPlay } from "react-icons/lu";

export default function Home() {
  const [products, setProducts] = useState(null);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const result = await fetchAllProducts();
    setProducts(
      result.sort(
        (a, b) => new Date(b.node.createdAt) - new Date(a.node.createdAt)
      )
    );
  };

  const onSubscribeClick = async () => {
    if (subscriberEmail !== "") {
      startTransition(async () => {
        const result = await subscribeCustomer(subscriberEmail);
        console.log(result);
      });
    }
  };

  const carouselItems = Array.from({ length: 10 });

  return (
    <div className="home-page container">
      <div className="row my-5">
        <Carousel.Root
          slideCount={carouselItems.length}
          mx="auto"
          maxW="xl"
          autoplay={{ delay: 7000 }}
        >
          <Carousel.ItemGroup>
            {carouselItems.map((_, index) => {
              return (
                <Carousel.Item key={index} index={index}>
                  <AspectRatio ratio={3 / 4} w="full">
                    <Image
                      src={`assets/images/carousel/${String(index + 1).padStart(2, "0")}.jpg`}
                      objectFit="contain"
                    />
                  </AspectRatio>
                  <img />
                </Carousel.Item>
              );
            })}
          </Carousel.ItemGroup>
          <Carousel.Control justifyContent="center" gap="4">
            <Carousel.Indicators />
          </Carousel.Control>
        </Carousel.Root>
      </div>

      <div className="row my-5">
        <VStack>
          <img
            src="assets/images/jireh-athletics-logo.png"
            style={{ width: "50%" }}
          />
          <a href="/shop" className="home-page-banner-shop-btn">
            Shop The Collection
          </a>
        </VStack>
      </div>

      <div className="row my-5">
        <div className="home-page-showcase">
          <div className="row">
            <div className="col-lg-6 my-4">
              <img
                className="anim-image-parallax tt-lazy"
                src="assets/images/home-1.jpg"
                data-src="assets/images/home-1.jpg"
                alt="image"
              />
            </div>
            <div className="col-lg-6 my-4">
              <img
                className="anim-image-parallax tt-lazy"
                src="assets/images/home-5.jpg"
                data-src="assets/images/home-5.jpg"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="home-page-showcase">
          <div className="row">
            <div className="col-lg-6 my-4">
              <img
                className="anim-image-parallax tt-lazy"
                src="assets/images/home-2.jpg"
                data-src="assets/images/home-1.jpg"
                alt="image"
              />
            </div>
            <div className="col-lg-6 my-4">
              <img
                className="anim-image-parallax tt-lazy"
                src="assets/images/home-4.jpg"
                data-src="assets/images/home-5.jpg"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="home-page-collection">
          <div className="row">
            {products &&
              products.slice(0, 3).map((product) => {
                return <ProductItem key={product.node.id} product={product} />;
              })}
          </div>
        </div>
      </div>

      {/* <div className="row my-5">
        <div className="home-page-subscribe">
          <div className="col-md-8 col-sm-12">
            <h1 className="text-uppercase text-center mb-4">
              <strong>The Lord will Provide</strong>
            </h1>
            <h6 className="text-uppercase text-center mb-4">
              Join our email list to stay up to date on deals and events
            </h6>
            <div className="input-group">
              <input
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                placeholder="Enter your email address"
                type="text"
                className="form-control"
              />
              <button
                onClick={() => onSubscribeClick()}
                className="subscribe-btn"
                type="button"
                disabled={isPending}
              >
                {isPending && (
                  <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                <strong>Subscribe</strong>
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
