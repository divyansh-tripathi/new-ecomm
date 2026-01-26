import React, { useEffect, useState } from "react";
import "./CSS/LatestCollection.css";
import Item from "../Components/Items/Item";
import { API_BASE_URL } from "../config/api";

const LatestCollection = () => {
    const [menProducts, setMenProducts] = useState([]);
    const [womenProducts, setWomenProducts] = useState([]);
    const [kidsProducts, setKidsProducts] = useState([]);

    useEffect(() => {
        // Fetch Men's products
        fetch(`${API_BASE_URL}/popularinmen`)
            .then((response) => response.json())
            .then((data) => setMenProducts(data));

        // Fetch Women's products
        fetch(`${API_BASE_URL}/popularinwomen`)
            .then((response) => response.json())
            .then((data) => setWomenProducts(data));

        // Fetch Kids' products
        fetch(`${API_BASE_URL}/popularinkids`)
            .then((response) => response.json())
            .then((data) => setKidsProducts(data));
    }, []);

    return (
        <div className="latest-collection-page">
            <div className="latest-collection-hero">
                <h1>Latest Collection</h1>
                <p>Discover our newest arrivals across all categories</p>
            </div>

            {/* Men Section */}
            <div className="category-section">
                <h2 className="category-title">MEN</h2>
                <div className="category-grid">
                    {menProducts.map((item) => (
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

            {/* Women Section */}
            <div className="category-section">
                <h2 className="category-title">WOMEN</h2>
                <div className="category-grid">
                    {womenProducts.map((item) => (
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

            {/* Kids Section */}
            <div className="category-section">
                <h2 className="category-title">KIDS</h2>
                <div className="category-grid">
                    {kidsProducts.map((item) => (
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
        </div>
    );
};

export default LatestCollection;
