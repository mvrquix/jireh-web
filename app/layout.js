"use client";

import { usePathname } from "next/navigation";
import { Provider } from "@/components/ui/provider";
import Script from "next/script";
import { Theme } from "@chakra-ui/react";
import { ShopHeader } from "./components/shop-header";
import LandingHeader from "./components/landing-header";

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
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, minimal-ui"
        />

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
        <div id="content-block">
          <LandingHeader />
          {children}
        </div>

        <Script
          src="js/home/jquery-2.1.4.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="js/home/swiper.jquery.min.js"
        />
        <Script
          src="js/home/jquery.mousewheel.min.js"
        />
        <Script src="js/home/global.js" />

        <Script src="js/home/tiltfx.js" />
      </body>
    </html>
  );
}
