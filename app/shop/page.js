"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";
import { Flex, Image, Progress, Skeleton } from "@chakra-ui/react";
import { fetchAllProducts } from "../actions/shopify-actions";
import { ShopProductCard } from "../components/shop-product-card";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function Shop() {
  const [products, setProducts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const result = await fetchAllProducts();
    setProducts(result);
  };

  const getProductCategory = (title) => {
    if (
      title.toLowerCase().includes("snapback") ||
      title.toLowerCase().includes("strapback")
    )
      return "hat";
    if (title.toLowerCase().includes("t-shirt")) return "shirt";
    if (title.toLowerCase().includes("crewneck")) return "crewneck";
    if (title.toLowerCase().includes("pants")) return "pants";
    if (title.toLowerCase().includes("shorts")) return "shorts";
  };

  if (!products) {
    return (
      <div className="container-fluid">
        <Flex justify="center" align="center" height="500px">
          <Progress.Root width="360px" value={null}>
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Flex>
      </div>
    );
  }

  const selectedProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p) => getProductCategory(p.node.title) === selectedCategory
        );

  return (
    <div className="rts-portfolio-grid-area rts-section-gapBottom masonry">
      <div className="main-isotop">
        <div className="container">
          <div className="button-group filters-button-group style-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`button ${selectedCategory === "all" && "is-checked"}`}
              data-filter="*"
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory("hat")}
              className={`button ${selectedCategory === "hat" && "is-checked"}`}
              data-filter=".hat"
            >
              Hats
            </button>
            <button
              onClick={() => setSelectedCategory("shirt")}
              className={`button ${selectedCategory === "shirt" && "is-checked"}`}
              data-filter=".shirt"
            >
              T-shirts
            </button>
            <button
              onClick={() => setSelectedCategory("crewneck")}
              className={`button ${selectedCategory === "crewneck" && "is-checked"}`}
              data-filter=".crewneck"
            >
              Crewnecks
            </button>
            <button
              onClick={() => setSelectedCategory("pants")}
              className={`button ${selectedCategory === "pants" && "is-checked"}`}
              data-filter=".pants"
            >
              Pants
            </button>
            <button
              onClick={() => setSelectedCategory("shorts")}
              className={`button ${selectedCategory === "shorts" && "is-checked"}`}
              data-filter=".shorts"
            >
              Shorts
            </button>
          </div>

          <div className="row">
            {selectedProducts &&
              selectedProducts.map((product) => {
                const {
                  id,
                  availableForSale,
                  handle,
                  title,
                  featuredImage,
                  priceRange,
                  variants,
                } = product.node;
                const variantId = variants.edges[0].node.id;
                const currencyFormatter = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                });
                const formattedPrice = currencyFormatter.format(
                  priceRange.minVariantPrice.amount
                );
                const category = getProductCategory(title);
                return (
                  <div
                    key={id}
                    className={`col-lg-4 element-item ${category}`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="signle-portfolio-style-four-inner ptb--20">
                      <a
                        onClick={() => router.push(`/shop/${handle}`)}
                        className="thumbnail"
                      >
                        <NextImage
                          src={featuredImage.url}
                          alt={title}
                          width={610}
                          height={330}
                          style={{ width: "100%" }}
                        />
                      </a>
                      <div className="inner-content">
                        {!availableForSale && <span> Sold out</span> }
                        <a onClick={() => router.push(`/shop/${handle}`)}>
                          <h5 className="name">{title}</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
