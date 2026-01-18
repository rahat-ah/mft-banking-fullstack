import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axiosRoute";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [officerId,setOfficerId] = useState(null);
  const location = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/is-auth");
        if (res.data.success) {
          setOfficerId(res.data.officerId)
          setIsAuth(true);
        }
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ isAuth, loading,setIsAuth , officerId }}>
      {children}
    </AuthContext.Provider>
  );
};
