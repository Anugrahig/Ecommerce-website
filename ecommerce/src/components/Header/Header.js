import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logos/logo.svg";
import search from "../../assets/logos/search.svg";
import account from "../../assets/logos/account.svg";
// import shoppingcart from "../../assets/logos/shopping-cart.svg";
import cart_icon from "../../assets/logos/cart_icon.svg";
import { AuthContext } from "../../store/Context";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import User from "../User/User";

const Header = () => {
  const LogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const navigate = useNavigate();
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  // console.log("Header ", user);
  return (
    <div className="header-parent-div">
      <div
        className="header-barnd-div"
        onClick={() => {
          navigate("/home");
        }}
      >
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
        {user ? (
          <div
            className="user-icon"
            onClick={() => {
              navigate("/user");
            }}
          >
            <img src={account} alt="account-logo" />
            <span className="login-div">{user.displayName}</span>
          </div>
        ) : (
          <div className="login-div">
            <Link className="login-btn" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
      {user && (
        <div onClick={LogOut} className="cart-logout">
          Logout
        </div>
      )}
      <div className="cart-logo">
        <span className="cart-icon-css">0</span>
        <img src={cart_icon} alt="cart-logo" />
      </div>
    </div>
  );
};

export default Header;
