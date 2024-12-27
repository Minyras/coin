/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ allowedRole }) => {
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (
        decoded.exp < currentTime ||
        (allowedRole && decoded.role !== allowedRole)
      ) {
        localStorage.removeItem("authToken");
        setIsAuthorized(false);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("authToken");
      setIsAuthorized(false);
    }
  }, [allowedRole]);

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
