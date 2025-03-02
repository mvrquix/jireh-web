"use client";

import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Circle,
  EmptyState,
  Flex,
  Float,
  Image,
  Stack,
  Text,
  VStack,
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
import { fetchCart, removeProductFromCart, updateProductQuantityInCart } from "../actions/shopify-actions";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { useEventEmitter } from "../hooks/event-emitter-hook";

export function ShopHeader() {
  const [cart, setCart] = useState(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const { eventData } = useEventEmitter("cart-update");

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (eventData) {
      getCart();
      setCartDrawerOpen(true);
    }
  }, [eventData]);

  const getCart = async () => {
    const result = await fetchCart();
    setCart(result);
  };

  const onItemQuantityUpdate = async (cartLineId, quantity) => {
    await updateProductQuantityInCart(cart.id, cartLineId, quantity)
  }

  const onRemoveItemClick = async (cartLineId) => {
    await removeProductFromCart(cart.id, cartLineId)
    getCart()
  }

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Flex
      justify="space-between"
      align="center"
      gap="4"
      paddingStart="10"
      paddingEnd="10"
    >
      <a href="/">
        <Image
          src="/img/home/logo-black.png"
          width="180px"
          alt="Jireh Athletics"
        />
      </a>

      <DrawerRoot open={cartDrawerOpen} onOpenChange={(e) => setCartDrawerOpen(e.open)} size="md">
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="ghost" size="lg">
            <RiShoppingCartFill />
            {(cart && cart.lines.edges.length > 0) && (
              <Float placement="top-start">
                <Circle size="5" bg="red" color="white">
                  {cart.lines.edges.length}
                </Circle>
              </Float>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            {(cart && cart.lines.edges.length === 0) &&
              <EmptyState.Root>
                <EmptyState.Content>
                  <EmptyState.Indicator>
                    <RiShoppingCartFill />
                  </EmptyState.Indicator>
                  <VStack textAlign="center">
                    <EmptyState.Description>Your cart is empty</EmptyState.Description>
                  </VStack>
                </EmptyState.Content>
              </EmptyState.Root>
            }
            {cart &&
              cart.lines.edges.map((c) => {
                const { id, merchandise, quantity, cost } = c.node;
                return (
                  <Flex
                    key={id}
                    align="center"
                    justify="space-between"
                    gap="4"
                    marginBottom="8"
                  >
                    <Image
                      src={merchandise.image.url}
                      rounded="md"
                      height="100px"
                      width="100px"
                    />
                    <Text>
                      {merchandise.product.title}
                      <br />
                      {currencyFormatter.format(cost.totalAmount.amount)}
                    </Text>
                    <Stack gap="6">
                      <NumberInputRoot defaultValue={quantity} onValueChange={(e) => onItemQuantityUpdate(id, parseInt(e.value))}>
                        <NumberInputField />
                      </NumberInputRoot>
                      <Button onClick={() => onRemoveItemClick(id)} colorPalette="red" variant="ghost">Remove</Button>
                    </Stack>
                  </Flex>
                );
              })}
          </DrawerBody>
          <DrawerFooter>
            {(cart && cart.lines.edges.length > 0)&& (
              <Button rounded="full" asChild>
                <a href={cart.checkoutUrl}>Checkout</a>
              </Button>
            )}
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </Flex>
  );
}
