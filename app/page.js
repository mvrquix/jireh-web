"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <section className="architecture-area py-128">
      <div className="container">
        <div className="tab-content tab-pane project-active">
          <div className="col-lg-12 item ARCHITECTURE LANDSCAPE">
            <div className="row apartment-image wow fadeInLeft delay-0-1s">
              <a href="project-details.html">
                <img src="/img/home/home-5.jpg" alt="Apartment" />
              </a>
            </div>
            <div className="row apartment-content wow fadeInRight delay-0-1s rp-0">
              <div className="col-lg-6 pro-title">
                <a href="/shop">
                  <h5>SHOP GENESIS COLLECTION</h5>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 item ARCHITECTURE">
            <div className="row apartment-image wow fadeInLeft delay-0-1s">
              <a href="project-details.html">
                <img src="/img/home/home-4.jpg" alt="Apartment" />
              </a>
            </div>
          </div>
          <div className="col-lg-6 item INTERIOR">
            <div className="row apartment-image wow fadeInLeft delay-0-1s">
              <a href="project-details.html">
                <img src="img/home/home-2.jpg" alt="Apartment" />
              </a>
            </div>
          </div>
          <div className="col-lg-6 item ARCHITECTURE">
            <div className="row apartment-image wow fadeInLeft delay-0-1s">
              <a href="project-details.html">
                <img src="img/home/home-3.jpg" alt="Apartment" />
              </a>
            </div>
          </div>
          <div className="col-lg-6 item INTERIOR">
            <div className="row apartment-image wow fadeInLeft delay-0-1s">
              <a href="project-details.html">
                <img src="img/home/home-1.jpg" alt="Apartment" />
              </a>
            </div>
          </div>

          <div className="col-lg-12 text-center">
            <button
              onClick={() => router.push("/about")}
              className="loadmore primary-readmore mt-0"
            >
              ABOUT JIREH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
