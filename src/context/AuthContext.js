import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    const storedLikes = localStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes)); // Ensure we parse it as an array
    } else {
      setLikes([]);
      localStorage.setItem("likes", JSON.stringify([]));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        setUser,
        customer,
        setCustomer,
        admin,
        setAdmin,
        likes,
        setLikes,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
