import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useContext, useEffect } from "react";
import { AuthContext, FirebaseContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import Post from "./store/PostContext";

function App() {
  const auth = getAuth();
  const { setUser } = useContext(AuthContext);
  // const { firebaseDB } = useContext(FirebaseContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const uid = user.uid;
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
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
