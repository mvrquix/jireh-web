"use client";

import { useEffect, useState, use } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  addProductToCart,
  fetchProductByHandle,
} from "@/app/actions/shopify-actions";

export default function ShopProduct({ params }) {
  params = use(params);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductByHandle();
  }, []);

  const getProductByHandle = async () => {
    const result = await fetchProductByHandle(params.handle);
    setProduct(result);
  };

  const onAddToCartClick = async (id) => {
    await addProductToCart(id, 1);
  };

  if (!product) return "";

  const { images, variants } = product;
  const variant = variants.edges[0].node;
  return (
    <Container>
      {product && (
        <Stack direction={{ base: "column", md: "row" }} wrap="wrap" gap="8">
          <Box width={{ base: "100%", md: "49%" }}>
            <Stack wrap="wrap">
              <Image src={images.edges[0].node.url} rounded="md" width="100%" />
              <Group wrap="wrap">
                {images.edges.map((image) => (
                  <Image
                    key={image.node.id}
                    src={image.node.url}
                    rounded="md"
                    height="100px"
                  />
                ))}
              </Group>
            </Stack>
          </Box>

          <Box width={{ base: "100%", md: "48%" }}>
            <Stack>
              <Text>{product.title}</Text>
              <Text>{product.description}</Text>

              <Text>{variant.price.amount}</Text>
              <Button
                onClick={() => onAddToCartClick(variant.id)}
                width="180px"
                size="md"
                rounded="full"
              >
                Add To Cart
              </Button>
            </Stack>
          </Box>
        </Stack>
      )}
    </Container>
  );
}
