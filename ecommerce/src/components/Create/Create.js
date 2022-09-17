import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext, FirebaseContext } from "../../store/Context";
import "./Create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");
  const navigate = useNavigate();
  const { firebaseDB } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const types = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/PNG",
  ];
  const handleProductImg = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError("");
      } else {
        setImage(null);
        setImageError("Please select a valid image file types (Png or Jpeg)");
      }
    } else {
      setImageError("please select your file");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `/images-${category.toUpperCase()}/${image.name}`
    );
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // console.log("Uploaded a blob or file!");
        // console.log(url);

        addDoc(collection(firebaseDB, `products-${category.toUpperCase()}`), {
          title,
          category,
          weight: null,
          stock: true,
          originalPrice,
          sellingPrice,
          url,
          userId: user.uid,
        });
        navigate("/");
      });
    });
  };

  return (
    <div>
      <div className="addprod-container">
        <form className="addprod-form">
          <p>Add Product</p>
          {successMsg && <div className="success-msg">{successMsg}</div>}
          {uploadError && <div className="error-msg">{uploadError}</div>}

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
          <input type="file" onChange={handleProductImg} />
          {imageError && (
            <>
              <div className="error-msg">{imageError}</div>
            </>
          )}

          <button onClick={handleSubmit}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
