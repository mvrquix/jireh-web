import { Box, Button, Flex, Image } from "@chakra-ui/react";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RiShoppingCartFill } from "react-icons/ri";

export function ShopHeader() {
  return (
    <Flex
      justify="space-between"
      align="center"
      gap="4"
      padding="8"
      borderBottom="xs"
      borderColor="#e4e4e7"
    >
      <Box />
      <a href="/">
        <Image src="/img/shop-logo.jpg" height="80px" alt="Jireh Athletics" />
      </a>

      <DrawerRoot>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="ghost" size="lg">
            <RiShoppingCartFill />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <Button>Checkout</Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </Flex>
  );
}
