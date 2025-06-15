"use client";

import { useEffect, useState, use } from "react";
import {
  Box,
  Button,
  Container,
  Group,
  Heading,
  Image,
  Select,
  Stack,
  Text,
  createListCollection,
  Portal,
  Progress,
  Flex,
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
  const { handle } = use(params);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { publishEvent } = useEventEmitter("cart-update");

  useEffect(() => {
    getProductByHandle();
  }, []);

  useEffect(() => {
    if (window.rtsJs) window.rtsJs.m();
  }, [product]);

  const getProductByHandle = async () => {
    const result = await fetchProductByHandle(handle);
    setSelectedImage(result.images.edges[0]);
    setProduct(result);
  };

  const onAddToCartClick = async () => {
    const { variants } = product;
    const hasOptions = variants.edges.length > 1;
    const variant = hasOptions
      ? variants.edges.find(
          (edge) =>
            JSON.stringify(edge.node.selectedOptions) ===
            JSON.stringify(selectedOptions)
        )
      : variants.edges[0];
    await addProductToCart(variant.node.id, 1);
    publishEvent({ data: true });
  };

  const onOptionChange = (option, value) => {
    const existingOption = selectedOptions.find(o => o.name === option)
    if (existingOption) {
      setSelectedOptions(selectedOptions.map(o => {
        if (o.name === option) {
          return {
            ...o,
            value
          }
        } else {
          return o
        }
      }));
    } else {
      setSelectedOptions([...selectedOptions, { name: option, value: value }]);
    }
    
  };

  const mapOptionValueCollection = (optionValues) => {
    return createListCollection({
      items: optionValues.map((optionVal) => {
        return {
          label: optionVal.name,
          value: optionVal.name,
        };
      }),
    });
  };

  const validateSelectedOptions = () => {
    const { variants, options } = product;
    const hasOptions = variants.edges.length > 1;

    if (!hasOptions) return true;

    const optionNames = options.map((option) => option.name).join();
    const selectedOptionNames = selectedOptions
      .map((option) => option.name)
      .join();

    return optionNames === selectedOptionNames;
  };

  if (!product) {
    return (
      <div className="container-fluid">
        <Flex justify="center" align="center" height="500px">
          <Progress.Root width="360px" value={null}>
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Flex>
      </div>
    );
  }

  const { images, variants, availableForSale, options } = product;

  const variant = variants.edges[0].node;

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const hasOptions = variants.edges.length > 1;

  return (
    <Container
      paddingTop="15px"
      paddingBottom="25px"
      style={{ minHeight: "100vh" }}
    >
      <BreadcrumbRoot style={{ marginBottom: "25px" }}>
        <BreadcrumbLink href="/shop">
          <RiArrowGoBackFill /> Back to Shop
        </BreadcrumbLink>
      </BreadcrumbRoot>
      {product && (
        <Stack direction={{ base: "column", md: "row" }} wrap="wrap" gap="8">
          <Box width={{ base: "100%", lg: "48%" }}>
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
                    height={{ base: "60px", md: "100px" }}
                    cursor="pointer"
                  />
                ))}
              </Group>
            </Stack>
          </Box>

          <Box width={{ base: "100%", lg: "48%" }} paddingBottom="8">
            <Stack gap="8">
              <Heading size="xl" fontWeight="bold" color={"black"}>
                {product.title}
              </Heading>
              <Text
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              ></Text>

              {hasOptions &&
                options.map((option) => {
                  const values = mapOptionValueCollection(option.optionValues);
                  return (
                    <select onChange={(e) => onOptionChange(option.name, e.target.value)} key={option.name} className="form-select form-select-lg">
                      <option>Select a size</option>
                      {values.items.map((item) => {
                        return (
                          <option value={item.value}>{item.label}</option>
                        )
                      })}
                    </select>
                  )
                  // return (
                  //   <Select.Root
                  //     key={option.name}
                  //     value={selectedOptions?.find(
                  //       (o) => o.name === option.name
                  //     )}
                  //     onValueChange={(e) =>
                  //       onOptionChange(option.name, e.value)
                  //     }
                  //     collection={values}
                  //     size="lg"
                  //     width="320px"
                  //   >
                  //     <Select.HiddenSelect />
                  //     <Select.Label>{option.name}</Select.Label>
                  //     <Select.Control>
                  //       <Select.Trigger>
                  //         <Select.ValueText
                  //           placeholder={`Select ${option.name}`}
                  //         />
                  //       </Select.Trigger>
                  //       <Select.IndicatorGroup>
                  //         <Select.Indicator />
                  //       </Select.IndicatorGroup>
                  //     </Select.Control>
                  //     <Portal>
                  //       <Select.Positioner>
                  //         <Select.Content>
                  //           {values.items.map((item) => {
                  //             console.log(item)
                  //             return (
                  //               <Select.Item key={item.value} item={item}>
                  //                 {item.label}
                  //                 <Select.ItemIndicator />
                  //               </Select.Item>
                  //             );
                  //           })}
                  //         </Select.Content>
                  //       </Select.Positioner>
                  //     </Portal>
                  //   </Select.Root>
                  // );
                })}

              <h5 className="title" style={{color: "#000"}}>
                {!availableForSale
                  ? "SOLD OUT"
                  : currencyFormatter.format(variant.price.amount)}
              </h5>
              {availableForSale && (
                <Button
                  onClick={() => onAddToCartClick()}
                  disabled={!validateSelectedOptions()}
                  width={{ base: "100%", lg: "180px" }}
                  size="lg"
                  color="white"
                  backgroundColor="black"
                  rounded="full"
                  paddingTop="25px"
                  paddingBottom="25px"
                >
                  Add To Cart
                </Button>
              )}
            </Stack>
          </Box>
        </Stack>
      )}
    </Container>
  );
}
