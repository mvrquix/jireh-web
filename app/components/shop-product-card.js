import { useRouter } from "next/navigation";
import { Box, Button, Card, Image, Skeleton } from "@chakra-ui/react";
import { addProductToCart } from "../actions/shopify-actions";

export function ShopProductCard({ product }) {
  const router = useRouter();
  const { id, title, description, featuredImage, priceRange } = product;
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  const formattedPrice = currencyFormatter.format(priceRange.minVariantPrice.amount)

  const onAddToCartClick = async (id) => {
    // const result = await addProductToCart(id, 1)
    // console.log(result)
  }

  return (
    <Box
      width={{ base: "100%", md: "49%" }}
      cursor="pointer"
    >
      <Card.Root width="100%" border="0">
        <Image src={featuredImage.url} alt={title} />
        {/* <Skeleton height="400px" /> */}
        <Card.Body gap="2">
          <Card.Title mt="2">{title}</Card.Title>
          <Card.Description>
            {formattedPrice}
          </Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-start ">
          <Button onClick={() => onAddToCartClick(id)} variant="solid" size="xs" rounded="full">
            Add to Cart 
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}
