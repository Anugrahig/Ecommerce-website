import React from "react";
import "./Signup.css";

const Signup = () => {
  return (
    <div>
      <div className="signup-container">
        <form className="signup-form">
          <p>Create Account</p>

          <label>Name</label>
          <input type="text" placeholder="Name" />

          <label>Mobile Number</label>
          <input type="tel" placeholder="Mobile Number" />

          <label>Email</label>
          <input type="email" placeholder="Email" />

          <label>Password</label>
          <input type="password" placeholder="Password" />
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm Password" />

          <label>Address</label>
          <textarea className="address" placeholder="Address"></textarea>
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
