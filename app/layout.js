"use client";

import { Provider } from "@/components/ui/provider";
import Script from "next/script";
import Header from "./components/landing-header";
import Footer from "./components/landing-footer";

export default function RootLayout({ children }) {


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Jireh Athletics</title>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, minimal-ui"
        />
        <meta property="og:title" content="Jireh Athletics" />

        <meta
          property="og:description"
          content="Jireh Athletics is not just about athletics—it’s about inspiring others to live out their faith boldly and unapologetically."
        />

        <meta
          property="og:image"
          content="https://github.com/mvrquix/jireh-web/blob/main/public/img/home/logo-black-with-bg.png?raw=true"
        />

        <meta property="og:url" content="https://www.jirehathletics.com" />

        <link rel="stylesheet" href="/assets/css/plugins/fontawesome-6.css" />
        <link rel="stylesheet" href="/assets/css/plugins/swiper.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/metismenu.css" />
        <link rel="stylesheet" href="/assets/css/plugins/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body className="smooth-scroll">
        <Provider>
          <Header />
          <div className="main-content-wrapper">{children}</div>
          <Footer />
          <div className="progress-wrap">
            <svg
              className="progress-circle svg-content"
              width="100%"
              height="100%"
              viewBox="-1 -1 102 102"
            >
              <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
            </svg>
          </div>
        </Provider>

        <Script
          src="/assets/js/vendor/jquery.min.js"
          strategy="beforeInteractive"
        ></Script>

        <Script
          src="/assets/js/plugins/bootstrap.min.js"
          strategy="beforeInteractive"
        ></Script>

        <Script
          src="/assets/js/vendor/waypoint.js"
          strategy="beforeInteractive"
        ></Script>

        <Script
          src="/assets/js/plugins/swiper.js"
          strategy="beforeInteractive"
        ></Script>

        <Script
          src="/assets/js/plugins/resizer-sensor.js"
          strategy="beforeInteractive"
        ></Script>

        <Script
          src="/assets/js/plugins/sticky-sidebar.js"
          strategy="beforeInteractive"
        ></Script>

        <Script
          src="/assets/js/plugins/isotop.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/plugins/imagesloaded.pkgd.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/plugins/smoothscroll-varticle.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/vendor/gsap.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/plugins/scrolltiger.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/plugins/scrolltoplugin.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/plugins/splittext.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/plugins/smoothscroll.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/plugins/scrollmagic.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/plugins/animate-scrollmagic.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/plugins/tilt.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/plugins/counterup.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/js/vendor/waw.js"
          strategy="beforeInteractive"
        ></Script>
        <Script src="/assets/js/main.js"></Script>
      </body>
    </html>
  );
}
