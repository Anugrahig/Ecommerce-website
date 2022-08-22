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
import { useContext, useEffect } from "react";
import { AuthContext, FirebaseContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UsersDetails from "./store/UserContext";
import UserDetails from "./components/User/UserDetails";

function App() {
  const auth = getAuth();
  const { user, setUser } = useContext(AuthContext);
  // const { firebaseDB } = useContext(FirebaseContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const uid = user.uid;

        // console.log("From App.js", user);
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
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/create" element={<Create />} />
              <Route path="/view" element={<View />} />
              <Route path="/user" element={<User />} />
              <Route path="/test" element={<UserDetails />} />
            </Routes>
          </Router>
        </Users>
      </Post>
    </div>
  );
}

export default App;
