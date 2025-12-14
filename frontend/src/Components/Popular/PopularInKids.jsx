import React, { useEffect, useState } from "react";
import Item from "../Items/Item";

const PopularInKids = () => {
  const [popularInKids, setPopularInKids] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinkids")
      .then((response) => response.json())
      .then((data) => setPopularInKids(data));
    console.log("Kids data Fetched");
  }, []);

  return (
     <div className="popular">
      <h1>POPULAR IN KIDS</h1>
      <hr />
      <div className="popular-item">
      {popularInKids.map((item, i) => {
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

export default PopularInKids;
