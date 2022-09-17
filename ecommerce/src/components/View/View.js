import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";
import "./View.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { firebaseDB } from "../../firebse/config";
import { OrderContext } from "../../store/OrderContext";

const View = () => {
  // const [userDetails, setUserDetails] = useState();
  // const [cartData, setCartData] = useState([]);
  const [qty] = useState(1);
  const { postDetails } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const { allProductDetails } = useContext(PostContext);
  // const [cartDetails, setCartDetails] = useState([]);
  const { allProduct, setAllProduct } = useContext(OrderContext);
  const userCollectionRef = collection(firebaseDB, `cart-${user.uid}`);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1050 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const updateCartCount = async (cartId, cartQty) => {
    const userDoc = doc(firebaseDB, `cart-${user.uid}`, `${cartId}`);
    const newFields = { qty: cartQty + 1 };
    await updateDoc(userDoc, newFields);
  };
  const addNewProductDetails = () => {
    addDoc(collection(firebaseDB, `cart-${user.uid}`), {
      category: postDetails.category,
      prodId: postDetails.id,
      originalPrice: postDetails.originalPrice,
      sellingPrice: postDetails.sellingPrice,
      stock: postDetails.stock,
      title: postDetails.title,
      url: postDetails.url,
      userId: postDetails.userId,
      weight: postDetails.weight,
      qty: qty,
    });
  };

  // useEffect(() => {
  const getCartDetails = async () => {
    const data = await getDocs(userCollectionRef);

    setAllProduct(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };
  getCartDetails();
  // }, []);

  // console.log(item);
  const addToCartItems = () => {
    getCartDetails();

    if (allProduct.length === 0) {
      addNewProductDetails();
    }

    allProduct.map((cartData, id) => {
      return (
        <div key={id}>
          {cartData.userId === user.uid &&
            updateCartCount(cartData.id, cartData.qty)}
        </div>
      );
    });
    allProduct.map((cartData, id) => {
      return (
        <div key={id}>
          {cartData.userId !== user.uid && addNewProductDetails()}
        </div>
      );
    });
  };

  return (
    <div className="view-parent-div">
      <div className="img-div">
        {/* {console.log("Item", item)} */}

        <img src={postDetails.url} alt="product img" />
      </div>
      <div className="product-div">
        <h2>
          <b>{postDetails.title}</b>
        </h2>
        <div className="product-price">
          <h3 className="selling-price">₹{postDetails.sellingPrice} </h3>
          <h3 className="org-price"> ₹{postDetails.originalPrice} </h3>
        </div>
        <div className="product-weight">
          <h4>{postDetails.weight}</h4>
        </div>
        <div className="add-to-cart-btn">
          <button
            className="btn-1"
            onClick={() => {
              getCartDetails();
              addToCartItems();
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <div className="similar-products">
        {allProductDetails.map((allProduct, id) => {
          return (
            <div key={id}>
              {allProduct.title !== postDetails.title ? (
                <div>
                  <h1>Similar Products</h1>
                  <div>
                    <div>
                      <Carousel responsive={responsive}>
                        <div className="card product-details" key={id}>
                          <img src={allProduct.url} alt="Avatar" />
                          <div className="container">
                            <div className="product-title">
                              <h2>
                                <b>{allProduct.title}</b>
                              </h2>
                            </div>
                            <div className="product-price">
                              <h3 className="org-price">
                                ₹{allProduct.originalPrice}
                              </h3>
                              <h3 className="selling-price">
                                ₹{allProduct.sellingPrice}
                              </h3>
                            </div>
                            <div className="add-to-cart-btn">
                              <button className="btn">Add To Cart</button>
                            </div>
                          </div>
                        </div>
                      </Carousel>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default View;
