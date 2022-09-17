import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import User from "./Pages/User";
import Post from "./store/PostContext";
import Users, { UserContext } from "./store/UserContext";
import React, { useContext, useEffect } from "react";
import { AuthContext, FirebaseContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import UsersDetails from "./store/UserContext";
// import UserDetails from "./components/User/UserDetails";
import PageNF from "./Pages/PageNF";
import Cart from "./Pages/Cart";
// import ProductPages from "./components/ProductPages/ProductPages";
import Posts from "./components/Posts/Posts";
import Product from "./store/OrderContext";

function App() {
  const auth = getAuth();
  const { user, setUser } = useContext(AuthContext);
  // const { firebaseDB } = useContext(FirebaseContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const uid = user.uid;

        // console.log("From App.js", uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <div>
      <Post>
        <Users>
          <Product>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create" element={<Create />} />
                <Route path="/view" element={<View />} />
                <Route path="/profile" element={<User />} />
                <Route path="/cart" element={<Cart />} />

                <Route path="*" element={<PageNF />} />
                <Route
                  path="/products-category/grocery"
                  element={<Posts type={"Grocery"} />}
                />
                <Route
                  path="/products-category/stationery"
                  element={<Posts type={"Stationery"} />}
                />
                <Route
                  path="/products-category/snacks"
                  element={<Posts type={"Snacks"} />}
                />
              </Routes>
            </Router>
          </Product>
        </Users>
      </Post>
    </div>
  );
}

export default App;
