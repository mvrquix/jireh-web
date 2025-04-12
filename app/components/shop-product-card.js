import { useRouter } from "next/navigation";
import { Box, Card, Image, Skeleton } from "@chakra-ui/react";
import NextImage from 'next/image'

export function ShopProductCard({ product }) {
  const router = useRouter();
  const { id, availableForSale, handle, title, description, featuredImage, priceRange, variants } = product;
  const variantId = variants.edges[0].node.id
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  const formattedPrice = currencyFormatter.format(priceRange.minVariantPrice.amount)

  return (
    <Box
      width={{ base: "100%", md: "32%", lg: "32%" }}
      cursor="pointer"
      onClick={() => router.push(`/shop/${handle}`)}
    >
      <Card.Root width="100%" border="0">
        <Image width="674px" height="370px" fit="contain" asChild>
          <NextImage src={featuredImage.url} alt={title} width={674} height={505} style={{width: "100%"}} />
        </Image>
        <Card.Body gap="2">
          <Card.Title mt="2">{title}</Card.Title>
          <Card.Description>
            {!availableForSale ? 'SOLD OUT' : formattedPrice}
          </Card.Description>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
