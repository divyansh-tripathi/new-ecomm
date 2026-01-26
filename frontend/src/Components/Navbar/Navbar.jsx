import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { useContext, useEffect, useRef, useState } from "react";
import nav_dropdown from "../Assets/Arrow_Drop_Down_Circle-128.webp";
import { API_BASE_URL } from "../../config/api";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartitems } = useContext(ShopContext);
  const menuRef = useRef();
  const [userName, setUserName] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchUserData = async () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/getuser`, {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        });
        const data = await response.json();
        if (data.success) {
          setUserName(data.name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    menuRef.current.classList.toggle("nav-menu-visible");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" className="logo" />
        <p>SHOPPER</p>
      </div>
      {/* Hamburger Menu Icon */}
      <div
        className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/mens">
            Men
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/womens">
            Women
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <div className="nav-user-drawer-container">
            <div className="nav-user-drawer-trigger" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
              <span>{userName ? userName.split(' ')[0] : 'Loading...'}</span>
              <i className={`arrow-icon ${isDrawerOpen ? 'up' : 'down'}`}></i>
            </div>
            {isDrawerOpen && (
              <div className="nav-user-drawer">
                <p className="drawer-name">Hello, {userName || 'User'}</p>
                <hr />
                <button
                  className="drawer-logout"
                  onClick={() => {
                    localStorage.removeItem("auth-token");
                    window.location.replace("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="nav-login-btn">Login</button>
          </Link>
        )}

        <Link to="/cart" className="nav-cart-icon">
          <img src={cart_icon} alt="" />
          <div className="nav-cart-count">{getTotalCartitems()}</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
