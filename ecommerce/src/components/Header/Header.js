import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logos/logo.svg";
import account from "../../assets/logos/account.svg";
// import shoppingcart from "../../assets/logos/shopping-cart.svg";
import cart_icon from "../../assets/logos/cart_icon.svg";
import { AuthContext } from "../../store/Context";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
// import User from "../User/User";
import { collection } from "firebase/firestore";
import { firebaseDB } from "../../firebse/config";
import { OrderContext } from "../../store/OrderContext";

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
  const userid = user && user.id;
  // const [user, setUser] = useState();
  // console.log("User", user.uid);
  // const { user } = useContext(AuthContext);

  const userCollectionRef = collection(firebaseDB, `cart-${userid}`);
  // const [cartDetails, setCartDetails] = useState([]);
  const { allProduct } = useContext(OrderContext);

  // useEffect(() => {
  // console.log(allProduct);
  // const getCartDetails = async () => {
  //   const data = await getDocs(userCollectionRef);
  //   setCartDetails(
  //     data.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }))
  //   );
  // };
  // getCartDetails();
  // }, []);
  // console.log(userid);
  // console.log("Header Cd ", allProduct);
  // console.log("Header ", allProduct.length);
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
      <div className="header-search"></div>
      <div className="cart-login-div">
        {user ? (
          <div
            className="user-icon"
            onClick={() => {
              navigate("/profile");
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
      <div
        className="cart-logo"
        onClick={() => {
          navigate("/cart");
        }}
      >
        <span className="cart-icon-css">{allProduct.length}</span>
        <img src={cart_icon} alt="cart-logo" />
      </div>
    </div>
  );
};

export default Header;
