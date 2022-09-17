import { createContext, useState } from "react";

export const OrderContext = createContext(null);
function Product({ children }) {
  const [allProduct, setAllProduct] = useState([]);

  return (
    <OrderContext.Provider value={{ allProduct, setAllProduct }}>
      {children}
    </OrderContext.Provider>
  );
}
export default Product;
