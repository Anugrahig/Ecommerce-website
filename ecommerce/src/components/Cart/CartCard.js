import React from "react";
import { useState } from "react";
import "./CartCard.css";
import bin from "../../assets/logos/bin2.svg";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebse/config";
const CartCard = (props) => {
  const [prodQuantity, setProdQuantity] = useState(props.itemdata.qty);
  const salePrice = props.itemdata.sellingPrice * prodQuantity;

  const increaseQuantity = async () => {
    setProdQuantity(prodQuantity + 1);
    const itemref = doc(
      firebaseDB,
      `cart-${props.userid}`,
      `${props.itemdata.id}`
    );
    await updateDoc(itemref, { qty: prodQuantity + 1 }).then(() => {
      console.log("Changed");
    });
  };
  const decreaseQuantity = async () => {
    if (prodQuantity >= 1) {
      setProdQuantity(prodQuantity - 1);
    }

    const itemref = doc(
      firebaseDB,
      `cart-${props.userid}`,
      `${props.itemdata.id}`
    );
    await updateDoc(itemref, { qty: prodQuantity + 1 }).then(() => {
      console.log("Changed");
    });
  };
  const deleteCartItem = async () => {
    await deleteDoc(
      doc(firebaseDB, `cart-${props.userid}`, `${props.itemdata.id}`)
    ).then(() => {
      console.log("doc deleted");
    });
  };
  return (
    <div className="cart-prod-container">
      <div className="cart-prod-imgtitle">
        <div className="prod-image">
          <img alt="" src={props.itemdata.url} />
        </div>
        <div className="prod-title">{props.itemdata.title}</div>
      </div>
      <div className="prodquantity-div">
        <button onClick={increaseQuantity}>+</button>
        <p>{prodQuantity}</p>
        <button onClick={decreaseQuantity}>-</button>
      </div>
      <div className="prodprice">{salePrice}</div>
      <button className="deletebtn" onClick={deleteCartItem}>
        <img src={bin} alt="logo" />
      </button>
    </div>
  );
};

export default CartCard;
