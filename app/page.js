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
                    <div className="entry full-size valign-middle">
                      
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="img/home/home-2.jpg"
                      alt=""
                      className="tilt-effect"
                      data-tilt-options='{ "movement": { "perspective" : 700, "translateX" : -15, "translateY" : -15, "translateZ" : 10, "rotateX" : 2, "rotateY" : 10 } }'
                    />
                    <div className="entry full-size valign-middle">
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="img/home/home-3.jpg"
                      alt=""
                      className="tilt-effect"
                      data-tilt-options='{ "movement": { "perspective" : 700, "translateX" : -15, "translateY" : -15, "translateZ" : 10, "rotateX" : 2, "rotateY" : 10 } }'
                    />
                    <div className="entry full-size valign-middle">
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <img
                      src="img/home/home-1.jpg"
                      alt=""
                      className="tilt-effect"
                      data-tilt-options='{ "movement": { "perspective" : 700, "translateX" : -15, "translateY" : -15, "translateZ" : 10, "rotateX" : 2, "rotateY" : 10 } }'
                    />
                    <div className="entry full-size valign-middle">
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination swiper-pagination-white visible-xs"></div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
