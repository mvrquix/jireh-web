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

        <meta property="og:image" content="https://github.com/mvrquix/jireh-web/blob/main/public/img/home/logo-black-with-bg.png?raw=true" />

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
          href="https://fonts.googleapis.com/css?family=Inconsolata:400,700"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Droid+Serif:400italic,700italic"
          rel="stylesheet"
          type="text/css"
        />

        <link
          href="/css/home/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/css/home/bootstrap.extension.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/css/home/font-awesome.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/css/home/style.css" rel="stylesheet" type="text/css" />
        <link href="/css/home/swiper.css" rel="stylesheet" type="text/css" />
        <link
          href="/css/home/simplelightbox.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className="fonts-8">
        <div id="loader-wrapper"></div>
        <div id="content-block">
          <LandingHeader />
          {children}
          <LandingFooter />
        </div>

        <Script
          src="js/home/jquery-2.1.4.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="js/home/swiper.jquery.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="js/home/jquery.mousewheel.min.js"
          strategy="beforeInteractive"
        />
        <Script src="js/home/global.js" />
        <Script src="js/home/tiltfx.js" />
      </body>
    </html>
  );
}
