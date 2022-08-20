import { collection, getDocs, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";
import "./View.css";

const View = () => {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebaseDB } = useContext(FirebaseContext);
  const collectionRef = collection(firebaseDB, "users");
  useEffect(() => {
    // const { userId } = postDetails;
    // console.log("UserId" + userId);
    // getDocs(collectionRef, where("id", "==", userId)).then((response) => {
    //   setUserDetails(response.docs.map((obj) => ({ ...obj.data() })));
    // });
    // console.log("UserDetails Name: " + userDetails);
  }, []);

  return (
    <div className="view-parent-div">
      <div className="img-div">
        {console.log(postDetails)}
        {/* <img src="../../../public/Images/NIKON D5600.jpg" alt="product img" /> */}
        <img src={postDetails.url} alt="product img" />
      </div>
      <div className="product-div">
        <h2>
          {/* <b>2 MIN Dosa & Idly Batter 1Ltr (Dosa mavu)</b> */}
          <b>{postDetails.title}</b>
        </h2>
        <div className="product-price">
          <h3 className="selling-price">₹{postDetails.sellingPrice} </h3>
          <h3 className="org-price"> ₹{postDetails.originalPrice} </h3>
        </div>
        <div className="product-weight">
          <h4>{postDetails.weight}</h4>
        </div>
      </div>
    </div>
  );
};

export default View;
