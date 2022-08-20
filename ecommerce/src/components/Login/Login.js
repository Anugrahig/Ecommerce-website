import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../store/Context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { firebaseDB } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const auth = getAuth();
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in

        console.log("Logged in");
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // alert(errorMessage);
      });
  };
  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <p>Login Account</p>

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

          <button>Login</button>
          <div>
            <span className="login-span">Don't have an Account?</span>

            <button>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
