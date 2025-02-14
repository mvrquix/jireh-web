"use client";

import { useEffect, useState, use } from "react";
import {
  Box,
  Button,
  Container,
  Group,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  addProductToCart,
  fetchProductByHandle,
} from "@/app/actions/shopify-actions";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { BreadcrumbLink, BreadcrumbRoot } from "@/components/ui/breadcrumb";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useEventEmitter } from "@/app/hooks/event-emitter-hook";

export default function ShopProduct({ params }) {
  params = use(params);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { publishEvent } = useEventEmitter("cart-update");

  useEffect(() => {
    getProductByHandle();
  }, []);

  const getProductByHandle = async () => {
    const result = await fetchProductByHandle(params.handle);
    setSelectedImage(result.images.edges[0]);
    setProduct(result);
  };

  const onAddToCartClick = async (id) => {
    await addProductToCart(id, 1);
    publishEvent({ data: true });
  };

  if (!product) {
    return (
      <Container>
        <Stack direction={{ base: "column", md: "row" }} wrap="wrap" gap="4">
          <Skeleton
            width={{ base: "100%", md: "50%" }}
            height={{ base: "298px", md: "505px" }}
          />
          <Box width={{ base: "100%", md: "48%" }}>
            <SkeletonText noOfLines="8" />
          </Box>
        </Stack>
      </Container>
    );
  }

  const { images, variants } = product;
  const variant = variants.edges[0].node;
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Container paddingTop="8">
      <BreadcrumbRoot style={{ marginBottom: "25px" }}>
        <BreadcrumbLink href="/shop">
          <RiArrowGoBackFill /> Back to Shop
        </BreadcrumbLink>
      </BreadcrumbRoot>
      {product && (
        <Stack direction={{ base: "column", md: "row" }} wrap="wrap" gap="8">
          <Box width={{ base: "100%", md: "49%" }}>
            <Stack wrap="wrap">
              <Image
                src={selectedImage.node.url}
                rounded="md"
                width="100%"
                maxHeight="505px"
              />
              <Group wrap="wrap">
                {images.edges.map((image) => (
                  <Image
                    key={image.node.id}
                    src={image.node.url}
                    onClick={() => setSelectedImage(image)}
                    rounded="md"
                    height="100px"
                    cursor="pointer"
                  />
                ))}
              </Group>
            </Stack>
          </Box>

          <Box width={{ base: "100%", md: "48%" }} paddingBottom="8">
            <Stack gap="8">
              <Heading size="2xl" fontWeight="bold">
                {product.title}
              </Heading>
              <Text>{product.description}</Text>
              <Text textStyle="xl">
                {currencyFormatter.format(variant.price.amount)}
              </Text>
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
