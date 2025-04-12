import Image from "next/image";

export default function LandingHeader() {
  return (
    <header className="type-4 light fixed" style={{zIndex: '100'}}>
      <div className="wide-container-fluid">
        <div className="row">
          <div className="col-xs-6 col-sm-2"></div>
          <div className="col-xs-6 col-sm-10 text-right">
            <div className="navigation-wrapper">
              <a className="logo responsive">
                <Image
                  src="/img/home/logo-black-with-bg.png"
                  width="100"
                  height="100"
                  alt=""
                />
              </a>

              <div className="navigation-overflow">
                <nav className="text-left clearfix">
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/shop">Shop</a>
                    </li>
                    <li>
                      <a href="/about">About</a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="follow style-1">
                <span className="title">Follow me:</span>
                <a
                  className="entry"
                  href="https://www.instagram.com/jirehathletics1896"
                  target="_blank"
                >
                  <i className="fa fa-instagram"></i>
                </a>
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
      <div className="close-layer toggle-visibility">
        <div className="button-close"></div>
      </div>
    </header>
  );
}
