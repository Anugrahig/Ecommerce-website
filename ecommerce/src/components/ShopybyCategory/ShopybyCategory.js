import React from "react";
import { Link } from "react-router-dom";
import "./ShopybyCategory.css";

const ShopybyCategory = () => {
  return (
    <div className="product-category">
      <Link to="/products-category/grocery">
        <button>Grocery</button>
      </Link>
      <Link to="/products-category/stationery">
        <button>Stationery</button>
      </Link>
      <Link to="/products-category/snacks">
        <button>Snacks</button>
      </Link>
    </div>
  );
};

export default ShopybyCategory;
