import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, FirebaseContext } from "../../store/Context";
import "./Create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [image, setImage] = useState("");
  const { firebaseDB } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const storage = getStorage();
    const storageRef = ref(storage, `/images/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("Uploaded a blob or file!");
        console.log(url);

        addDoc(collection(firebaseDB, "products"), {
          title,
          category,
          weight,
          stock: true,
          originalPrice,
          sellingPrice,
          url,
          userId: user.uid,
        });
        Navigate("/");
      });
    });
  };

  return (
    <div>
      <div className="addprod-container">
        <form className="addprod-form">
          <p>Add Product</p>

          <label>Product Title</label>
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Product Category</label>
          <input
            type="text"
            placeholder="Product Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <label>Product Weight</label>
          <input
            type="text"
            placeholder="Product Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <label>Original Price</label>
          <input
            type="text"
            placeholder="Enter Price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
          <label>Selling Price</label>
          <input
            type="text"
            placeholder="Enter Selling Price"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
          <label>Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button onClick={handleSubmit}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
