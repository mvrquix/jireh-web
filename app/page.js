import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div id="content-block">
        <header className="type-4 light fixed">
          <div className="wide-container-fluid">
            <div className="row">
              <div className="col-xs-6 col-sm-2">
                {/* <a className="logo">
                  <img src="img/home/logo1.png" alt="" />
                </a> */}
              </div>
              <div className="col-xs-6 col-sm-10 text-right">

                <div className="navigation-wrapper">

                  <a className="logo responsive"><img src="img/home/logo.png" alt="" /></a>

                  <div className="navigation-overflow">
                    <nav className="text-left clearfix">
                      <ul>
                        <li>
                          <a href="/shop">Shop</a>
                        </li>
                        <li>
                          <a href="elements.html">About</a>
                        </li>
                      </ul>
                    </nav>
                  </div>

                  <div className="follow style-1">
                    <span className="title">Follow me:</span>
                    <a className="entry" href="#"><i className="fa fa-instagram"></i></a>
                    <a className="entry" href="#"><i className="fa fa-facebook"></i></a>
                  </div>

                </div>

                <div className="hamburger-icon open-navigation">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="close-layer toggle-visibility"><div className="button-close"></div></div>
        </header>

        <div className="fixed-background" style={{ backgroundImage: "url(img/home/background-114.jpg)" }}>
          <div className="page-height">
            <div className="full-size-banner-entry full-size valign-middle">
              <div className="valign-text-wrapper text-center">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="h2 light">
                      <Image src="/img/home/logo-white.png" width={360} height={360} alt="Jireh Athletics" />
                      {/* <b>FASCINATING VIEW</b> */}
                      </div>
                    <div className="empty-space col-xs-b15"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className="wide-container">
            <div className="row">
              <div className="col-md-6 col-xs-text-center col-md-text-left col-sm-b10 col-md-b0">
                <div className="copyright">
                  <div className="simple-article small grey transparent">
                    &copy; 2025 All rights reserved.
                  </div>
                </div>
                <div className="empty-space col-xs-b20 col-md-b0"></div>
              </div>
              <div className="col-md-6 col-xs-text-center col-md-text-right">
                <div className="follow">
                  <span className="title">Follow me:</span>
                  <a className="entry" href="https://www.instagram.com/" target="_blank"><i className="fa fa-instagram"></i></a>
                  <a className="entry" href="https://www.facebook.com/" target="_blank"><i className="fa fa-facebook"></i></a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
