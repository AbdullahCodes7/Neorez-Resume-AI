import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Icon } from "@iconify/react";
import { useGoogleAuthAvailable } from "./GoogleAuthWrapper";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = ({ ApiUrl }) => {
  const { isAvailable } = useGoogleAuthAvailable();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isAvailable) {
    return null; // Don't render the button if Google OAuth is not available
  }

  const getUserDetails = async (accessToken) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );
    const data = await response.json();
    return data;
  };

  const handleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        setLoading(true);
        const data = await getUserDetails(credentialResponse.access_token);
        const userObject = {
          googleId: data.id,
          email: data.email,
          userName: data.name,
          isVerified: data.verified_email,
          image: data.picture,
        };

        const response = await axios.post(
          `${ApiUrl}/user/loginwithgoogle`,
          userObject
        );

        if (response.data.success) {
          const user = response.data;
          const token = response.token;
          dispatch(setUser(user, token));
          toast.success("Login Successfully");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Google login error:", error);
        toast.error("Google login failed. Please try email/password.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      console.log("Login Failed");
      toast.error("Google login failed");
      setLoading(false);
    },
  });

  return (
    <button
      onClick={() => handleLogin()}
      disabled={loading}
      className="flex items-center justify-center gap-2 w-full h-[50px] border-2 border-gray-300 rounded-[10px] hover:bg-gray-50 transition"
    >
      <Icon icon="flat-color-icons:google" width="24" height="24" />
      <span className="text-gray-700 font-medium">
        {loading ? "Signing in..." : "Sign in with Google"}
      </span>
    </button>
  );
};

export default GoogleLoginButton;
