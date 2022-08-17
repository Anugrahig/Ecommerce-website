import React from "react";
import "./Posts.css";

const Posts = () => {
  return (
    <div>
      <div className="cards">
        <div class="card product-details">
          <img src="../../../Images/Canon.jpg" alt="Avatar" />
          <div class="container">
            <div className="product-title">
              <h2>
                <b>Milky Mist Cheese Slice</b>
              </h2>
            </div>
            <div className="product-price">
              <h3 className="org-price">₹499.00</h3>
              <h3 className="selling-price">₹449.00</h3>
            </div>
            <div className="add-to-cart-btn">
              <button>Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
      {/* 1 */}
      <div class="card product-details">
        <img src="../../../Images/Canon.jpg" alt="Avatar" />
        <div class="container">
          <div className="product-title">
            <h2>
              <b>Milky Mist Cheese Slice</b>
            </h2>
          </div>
          <div className="product-price">
            <h3 className="org-price">₹499.00</h3>
            <h3 className="selling-price">₹449.00</h3>
          </div>
          <div className="add-to-cart-btn">
            <button>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
