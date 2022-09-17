import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./ProductDetails.css";

const ProductDetails = (props) => {
  const { firebaseDB } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const [allPro, setAllPro] = useState([]);
  // const { setPostDetails } = useContext(PostContext);
  const {
    postDetails,
    setPostDetails,
    allProductDetails,
    setAllProductDetails,
  } = useContext(PostContext);
  // allProductDetails,setAllProductDetails
  const navigate = useNavigate();
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
  useEffect(() => {
    // console.log(props.type);
    const path = `products-${props.type.toUpperCase()}`;
    const collectionRef = collection(firebaseDB, path);
    // console.log(props.type);

    getDocs(collectionRef).then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      setProducts(allPost);
      // setProducts(allPost);
      setAllProductDetails(allPost);
      setAllPro(allPost);
      // console.log("Uploaded....", allProductDetails);
      // console.log("allPost", products);
    });
  }, [props]);
  return (
    <div>
      <Carousel responsive={responsive}>
        {/* {console.log("Products", products)} */}
        {products.map((product, id) => {
          return (
            <div className="card product-details" key={id}>
              <img src={product.url} alt="Avatar" />
              <div
                className="container"
                onClick={() => {
                  setPostDetails(product);
                  setAllProductDetails(products);
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
                  <button className="btn">Add To Cart</button>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ProductDetails;
