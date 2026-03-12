import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const logintoken = JSON.parse(user);

    if (!logintoken) {
      // If no user info, redirect to login page
      navigate("/signin");
    } else {
      // If user info exists, update state to allow rendering the children
      setIsUserLoggedIn(true);
    }
  }, [navigate]);

  // Ensure this is rendered only after verifying user status
  if (!isUserLoggedIn) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
