// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(-1);
  const [userName, setUserName] = useState("");

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUserId(userData.id);
    setUserName(userData.user_name);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/api/auth/status");
        if (response.data[0].id) {
          console.log("tuukasitayo-");
          await setCurrentUser(response.data[0]);
          await handleLoginSuccess(response.data[0]);
        }
      } catch (error) {
        console.error("Authentication check failed", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    userId,
    setUserId,
    userName,
    setUserName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserId] = useState(-1);
//   const [userName, setUserName] = useState('');

//   const login = () => {
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     setUserName('');
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, userId, setUserId, userName, setUserName }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext) ;
