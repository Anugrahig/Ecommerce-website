import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../store/Context";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [address, setAddress] = useState("");
  const { firebaseDB } = useContext(FirebaseContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firebaseDB);
    console.log(username);
    if (password === cpassword) {
      console.log("Password Match");
    } else {
      console.log("Password Not Match");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, { displayName: username }).then(() => {
          addDoc(collection(firebaseDB, "users"), {
            id: result.user.uid,
            username: username,
            phonenumber: phonenumber,
            address: address,
          }).then(() => {
            navigate("/login");
          });
        });
        // Signed in
        const user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    // };
  };
  // useEffect(() => {
  //   if (password === cpassword) {
  //     console.log("Password Match");
  //   } else {
  //     console.log("Password Not Match");
  //   }
  // }, []);

  return (
    <div>
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <p>Create Account</p>

          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Mobile Number</label>
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />

          <label>Address</label>
          <textarea
            className="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          <button type="submit">Sign up</button>
          <div>
            <span className="signup-span">Already have an Account?</span>

            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
