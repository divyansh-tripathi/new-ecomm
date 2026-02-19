import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  const savedCart = localStorage.getItem('guest-cart');
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  let cart = {};
  for (let index = 0; index < 301; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Persist guest cart to localStorage
  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      localStorage.setItem('guest-cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/allproducts`)
      .then((response) => response.ok ? response.json() : [])
      .then((data) => setAll_product(data))
      .catch((err) => console.error("Error fetching products:", err));

    if (localStorage.getItem('auth-token')) {
      fetch(`${API_BASE_URL}/getcart`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.text())
        .then((text) => text ? JSON.parse(text) : {})
        .then((data) => setCartItems(data))
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${API_BASE_URL}/addtocart`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "itemId": itemId }),
      })
        .then((response) => response.ok ? response.json() : { success: false })
        .then((data) => console.log(data))
        .catch((err) => console.error("Error adding to cart:", err));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem('auth-token')) {
      fetch(`${API_BASE_URL}/removefromcart`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "itemId": itemId }),
      })
        .then((response) => response.ok ? response.json() : { success: false })
        .then((data) => console.log(data))
        .catch((err) => console.error("Error removing from cart:", err));

    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartitems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartitems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
