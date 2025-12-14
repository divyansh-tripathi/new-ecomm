import { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const [toast, setToast] = useState(""); // Toast message
const [showToast, setShowToast] = useState(false);

  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // Popup state

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let total = 0;
    all_product.forEach((e) => {
      if (cartItems[e.id] > 0) {
        total += e.new_price * cartItems[e.id];
      }
    });
    return total;
  };

  return (
    
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
        {showToast && (
  <div className="toast">{toast}</div>
)}
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          {/* Proceed to Checkout Button */}
          {/* Proceed to Checkout Button */}
<button
  className="proceed-btn"
  onClick={() => {
    if (getTotalCartAmount() === 0) {
      setToast("Your cart is empty! Please add products to proceed.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } else {
      setIsCheckoutOpen(true);
    }
  }}
>
  PROCEED TO CHECKOUT
</button>




        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>

      {/* Checkout Popup */}
      {isCheckoutOpen && (
        <div className="checkout-popup-overlay">
          <div className="checkout-popup">
            <span
              className="checkout-close"
              onClick={() => setIsCheckoutOpen(false)}
            >
              &times;
            </span>
            <h2>Checkout</h2>
            <p>Total Amount To Pay: <strong>${getTotalCartAmount()}</strong></p>
            <button className="checkout-pay-btn">Pay Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
