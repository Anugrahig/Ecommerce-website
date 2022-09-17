import { createContext, useState } from "react";

export const PostContext = createContext(null);
function Post({ children }) {
  const [postDetails, setPostDetails] = useState("");
  const [allProductDetails, setAllProductDetails] = useState("");
  return (
    <PostContext.Provider value={{ postDetails, setPostDetails,allProductDetails,setAllProductDetails }}>
      {children}
    </PostContext.Provider>
  );
}
export default Post;
