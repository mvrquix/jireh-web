"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <>
      <div className="large-image-5"></div>
      <div className="cta-main-wrapper-three section-separator-bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cta-main-wrapper-inner bg_image rts-slide-up-gsap">
                <div className="left">
                  <h3 className="title animated fadeIn">
                    SHOP THE GENESIS <br />
                    COLLECTION
                  </h3>
                </div>
                <div className="right">
                  <a href="/shop" className="rts-btn btn-primary btn-radious">
                    Shop
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rts-case-studys-area rts-section-gap parallax-case">
        <div className="container-140">
          <div className="row g-80">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="single-product-case-4 mb--80">
                <div className="pli-image-link">
                  <a href="/shop" className="pli-image-holder">
                    <figure className="pli-image">
                      <img
                        className="anim-image-parallax tt-lazy"
                        src="assets/images/home-1.jpg"
                        data-src="assets/images/home-1.jpg"
                        alt="image"
                      />
                    </figure>
                  </a>
                </div>
              </div>
              <div className="single-product-case-4">
                <div className="pli-image-link">
                  <a href="/shop" className="pli-image-holder">
                    <figure className="pli-image">
                      <img
                        className="anim-image-parallax tt-lazy"
                        src="assets/images/home-2.jpg"
                        data-src="assets/images/home-2.jpg"
                        alt="image"
                      />
                    </figure>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="single-product-case-4 mb--80 mt--100">
                <div className="pli-image-link">
                  <a href="/shop" className="pli-image-holder">
                    <figure className="pli-image">
                      <img
                        className="anim-image-parallax tt-lazy"
                        src="assets/images/home-6.jpg"
                        data-src="assets/images/home-6.jpg"
                        alt="image"
                      />
                    </figure>
                  </a>
                </div>
              </div>
              <div className="single-product-case-4">
                <div className="pli-image-link">
                  <a href="/shop" className="pli-image-holder">
                    <figure className="pli-image">
                      <img
                        className="anim-image-parallax tt-lazy"
                        src="assets/images/home-5.jpg"
                        data-src="assets/images/home-5.jpg"
                        alt="image"
                      />
                    </figure>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
