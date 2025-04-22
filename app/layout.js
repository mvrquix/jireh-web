"use client";

import { usePathname } from "next/navigation";
import { Provider } from "@/components/ui/provider";
import Script from "next/script";
import { Theme } from "@chakra-ui/react";
import { ShopHeader } from "./components/shop-header";
import LandingHeader from "./components/landing-header";
import LandingFooter from "./components/landing-footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  if (pathname.startsWith("/shop")) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
          <Provider>
            <Theme appearance="dark">
              <ShopHeader />
              {children}
            </Theme>
          </Provider>
        </body>
      </html>
    );
  }

  return <HomeLayout children={children} />;
}

function HomeLayout({ children }) {
  return (
    <html lang="en">
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="assets/vendor/fontawesome-5.14.0.min.css"
        />

        <link
          rel="stylesheet"
          href="assets/vendor/bootstrap/css/bootstrap.min.css"
        />

        <link
          rel="stylesheet"
          href="assets/vendor/magnific-popup/css/magnific-popup.min.css"
        />

        <link
          rel="stylesheet"
          href="assets/vendor/nice-select/css/nice-select.min.css"
        />

        <link rel="stylesheet" href="assets/vendor/animate.min.css" />

        <link rel="stylesheet" href="assets/vendor/slick/css/slick.min.css" />

        <link rel="stylesheet" href="assets/css/style.css" />
      </head>
      <body>
        <div className="page-wrapper">
          <LandingHeader />
          {children}
          <LandingFooter />
        </div>
        <Script src="assets/vendor/jquery-3.7.1.min.js" strategy="beforeInteractive"></Script>

        <Script src="assets/vendor/bootstrap/js/popper.min.js" strategy="beforeInteractive"></Script>

        <Script src="assets/vendor/bootstrap/js/bootstrap.min.js" strategy="beforeInteractive"></Script>

        <Script src="assets/vendor/appear.min.js" strategy="beforeInteractive"></Script>

        <Script src="assets/vendor/slick/js/slick.min.js" strategy="beforeInteractive"></Script>

        <Script src="assets/vendor/magnific-popup/js/jquery.magnific-popup.min.js" strategy="beforeInteractive"></Script>

        <Script src="assets/vendor/nice-select/js/jquery.nice-select.min.js" strategy="beforeInteractive"></Script>

        <Script src="assets/vendor/imagesloaded.pkgd.min.js" strategy="beforeInteractive"></Script>

        <Script src="assets/vendor/isotope.pkgd.min.js" strategy="beforeInteractive"></Script>
        <Script src="assets/vendor/wow.min.js" strategy="beforeInteractive"></Script>
        <Script src="assets/js/script.js"></Script>
      </body>
    </html>
  );
}
