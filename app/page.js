import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="page-height">
        <div className="homepage-5-container">
          <div className="homepage-5-slider">
            <div
              className="swiper-container"
              data-slides-per-view="3"
              data-breakpoints="1"
              data-xs-slides="1"
              data-sm-slides="2"
              data-md-slides="2"
              data-mousewheel="1"
            >
              <div className="swiper-button-prev swiper-button hidden-xs style-2"></div>
              <div className="swiper-button-next swiper-button hidden-xs style-2"></div>

              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img
                    src="/img/home/home-4.jpg"
                    alt=""
                    className="tilt-effect"
                    data-tilt-options='{ "movement": { "perspective" : 700, "translateX" : -15, "translateY" : -15, "translateZ" : 10, "rotateX" : 2, "rotateY" : 10 } }'
                  />
                  <div className="entry full-size valign-middle"></div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="img/home/home-2.jpg"
                    alt=""
                    className="tilt-effect"
                    data-tilt-options='{ "movement": { "perspective" : 700, "translateX" : -15, "translateY" : -15, "translateZ" : 10, "rotateX" : 2, "rotateY" : 10 } }'
                  />
                  <div className="entry full-size valign-middle"></div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="img/home/home-3.jpg"
                    alt=""
                    className="tilt-effect"
                    data-tilt-options='{ "movement": { "perspective" : 700, "translateX" : -15, "translateY" : -15, "translateZ" : 10, "rotateX" : 2, "rotateY" : 10 } }'
                  />
                  <div className="entry full-size valign-middle"></div>
                </div>
                <div className="swiper-slide">
                  <img
                    src="img/home/home-1.jpg"
                    alt=""
                    className="tilt-effect"
                    data-tilt-options='{ "movement": { "perspective" : 700, "translateX" : -15, "translateY" : -15, "translateZ" : 10, "rotateX" : 2, "rotateY" : 10 } }'
                  />
                  <div className="entry full-size valign-middle"></div>
                </div>
              </div>
              <div className="swiper-pagination swiper-pagination-white visible-xs"></div>
            </div>
          </div>
          <div
            className="text-center"
            style={{
              width: "fit-content",
              height: "fit-content",
              position: "absolute",
              zIndex: "99",
              left: "0",
              right: "0",
              bottom: "20%",
              opacity: 0.7,
              marginInline: "auto",
            }}
          >
            <p className="lead">
              <a
                href="/shop"
                className="btn btn-lg"
                style={{
                  backgroundColor: "rgb(34, 34, 34, 0.5)",
                  color: "#fff",
                  border: "1px solid #fff",
                  marginBottom: "25px",
                  fontWeight: "bold",
                  paddingLeft: "50px",
                  paddingRight: "50px"
                }}
              >
                Shop
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
