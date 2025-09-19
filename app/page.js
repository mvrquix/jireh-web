"use client";

import { useEffect, useState } from "react";
import { fetchAllProducts } from "./actions/shopify-actions";
import ProductItem from "./components/product-item";

export default function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const result = await fetchAllProducts();
    setProducts(result);
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
            <h6 className="text-uppercase mb-4">
              Join our email list to stay up to date on deals and events
            </h6>
            <div className="input-group">
              <input
                placeholder="Enter your email address"
                type="text"
                className="form-control"
              />
              <button className="subscribe-btn" type="button">
                <strong>Subscribe</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <>
    //   <div className="large-image-5"></div>
    //   <div className="cta-main-wrapper-three section-separator-bg-dark">
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-lg-12">
    //           <div className="cta-main-wrapper-inner bg_image rts-slide-up-gsap">
    //             <div className="left">
    //               <h3 className="title animated fadeIn">
    //                 SHOP THE GENESIS <br />
    //                 COLLECTION
    //               </h3>
    //             </div>
    //             <div className="right">
    //               <a href="/shop" className="rts-btn btn-primary btn-radious">
    //                 Shop
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="rts-case-studys-area rts-section-gap parallax-case">
    //     <div className="container-140">
    //       <div className="row g-80">
    //         <div className="col-lg-6 col-md-6 col-sm-12 col-12">
    //           <div className="single-product-case-4 mb--80">
    //             <div className="pli-image-link">
    //               <a href="/shop" className="pli-image-holder">
    //                 <figure className="pli-image">
    //                   <img
    //                     className="anim-image-parallax tt-lazy"
    //                     src="assets/images/home-1.jpg"
    //                     data-src="assets/images/home-1.jpg"
    //                     alt="image"
    //                   />
    //                 </figure>
    //               </a>
    //             </div>
    //           </div>
    //           <div className="single-product-case-4">
    //             <div className="pli-image-link">
    //               <a href="/shop" className="pli-image-holder">
    //                 <figure className="pli-image">
    //                   <img
    //                     className="anim-image-parallax tt-lazy"
    //                     src="assets/images/home-2.jpg"
    //                     data-src="assets/images/home-2.jpg"
    //                     alt="image"
    //                   />
    //                 </figure>
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col-lg-6 col-md-6 col-sm-12 col-12">
    //           <div className="single-product-case-4 mb--80 mt--100">
    //             <div className="pli-image-link">
    //               <a href="/shop" className="pli-image-holder">
    //                 <figure className="pli-image">
    //                   <img
    //                     className="anim-image-parallax tt-lazy"
    //                     src="assets/images/home-6.jpg"
    //                     data-src="assets/images/home-6.jpg"
    //                     alt="image"
    //                   />
    //                 </figure>
    //               </a>
    //             </div>
    //           </div>
    //           <div className="single-product-case-4">
    //             <div className="pli-image-link">
    //               <a href="/shop" className="pli-image-holder">
    //                 <figure className="pli-image">
    //                   <img
    //                     className="anim-image-parallax tt-lazy"
    //                     src="assets/images/home-5.jpg"
    //                     data-src="assets/images/home-5.jpg"
    //                     alt="image"
    //                   />
    //                 </figure>
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}
