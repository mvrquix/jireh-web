"use client";

import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Circle,
  Flex,
  Float,
  Image,
  Text,
} from "@chakra-ui/react";
import {
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
import { fetchCart } from "../actions/shopify-actions";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";

export function ShopHeader() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    const result = await fetchCart();
    setCart(result);
  };

  return (
    <Flex justify="space-between" align="center" gap="4" paddingEnd="4">
      <Box />
      <a href="/">
        <Image
          src="/img/home/logo-white.png"
          width="180px"
          alt="Jireh Athletics"
        />
      </a>

      <DrawerRoot size="md">
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="ghost" size="lg">
            <RiShoppingCartFill />
            {cart && (
              <Float placement="top-start">
                <Circle size="5" bg="red" color="white">{cart.lines.edges.length}</Circle>
              </Float>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            {cart &&
              cart.lines.edges.map((c) => {
                const { id, merchandise, quantity, cost } = c.node;
                return (
                  <Flex key={id} align="center" justify="space-between" gap="4">
                    <Image
                      src={merchandise.image.url}
                      rounded="md"
                      height="100px"
                      width="100px"
                    />
                    <Text>
                      {merchandise.title}
                      <br />
                      {cost.totalAmount.amount}
                    </Text>
                    <NumberInputRoot defaultValue={quantity}>
                      <NumberInputField />
                    </NumberInputRoot>
                  </Flex>
                );
              })}
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
