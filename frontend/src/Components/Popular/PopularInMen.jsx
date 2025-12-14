import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Items/Item";

const PopularInMen = () => {
  const [popularMenProducts, setPopularMenProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinmen")
      .then((response) => response.json())
      .then((data) => setPopularMenProducts(data));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN MEN</h1>
      <hr />
      <div className="popular-item">
        {popularMenProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
              category={item.category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PopularInMen;
