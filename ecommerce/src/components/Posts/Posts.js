import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";
import "./Posts.css";

const Posts = () => {
  const { firebaseDB } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();
  useEffect(() => {
    const collectionRef = collection(firebaseDB, "products");
    getDocs(collectionRef).then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      setProducts(allPost);
      // console.log(allPost);
    });
  }, []);

  return (
    <div>
      <div className="cards">
        {/* {console.log(firebaseDB)} */}
        {products.map((product) => {
          return (
            <div className="card product-details">
              <img src={product.url} alt="Avatar" />
              <div
                className="container"
                onClick={() => {
                  setPostDetails(product);
                  navigate("/view");
                }}
              >
                <div className="product-title">
                  <h2>
                    <b>{product.title}</b>
                  </h2>
                </div>
                <div className="product-price">
                  <h3 className="org-price">₹{product.originalPrice}</h3>
                  <h3 className="selling-price">₹{product.sellingPrice}</h3>
                </div>
                <div className="add-to-cart-btn">
                  <button>Add To Cart</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
