import React from "react";
import "./Header.css";
import logo from "../../assets/logos/logo.svg";
import search from "../../assets/logos/search.svg";
import account from "../../assets/logos/account.svg";
// import shoppingcart from "../../assets/logos/shopping-cart.svg";
import cart_icon from "../../assets/logos/cart_icon.svg";

const Header = () => {
  return (
    <div className="header-parent-div">
      <div className="header-barnd-div">
        <img className="brand-logo" src={logo} alt="brand-log" />
      </div>
      <div className="header-search">
        <div className="search-input">
          <input type="text" placeholder="Search for products" />
        </div>
        <div className="search-action">
          <img src={search} alt="search-logo" />
        </div>
      </div>
      <div className="cart-login-div">
        {/* <div className="login-div">Login</div> */}
        <div className="user-icon">
          <img src={account} alt="account-logo" />
        </div>
      </div>
      <div className="cart-logo">
        <span className="cart-icon-css">0</span>
        <img src={cart_icon} alt="cart-logo" />
      </div>
    </div>
  );
};

export default Header;
