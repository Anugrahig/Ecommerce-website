import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { FirebaseContext } from "./Context";

export const UserContext = createContext(null);
function UsersDet({ children }) {
  const [userDetails, setUserDetails] = useState([]);
  const { firebaseDB } = useContext(FirebaseContext);
  useEffect(() => {
    const collectionRef = collection(firebaseDB, "users");
    getDocs(collectionRef).then((snapshot) => {
      const userData = snapshot.docs.map((user) => {
        return {
          ...user.data(),
        };
      });
      // userDetails = userData;
      // id: user.id,
      setUserDetails(userData);
      // setUserDetails(userDetails);
      // console.log(allPost);
    });
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}
export default UsersDet;
