import { collection, getDoc, getDocs, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";
import { UserContext } from "../../store/UserContext";
import "./User.css";

const User = () => {
  // const [userDetailss, setUserDetailss] = useState([]);
  // const { userDetails } = useContext(UserContext);
  const { userDetails, setUserDetails } = useContext(UserContext);
  // const { id } = userDetails;

  // console.log(user.phonenumber);
  // console.log("User ", id);
  const { firebaseDB } = useContext(FirebaseContext);
  const collectionRef = collection(firebaseDB, "users");
  const { user } = useContext(AuthContext);
  const uid = user && user.uid;
  useEffect(() => {
    // console.log(userDetails);
    console.log("Context", UserContext);
    // console.log(id);

    // const { userId } = postDetails;
    // console.log("UserId" + userId);
    // console.log("Postdetails" + postDetails);
    // getDocs(collectionRef, where("id", "==", uid)).then((response) => {
    //   setUserDetailss(response.docs.map((obj) => ({ ...obj.data() })));
    // console.log(userDetails);
    // console.log("address", user.address);
    // });
    console.log("User Details", userDetails);
    console.log(userDetails.id);
    console.log(uid);
  }, []);

  return (
    <div className="user-parent-div">
      {/* userDetails.id === uid && */}
      {userDetails.map((user) => (
        <div className="user-details">
          <h1>User Details</h1>
          <div className="user-details-table">
            <div className="row">
              <span>User Name : </span>
              <span>{user.username}</span>
              <span>{user.id}</span>
            </div>

            <div className="row">
              <span>Email Address : </span>
              <span></span>
            </div>
            <div className="row">
              <span>Phone Number : </span>
              <span></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
