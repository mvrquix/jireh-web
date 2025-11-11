"use client";

import "./scss/styles.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  ChakraProvider,
  defineConfig,
  createSystem,
  defaultConfig,
} from "@chakra-ui/react";
import Header from "./components/header";
import Footer from "./components/footer";

const config = defineConfig({
  theme: {},
});

const system = createSystem(defaultConfig, config);

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
          content="https://github.com/mvrquix/jireh-web/blob/main/public/assets/images/jireh-athletics-logo.png?raw=true"
        />

        <meta property="og:url" content="https://www.jirehathletics.com" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        ></link>
      </head>
      <body>
        <ChakraProvider value={system}>
          <Header />
          <div className="page-wrapper">{children}</div>
          <Footer />
        </ChakraProvider>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
