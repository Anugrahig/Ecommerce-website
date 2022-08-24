import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext, FirebaseContext } from "./Context";
import { auth } from "../firebse/config";
export const UserContext = createContext(null);
function UsersDet({ children }) {
  const [userDetails, setUserDetails] = useState([]);
  const { firebaseDB } = useContext(FirebaseContext);
  // const { user } = useContext(AuthContext);

  // console.log("UserContext", user);
  useEffect(() => {
    auth.onAuthStateChanged((userlogged) => {
      if (userlogged) {
        const getUser = async () => {
          const q = query(
            collection(firebaseDB, "users"),
            where("id", "==", userlogged.uid)
          );
          const data = await getDocs(q);
          setUserDetails(
            data.docs.map((doc) => ({
              ...doc.data(),
            }))
          );
        };
        getUser();
      } else {
        setUserDetails(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}
export default UsersDet;
