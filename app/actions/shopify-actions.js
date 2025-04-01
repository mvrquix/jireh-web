"use server";

import { cookies } from "next/headers";

async function sendRequest({ query, variables }) {
  const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: { query, variables } && JSON.stringify({ query, variables }),
    });
    const json = await response.json();
    if (json.errors) {
      console.error("Error: ", json.errors[0]);
      return {
        error: "Unexpected error",
      };
    }

    return {
      status: response.status,
      body: json.data,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
    };
  }
}

export async function fetchAllProducts() {
  const response = await sendRequest({
    query: `{
            products(sortKey: TITLE, first: 100) {
              edges{
                node {
                  id
                  availableForSale
                  handle
                  title
                  description
                  featuredImage {
                    url
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }
              }
            }
        }`,
  });
  return response.body.products.edges;
}

export async function fetchProductByHandle(handle) {
  const response = await sendRequest({
    query: `
      query($handle: String) {
        product(handle: $handle) {
          id
          availableForSale
          title
          description
          images(first: 4) {
            edges {
              node {
                id
                url
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                price {
                  amount
                }
              }
            }
          }
          options(first: 10) {
            id
            name
            optionValues {
              firstSelectableVariant {
                id
                image {
                  url
                }
                price {
                  amount
                }
              }
              id
              name
            }
          }
        }
      }`,
    variables: {
      handle: handle,
    },
  });
  return response.body.product;
}

async function createCart(productId, quantity) {
  const response = await sendRequest({
    query: `
      mutation cartCreate($input: CartInput) {
        cartCreate(input: $input) {
          cart {
            id
            createdAt
            updatedAt
            lines(first: 10) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }`,
    variables: {
      input: {
        buyerIdentity: {
          countryCode: "US",
        },
        lines: [
          {
            merchandiseId: productId,
            quantity: quantity,
          },
        ],
      },
    },
  });
  var cart = response.body.cartCreate.cart;
  const cookieStore = await cookies();
  cookieStore.set({
    name: "cart",
    value: cart["id"],
    maxAge: 60 * 60, // 1 hour
  });

  return true;
}

export async function fetchCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cart")?.value;

  if (!cartId) return null;

  const response = await sendRequest({
    query: `
      query($id: ID!) {
        cart(id: $id) {
            id
            checkoutUrl
            createdAt
            updatedAt
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  cost {
                    amountPerQuantity {
                      amount
                      currencyCode
                    }
                    subtotalAmount {
                      amount
                      currencyCode
                    }
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      image {
                        url
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
              nodes {
                id
              }
            }
          }
      }`,
    variables: {
      id: cartId,
    },
  });
  return response.body.cart;
}

export async function addProductToCart(productId, quantity) {
  const cartId = (await cookies()).get("cart")?.value;

  if (!cartId) return createCart(productId, quantity);

  return await sendRequest({
    query: `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(
          cartId: $cartId,
          lines: $lines ) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }`,
    variables: {
      cartId: cartId,
      lines: [
        {
          merchandiseId: productId,
          quantity: quantity,
        },
      ],
    },
  });
}

export async function updateProductQuantityInCart(
  cartId,
  cartLineId,
  quantity
) {
  return await sendRequest({
    query: `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!){
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }`,
    variables: {
      cartId: cartId,
      lines: [
        {
          id: cartLineId,
          quantity: quantity,
        },
      ],
    },
  });
}

export async function removeProductFromCart(cartId, cartLineId) {
  return await sendRequest({
    query: `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!){
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
        }
      }
    }`,
    variables: {
      cartId: cartId,
      lineIds: [cartLineId],
    },
  });
}
