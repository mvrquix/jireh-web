"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";
import { Flex, Image, Progress, Skeleton } from "@chakra-ui/react";
import { fetchAllProducts } from "../actions/shopify-actions";
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
    <div className="container">
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
                className="shop-item col-lg-4"
                style={{ cursor: "pointer" }}
              >
                <a
                  onClick={() => router.push(`/shop/${handle}`)}
                  className="shop-item-thumbnail"
                >
                  <NextImage
                    src={featuredImage.url}
                    alt={title}
                    width={610}
                    height={330}
                    style={{ width: "100%" }}
                  />
                </a>
                <div className="shop-item-details">
                  <a onClick={() => router.push(`/shop/${handle}`)}>
                    <h5 className="shop-item-name">
                      {title}{" "}
                      {!availableForSale && (
                        <span className="shop-item-sold-out"> Sold out</span>
                      )}
                    </h5>
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
