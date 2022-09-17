import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../store/Context";
import { UserContext } from "../../store/UserContext";

const UserDetails = () => {
  const { firebaseDB } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  const { setUserDetails } = useContext(UserContext);
  useEffect(() => {
    const collectionRef = collection(firebaseDB, "users");
    getDocs(collectionRef).then((snapshot) => {
      const userDetails = snapshot.docs.map((user) => {
        return {
          ...user.data(),
          id: user.id,
        };
      });
      setUsers(userDetails);
      setUserDetails(userDetails);
      // console.log(allPost);
    });
  }, []);
  return (
    <div>
      {users.map((user) => (
        <div>
          {console.log("Set", setUserDetails)}
          <h1>{user.username}</h1>
          {console.log(user)}
        </div>
      ))}
    </div>
  );
};

export default UserDetails;
