"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Separator,
  Skeleton,
  Stack,
  StackSeparator,
} from "@chakra-ui/react";
import { fetchAllProducts } from "../actions/shopify-actions";
import { ShopProductCard } from "../components/shop-product-card";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const result = await fetchAllProducts();
    setProducts(result);
  };

  const snapBacks = products.filter((p) =>
    p.node.title.toLowerCase().includes("snapback")
  );
  const tShirts = products.filter((p) =>
    p.node.title.toLowerCase().includes("t-shirt")
  );
  const crewNecks = products.filter((p) =>
    p.node.title.toLowerCase().includes("crewneck")
  );
  const pants = products.filter((p) =>
    p.node.title.toLowerCase().includes("pants")
  );
  const shorts = products.filter((p) =>
    p.node.title.toLowerCase().includes("shorts")
  );

  return (
    <Container paddingTop="4" paddingBottom="4">
      {products.length === 0 && (
        <Stack
          gap="4"
          direction={{ base: "column", md: "row", lg: "row" }}
          wrap="wrap"
        >
          <Skeleton
            width={{ base: "100%", md: "32%" }}
            height={{ base: "298px", md: "305px" }}
          />
          <Skeleton
            width={{ base: "100%", md: "32%" }}
            height={{ base: "298px", md: "305px" }}
          />
          <Skeleton
            width={{ base: "100%", md: "32%" }}
            height={{ base: "298px", md: "305px" }}
          />
        </Stack>
      )}
      {products && (
        <Stack gap="8" separator={<StackSeparator />}>
          {tShirts.length > 0 && (
            <Stack
              gap="4"
              direction={{ base: "column", md: "row", lg: "row" }}
              wrap="wrap"
            >
              {tShirts.map((product) => {
                return (
                  <ShopProductCard
                    key={product.node.id}
                    product={product.node}
                  />
                );
              })}
            </Stack>
          )}
          {crewNecks.length > 0 && (
            <Stack
              gap="4"
              direction={{ base: "column", md: "row", lg: "row" }}
              wrap="wrap"
            >
              {crewNecks.map((product) => {
                return (
                  <ShopProductCard
                    key={product.node.id}
                    product={product.node}
                  />
                );
              })}
            </Stack>
          )}
          {pants.length > 0 && (
            <Stack
              gap="4"
              direction={{ base: "column", md: "row", lg: "row" }}
              wrap="wrap"
            >
              {pants.map((product) => {
                return (
                  <ShopProductCard
                    key={product.node.id}
                    product={product.node}
                  />
                );
              })}
            </Stack>
          )}
          {shorts.length > 0 && (
            <Stack
              gap="4"
              direction={{ base: "column", md: "row", lg: "row" }}
              wrap="wrap"
            >
              {shorts.map((product) => {
                return (
                  <ShopProductCard
                    key={product.node.id}
                    product={product.node}
                  />
                );
              })}
            </Stack>
          )}
          {snapBacks && (
            <Stack
              gap="4"
              direction={{ base: "column", md: "row", lg: "row" }}
              wrap="wrap"
            >
              {snapBacks.map((product) => {
                return (
                  <ShopProductCard
                    key={product.node.id}
                    product={product.node}
                  />
                );
              })}
            </Stack>
          )}
        </Stack>
      )}
    </Container>
  );
}
