import { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { API_BASE_URL } from "../../config/api";
import { Link } from "react-router-dom";

const CartItems = () => {
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("checkout"); // 'checkout' | 'payment-method' | 'processing' | 'success'
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(300); // 5 minutes in seconds
  const [paymentVerified, setPaymentVerified] = useState(false);

  // Card details state
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });

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

  // Check if cart is empty
  const isCartEmpty = () => {
    return getTotalCartAmount() === 0;
  };

  // Session timer countdown
  useEffect(() => {
    let interval;
    if (checkoutStep === "payment-method" && sessionTimer > 0) {
      interval = setInterval(() => {
        setSessionTimer((prev) => {
          if (prev <= 1) {
            // Timer expired
            handleSessionTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [checkoutStep, sessionTimer]);

  const handleSessionTimeout = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep("checkout");
    setSessionTimer(300);
    setPaymentMethod("");
    setToast("Payment session expired. Please try again.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePayNowClick = () => {
    setCheckoutStep("payment-method");
    setSessionTimer(300); // Reset timer
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleContinuePayment = async () => {
    if (paymentMethod === "cod") {
      // COD - Direct confirmation
      processPayment();
    } else if (paymentMethod === "card") {
      // Validate card details
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        alert("Please fill in all card details");
        return;
      }
      processPayment();
    } else if (paymentMethod === "qr") {
      // QR - Check verification
      if (!paymentVerified) {
        alert("Please verify that you have completed the payment");
        return;
      }
      processPayment();
    }
  };

  const processPayment = () => {
    setCheckoutStep("processing");
    setIsProcessing(true);
    // Demo payment processing - 2 second delay
    setTimeout(async () => {
      setPaymentSuccess(true);
      setCheckoutStep("success");

      // Clear cart after successful payment
      if (localStorage.getItem('auth-token')) {
        try {
          await fetch(`${API_BASE_URL}/clearcart`, {
            method: 'POST',
            headers: {
              'auth-token': localStorage.getItem('auth-token'),
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
      }

      // Close popup after 2 seconds
      setTimeout(() => {
        setIsCheckoutOpen(false);
        setPaymentSuccess(false);
        setIsProcessing(false);
        setCheckoutStep("checkout");
        setPaymentMethod("");
        setSessionTimer(300);
        window.location.reload();
      }, 2000);
    }, 2000);
  };

  const generateQRCode = () => {
    // Simple QR code generation using canvas
    const amount = getTotalCartAmount();
    const qrText = `UPI Payment: $${amount}`;
    return qrText;
  };

  return (
    <div className="cartitems">
      {isCartEmpty() ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/">
            <button className="shop-now-btn">Shop Now</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {all_product.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <div key={e.id}>
                  <div className="cartitems-format cartitems-format-main">
                    <img src={e.image} alt="" className="carticon-product-icon" />
                    <p data-label="Title">{e.name}</p>
                    <p data-label="Price">${e.new_price}</p>
                    <button className="cartitems-quantity">{cartItems[e.id]}</button>
                    <p data-label="Total">${e.new_price * cartItems[e.id]}</p>
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
              <button
                className="proceed-btn"
                onClick={() => {
                  if (localStorage.getItem('auth-token')) {
                    setIsCheckoutOpen(true);
                  } else {
                    window.location.replace("/login");
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
                {checkoutStep === "checkout" && (
                  <>
                    <span
                      className="checkout-close"
                      onClick={() => setIsCheckoutOpen(false)}
                    >
                      &times;
                    </span>
                    <h2>Checkout</h2>
                    <p>Total Amount: <strong>${getTotalCartAmount()}</strong></p>
                    <button className="checkout-pay-btn" onClick={handlePayNowClick}>
                      Pay Now
                    </button>
                  </>
                )}

                {checkoutStep === "payment-method" && (
                  <>
                    <span
                      className="checkout-close"
                      onClick={() => {
                        setIsCheckoutOpen(false);
                        setCheckoutStep("checkout");
                        setSessionTimer(300);
                      }}
                    >
                      &times;
                    </span>
                    <h2>Select Payment Method</h2>
                    <div className="session-timer">
                      Time remaining: {formatTime(sessionTimer)}
                    </div>

                    <div className="payment-methods">
                      <div
                        className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                        onClick={() => handlePaymentMethodSelect('cod')}
                      >
                        <input type="radio" name="payment" checked={paymentMethod === 'cod'} readOnly />
                        <label>Cash on Delivery (COD)</label>
                      </div>

                      <div
                        className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                        onClick={() => handlePaymentMethodSelect('card')}
                      >
                        <input type="radio" name="payment" checked={paymentMethod === 'card'} readOnly />
                        <label>Credit/Debit Card</label>
                      </div>

                      <div
                        className={`payment-option ${paymentMethod === 'qr' ? 'selected' : ''}`}
                        onClick={() => handlePaymentMethodSelect('qr')}
                      >
                        <input type="radio" name="payment" checked={paymentMethod === 'qr'} readOnly />
                        <label>QR Payment (UPI)</label>
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="card-form">
                        <input
                          type="text"
                          placeholder="Card Number"
                          maxLength="16"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        />
                        <div className="card-row">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength="5"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            maxLength="3"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'qr' && (
                      <div className="qr-payment">
                        <div className="qr-code-display">
                          <div className="qr-placeholder">
                            <p>QR Code</p>
                            <p className="qr-text">{generateQRCode()}</p>
                          </div>
                        </div>
                        <p className="qr-instructions">Scan this QR code with your UPI app</p>
                        <div className="payment-verification">
                          <label>
                            <input
                              type="checkbox"
                              checked={paymentVerified}
                              onChange={(e) => setPaymentVerified(e.target.checked)}
                            />
                            I have completed the payment
                          </label>
                        </div>
                      </div>
                    )}

                    {paymentMethod && (
                      <button
                        className="checkout-pay-btn"
                        onClick={handleContinuePayment}
                      >
                        Confirm Payment
                      </button>
                    )}
                  </>
                )}

                {checkoutStep === "processing" && (
                  <div className="processing-payment">
                    <h2>Processing Payment...</h2>
                    <div className="spinner"></div>
                  </div>
                )}

                {checkoutStep === "success" && (
                  <div className="payment-success">
                    <div className="success-checkmark">
                      <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                      </div>
                    </div>
                    <h2>Payment Successful!</h2>
                    <p>Thank you for your purchase.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {showToast && (
        <div className="toast">{toast}</div>
      )}
    </div>
  );
};

export default CartItems;
