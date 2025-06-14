import Image from "next/image";

export default function Footer() {
  return (
    <div className="rts-footer-two-area bg-footer-1" style={{paddingTop: "25px", backgroundColor: "#000"}}>
      <div className="container-140">
        <div className="row">
          <div className="col-lg-12 pt_sm--60 pb_sm--60" style={{paddingBottom: "15px"}}>
            <div className="footer-two-wrapper-content">
              <div className="footer-left-two">
                <a href="/" className="logo">
                  <Image src="/img/home/logo-black-with-bg.png" width={300} height={300} alt="logo" style={{margin: "0 auto"}} />
                </a>
                <p className="disc text-center">
                  So <span className="white">Abraham</span> called that place{" "}
                  <span className="white">The Lord Will Provide</span>. 
                  <br/>And to this day it is said,
                  <br/> “On the mountain of the <span className="white">Lord</span> it will be provided."
                </p>
                <div className="rts-social-area-one">
                  <ul>
                    <li>
                      <a
                        href="https://www.instagram.com/jirehathletics1896"
                        target="_blank"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="copy-right-area-start-two">
              <p className="left">
                © Copyright Jireh Athletics. 2025 All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
