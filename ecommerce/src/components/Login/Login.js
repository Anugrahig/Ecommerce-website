import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div>
      <div className="login-container">
        <form className="login-form">
          <p>Login Account</p>

          <label>Email</label>
          <input type="email" placeholder="Email" />

          <label>Password</label>
          <input type="password" placeholder="Password" />

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
