import React, { useContext } from "react";
import { AuthContext } from "../../store/Context";
import { OrderContext } from "../../store/OrderContext";
import "./Cart.css";
import CartCard from "./CartCard";

const Cart = () => {
  const { allProduct, setAllProduct } = useContext(OrderContext);
  const { user } = useContext(AuthContext);
  const itemPrice = allProduct.reduce((a, c) => a + c.sellingPrice * c.qty, 0);
  return (
    <div>
      {allProduct.length !== 0 ? (
        <div>
          {console.log(itemPrice)}
          <div className="cart-head">Your Cart Items</div>
          <div className="allcartitems">
            {allProduct.map((item) => (
              <CartCard key={item.id} itemdata={item} userid={user.uid} />
            ))}
          </div>
          <div className="total-price">
            <h3>
              Total : <strong>₹{itemPrice}</strong>
            </h3>
          </div>
          <div className="proceed">
            <button>Proceed</button>
          </div>
        </div>
      ) : (
        "Your Cart is empty"
      )}
    </div>
  );
};

export default Cart;
