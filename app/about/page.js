export default function About() {
  return (
    <>
      <section className="about-style-2 py-128">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 left">
              <div className="section-title wow fadeInUp delay-0-3s">
                <h2>A New Chapter Starts Here </h2>
                <div className="wow fadeInUp delay-0-4s mb-45">
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="apart-tap1">
                      <p>
                        Jireh Athletics was founded out of my passion for both
                        sports and faith. As a former professional basketball
                        player and lawyer, I have experienced the power of God
                        being the great provider, and now seek to use this
                        platform to share the message of Jesus Christ. Jireh
                        Athletics is not just about athletics—it’s about
                        inspiring others to live out their faith boldly and
                        unapologetically.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="imgs">
                <img
                  src="img/about/about-1.jpg"
                  alt="about image"
                />
                <img
                  className="hovershow"
                  src="assets/images/about/hover.png"
                  alt="about image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
