import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FirebaseContext } from "../../store/Context";
import ProductDetails from "../ProductPages/ProductDetails";
const Slider = (props) => {
  const { firebaseDB } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // console.log(props.type);
    // const path = `products-${props.type.toUpperCase()}`;
    // const collectionRef = collection(firebaseDB, path);
    // console.log(props.type);
    // getDocs(collectionRef).then((snapshot) => {
    //   const allPost = snapshot.docs.map((product) => {
    //     return {
    //       ...product.data(),
    //       id: product.id,
    //     };
    //   });
    //   setProducts(allPost);
    //   console.log(allPost);
    // });
  }, [props]);

  return (
    <>
      <ProductDetails type={"Grocery"} />
      <ProductDetails type={"Stationery"} />
      <ProductDetails type={"Snacks"} />
    </>
  );
};

export default Slider;
