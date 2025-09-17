import Image from "next/image";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-nav">
        <div className="footer-nav-links">
          {/* <a className="nav-link" href="/privacy">
            Privacy Policy
          </a> */}
          <a className="nav-link" href="/return">
            Return Policy
          </a>
        </div>
        <div className="footer-nav-socials">
          <a
            href="https://www.instagram.com/jirehathletics1896"
            target="_blank"
          >
            <img src="/assets/images/instagram.png" width={18} />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        © Copyright Jireh Athletics. 2025 All rights reserved.
      </div>
    </div>
  );
}
