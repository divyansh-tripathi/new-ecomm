import React, { useEffect, useState } from "react";
import "./RelatedProduct.css";
import Item from "../Items/Item";
import { API_BASE_URL } from "../../config/api";

const RelatedProduct = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!category) return;

    let url = "";
    switch (category.toLowerCase()) {
      case "men":
        url = `${API_BASE_URL}/popularinmen`;
        break;
      case "women":
        url = `${API_BASE_URL}/popularinwomen`;
        break;
      case "kid":
        url = `${API_BASE_URL}/popularinkids`;
        break;
      default:
        return;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.id !== currentProductId);
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
