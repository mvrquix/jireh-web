"use server";

import { cookies } from "next/headers";

async function sendRequest({ query, variables }) {
  const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  console.log("Query:", query);
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
      body: json.data.products.edges,
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
  return sendRequest({
    query: `{
            products(sortKey: TITLE, first: 100) {
                edges{
                    node {
                      id
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
                    }
                }
            }
        }`,
  });
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
  console.log(response);
  const cartId = response.data.cart.id(await cookies()).set({
    name: "cart",
    value: cartId,
    maxAge: 10 * 24 * 60 * 60, // 10 days
  });

  return true;
}

export async function fetchCart() {
  const cartId = (await cookies()).get("cart")?.value;

  if (!cartId) return null;

  return sendRequest({
    query: `{
      cart(id: ${cartId}) {
        id
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
  });
}

export async function addProductToCart(productId, quantity) {
  const cartId = (await cookies()).get("cart")?.value;

  if (!cartId) return createCart(productId, quantity);

  return sendRequest({
    query: `{
      cartLinesAdd(
        cartId: ${cartId},
        lines: [
          {
            merchandiseId: ${productId},
            quantity: ${quantity}
          }
        ]
      ) {
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
  });
}

export async function updateProductQuantityInCart(
  cartId,
  cartLineId,
  quantity
) {
  return sendRequest({
    mutation: `{
      cartLinesUpdate(
        cartId: ${cartId}
        lines: [
          id: ${cartLineId}
          quantity: ${quantity}
        ]
      ) {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
            }
          }
        }
      }
    }`,
  });
}
