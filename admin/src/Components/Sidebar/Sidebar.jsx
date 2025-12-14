import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />

          <p>Add Product</p>
        </div>
      </Link>{" "}
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />

          <p>Product List</p>
        </div>
      </Link>
      <Link to={"/all-users"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="" style={{width:"24px",height:"24px"}}/>
          <p>All Users</p>
        </div>
      </Link>

    </div>
  );
};

export default Sidebar;
