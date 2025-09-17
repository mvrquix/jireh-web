"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  EmptyState,
  Flex,
  Image,
  Portal,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiShoppingCartFill, RiMenuFill, RiCloseFill } from "react-icons/ri";
import {
  fetchCart,
  removeProductFromCart,
  updateProductQuantityInCart,
} from "../actions/shopify-actions";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { useEventEmitter } from "../hooks/event-emitter-hook";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [cart, setCart] = useState(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { eventData } = useEventEmitter("cart-update");
  const router = useRouter();
  const pathname = usePathname();

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
    await updateProductQuantityInCart(cart.id, cartLineId, quantity);
  };

  const onRemoveItemClick = async (cartLineId) => {
    await removeProductFromCart(cart.id, cartLineId);
    getCart();
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const cartItemCount = cart?.lines.edges.length;

  return (
    <div className="header">
      <Flex justify="space-between" align="center">
        <div className="header-nav">
          <a
            className={`nav-link ${pathname === "/" && "active"}`}
            aria-current="page"
            href="/"
          >
            Home
          </a>
          <a
            className={`nav-link ${pathname === "/shop" && "active"}`}
            href="/shop"
          >
            Shop
          </a>
          <a
            className={`nav-link ${pathname === "/about" && "active"}`}
            href="/about"
          >
            About
          </a>
        </div>
        <Box>
          <Drawer.Root
            open={cartDrawerOpen}
            onOpenChange={(e) => setCartDrawerOpen(e.open)}
            size="xl"
          >
            <Drawer.Trigger asChild>
              <button type="button" className="btn btn-md text-uppercase">
                <strong>
                  Cart
                  {cart && cartItemCount > 0 && (
                    <span className="badge rounded-circle bg-dark ms-2">
                      {cartItemCount}
                    </span>
                  )}
                </strong>
              </button>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Flex justify="space-between" align="center" width="100%">
                      <Drawer.Title>Your Cart</Drawer.Title>
                      <button
                        onClick={() => setCartDrawerOpen(false)}
                        type="button"
                        className="btn btn-md bg-transparent"
                        style={{ width: "35px", height: "35px" }}
                        role="button"
                      >
                        <RiCloseFill size={25} />
                      </button>
                    </Flex>
                  </Drawer.Header>
                  <Drawer.Body className="light">
                    {cart && cart.lines.edges.length === 0 && (
                      <EmptyState.Root>
                        <EmptyState.Content>
                          <EmptyState.Indicator>
                            <RiShoppingCartFill />
                          </EmptyState.Indicator>
                          <VStack textAlign="center">
                            <EmptyState.Description>
                              Your cart is empty
                            </EmptyState.Description>
                          </VStack>
                        </EmptyState.Content>
                      </EmptyState.Root>
                    )}
                    {cart &&
                      cart.lines.edges.map((c) => {
                        const { id, merchandise, quantity, cost } = c.node;
                        const { product, image, selectedOptions } = merchandise;
                        return (
                          <Flex
                            key={id}
                            align="center"
                            justify="space-between"
                            gap="4"
                            marginBottom="8"
                          >
                            <Image
                              src={image.url}
                              rounded="md"
                              height="100px"
                              width="100px"
                            />
                            <Text>
                              {product.title} (
                              {selectedOptions &&
                                selectedOptions.map((o) => o.value).join(",")}
                              )
                              <br />
                              {currencyFormatter.format(
                                cost.totalAmount.amount
                              )}
                            </Text>
                            <Stack gap="6">
                              <NumberInputRoot
                                defaultValue={quantity}
                                onValueChange={(e) =>
                                  onItemQuantityUpdate(id, parseInt(e.value))
                                }
                              >
                                <NumberInputField />
                              </NumberInputRoot>
                              <Button
                                onClick={() => onRemoveItemClick(id)}
                                colorPalette="red"
                                variant="ghost"
                              >
                                Remove
                              </Button>
                            </Stack>
                          </Flex>
                        );
                      })}
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Flex
                      justify="space-between"
                      align="center"
                      width="100%"
                      marginBottom="25px"
                    >
                      <Text margin={0}>
                        Items in your cart will last for 1 hour.
                      </Text>
                      {cart && cart.lines.edges.length > 0 && (
                        <button
                          onClick={() => router.push(cart.checkoutUrl)}
                          className="btn btn-lg btn-outline-light"
                          style={{ width: "160px", padding: "10px 0" }}
                        >
                          Checkout
                        </button>
                      )}
                    </Flex>
                  </Drawer.Footer>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </Box>
      </Flex>
    </div>
  );
}
