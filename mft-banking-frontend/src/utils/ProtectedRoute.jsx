import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contextApi/authContext";
import SubmitLoder from "./SubmitLoder";

export default function ProtectedRoute({ children }) {
  const { isAuth, loading } = useContext(AuthContext);

  if (loading) return <SubmitLoder isOpen={loading} />;

  if (!isAuth) {
    return <Navigate to="/banking-login" replace />;
  }

  return children;
}
