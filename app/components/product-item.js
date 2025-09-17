import NextImage from "next/image";
import { useRouter } from "next/navigation";

export default function ProductItem({ product }) {
  const router = useRouter();
  const {
    id,
    availableForSale,
    handle,
    title,
    featuredImage,
    priceRange,
    variants,
  } = product.node;
  const variantId = variants.edges[0].node.id;
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formattedPrice = currencyFormatter.format(
    priceRange.minVariantPrice.amount
  );
  return (
    <div className="shop-item col-lg-4" style={{ cursor: "pointer" }}>
      <a
        onClick={() => router.push(`/shop/${handle}`)}
        className="shop-item-thumbnail"
      >
        <NextImage
          src={featuredImage.url}
          alt={title}
          width={610}
          height={330}
          style={{ width: "100%" }}
        />
      </a>
      <div className="shop-item-details">
        <a onClick={() => router.push(`/shop/${handle}`)}>
          <h5 className="shop-item-name">
            {title}{" "}
            {!availableForSale && (
              <span className="shop-item-sold-out"> Sold out</span>
            )}
          </h5>
        </a>
      </div>
    </div>
  );
}
