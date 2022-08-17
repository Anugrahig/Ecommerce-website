import React from "react";
import "./Create.css";

const Create = () => {
  return (
    <div>
      <div className="addprod-container">
        <form className="addprod-form">
          <p>Add Product</p>

          <label>Product Title</label>
          <input type="text" placeholder="Product Title" />

          <label>Product Category</label>
          <input type="text" placeholder="Product Category" />
          <label>Product Weight</label>
          <input type="text" placeholder="Product Weight" />

          <label>Original Price</label>
          <input type="text" placeholder="Enter Price" />
          <label>Selling Price</label>
          <input type="text" placeholder="Enter Selling Price" />
          <label>Image</label>
          <input type="file" />

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
