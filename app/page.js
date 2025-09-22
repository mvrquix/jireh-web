"use client";

import { useEffect, useState, useTransition } from "react";
import { fetchAllProducts, subscribeCustomer } from "./actions/shopify-actions";
import ProductItem from "./components/product-item";

export default function Home() {
  const [products, setProducts] = useState(null);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const result = await fetchAllProducts();
    setProducts(result);
  };

  const onSubscribeClick = async () => {
    if (subscriberEmail !== "") {
      startTransition(async () => {
        const result = await subscribeCustomer(subscriberEmail);
        console.log(result);
      });
    }
  };

  return (
    <div className="home-page container">
      <div className="row">
        <div className="home-page-banner">
          <a href="/shop" className="home-page-banner-shop-btn">
            Shop Genesis Collection
          </a>
        </div>
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
        <div className="home-page-collection">
          <div className="row">
            {products &&
              products.slice(0, 3).map((product) => {
                return <ProductItem key={product.id} product={product} />;
              })}
          </div>
        </div>
      </div>

      <div className="row my-5">
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
      </div>
    </div>
  );
}
