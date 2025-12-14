import React, { useEffect, useState } from "react";
import "./RelatedProduct.css";
import Item from "../Items/Item";

const RelatedProduct = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!category) return;

    let url = "";
    switch (category.toLowerCase()) {
      case "men":
        url = "http://localhost:4000/popularinmen";
        break;
      case "women":
        url = "http://localhost:4000/popularinwomen";
        break;
      case "kid":
        url = "http://localhost:4000/popularinkids";
        break;
      default:
        return; // unknown category
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.id !== currentProductId); // exclude current product
        setRelatedProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [category, currentProductId]);

  if (!relatedProducts.length) return <p>No related products found.</p>;

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
