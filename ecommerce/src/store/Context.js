import { createContext, useState } from "react";
// First Context For FDB:user creation
export const FirebaseContext = createContext(null);
// Second Context Username
export const AuthContext = createContext(null);

export default function Context({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
