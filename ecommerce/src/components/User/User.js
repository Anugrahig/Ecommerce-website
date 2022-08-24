import { getAuth, signOut } from "firebase/auth";
import { collection, getDoc, getDocs, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";
import { UserContext } from "../../store/UserContext";
import "./User.css";

const User = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  // const [userDetailss, setUserDetailss] = useState([]);
  // const { userDetails } = useContext(UserContext);
  const { userDetails, setUserDetails } = useContext(UserContext);
  // const { id } = userDetails;

  // console.log(user.phonenumber);
  // console.log("User ", id);
  const { firebaseDB } = useContext(FirebaseContext);
  const collectionRef = collection(firebaseDB, "users");
  const { user } = useContext(AuthContext);
  const useremail = user && user.email;

  return (
    <div className="user-parent-div">
      {userDetails ? (
        userDetails.map((user, id) => {
          return (
            <div className="user-id" key={id}>
              <div className="user-details">
                <h1>Your Account Details</h1>
                <div className="user-details-table">
                  <div className="row-1">
                    <h4>User Name : </h4>
                    <h4>{user.username}</h4>
                  </div>

                  <div className="row-2">
                    <h4>Email Address : </h4>
                    <h4>{useremail}</h4>
                  </div>

                  <div className="row-3">
                    <h4> Address : </h4>
                    <h4>{user.address}</h4>
                  </div>
                  <div className="row-4">
                    <h4>Phone Number :</h4>
                    <h4>{user.phonenumber}</h4>
                  </div>
                </div>
                <button
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        // Sign-out successful.
                        navigate("/login");
                      })
                      .catch((error) => {
                        // An error happened.
                      });
                  }}
                >
                  Logout
                </button>
              </div>
              {useremail === "admin@gmail.com" && (
                <>
                  <div className="add-products">
                    <button onClick={() => navigate("/create")}>
                      Add Product
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })
      ) : (
        <h1> No User Details Found. Login first</h1>
      )}
    </div>
  );
};

export default User;
