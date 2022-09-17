import React, { useContext, useState } from "react";
import { AuthContext, FirebaseContext } from "../../store/Context";
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
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorCPassword, setErrorCPassword] = useState("");
  const { firebaseDB } = useContext(FirebaseContext);
  const auth = getAuth();
  const navigate = useNavigate();
  // const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Context ", firebaseDB);
    console.log(username);
    if (password === cpassword) {
      // console.log("Password Match");

      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          updateProfile(result.user, { displayName: username })
            .then(() => {
              addDoc(collection(firebaseDB, "users"), {
                id: result.user.uid,
                username: username,
                phonenumber: phonenumber,
                address: address,
              });
            })
            .then(() => {
              setSuccessMsg(
                "New user added successfully, You will now be automatically redirected to login page."
              );
              setUsername("");
              setPhonenumber("");
              setEmail("");
              setPassword("");
              setCpassword("");
              setAddress("");
              setErrorMsg("");
              setTimeout(() => {
                setSuccessMsg("");
                navigate("/login");
              }, 2000);
            })
            .catch((error) => {
              setErrorMsg(error.message);
              setTimeout(() => {
                setErrorMsg("");
              }, 1000);
            });
        })
        .catch((error) => {
          if (error.message === "Firebase: Error (auth/invalid-email).") {
            setErrorMsg("Please fill all required fields");
          } else if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            setErrorMsg("User already exists");
          }
        });
    } else {
      setErrorCPassword("Password Dosen't Match");
      setTimeout(() => {
        setErrorCPassword("");
      }, 4000);
    }
  };
  // const createCart = () => {

  // };

  return (
    <div>
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <p>Create Account</p>
          {successMsg && (
            <>
              <div className="success-msg">{successMsg}</div>
            </>
          )}
          {errorMsg && (
            <>
              <div className="error-msg">{errorMsg}</div>
            </>
          )}
          {errorCPassword && (
            <>
              <div className="error-msg">{errorCPassword}</div>
            </>
          )}

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

            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
