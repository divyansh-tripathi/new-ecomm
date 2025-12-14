import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Breadcrums from "../Components/Breadcrums/Breadcrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProduct from "../Components/RelatedProduct/RelatedProduct";

const Product = () => {
  const { category, productId } = useParams(); // category from URL
  const { all_product = [] } = useContext(ShopContext);

  // Find the current product by ID
  const product = all_product.find((p) => p.id === Number(productId));

  if (!product) return <p>Loading product...</p>;

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProduct category={category} currentProductId={product.id} />
    </div>
  );
};

export default Product;
