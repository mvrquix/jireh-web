"use client";

import { useEffect, useState } from "react";
import { Container, Skeleton, Stack } from "@chakra-ui/react";
import { fetchAllProducts } from "../actions/shopify-actions";
import { ShopProductCard } from "../components/shop-product-card";

export default function Shop() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const result = await fetchAllProducts();
    setProducts(result);
  };

  return (
    <Container paddingTop="4" paddingBottom="4">
      {!products && (
        <Stack gap="4" direction={{ base: "column", md: "row", lg: "row" }} wrap="wrap">
          <Skeleton width={{base: "100%", md: "49%"}} height={{base: "298px", md: "505px"}} />
          <Skeleton width={{base: "100%", md: "49%"}} height={{base: "298px", md: "505px"}} />
          <Skeleton width={{base: "100%", md: "49%"}} height={{base: "298px", md: "505px"}} />
          <Skeleton width={{base: "100%", md: "49%"}} height={{base: "298px", md: "505px"}} />
        </Stack>
      )}
      {products && (
        <Stack gap="4" direction={{ base: "column", md: "row", lg: "row" }} wrap="wrap">
          {products.map((product) => {
            return (
              <ShopProductCard key={product.node.id} product={product.node} />
            );
          })}
        </Stack>
      )}
    </Container>
  );
}
