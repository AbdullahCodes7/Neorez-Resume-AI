import { useGoogleLogin as useGoogleLoginOriginal } from "@react-oauth/google";
import { toast } from "react-toastify";

// Safe wrapper for useGoogleLogin that handles cases when Google OAuth is not configured
export const useSafeGoogleLogin = (config) => {
  const googleClientId = import.meta.env.VITE_APP_GOOGLE_CLIENTID;
  const isValidClientId =
    googleClientId &&
    googleClientId !== "placeholder-client-id" &&
    googleClientId !== "your_google_client_id_here";

  // If Google OAuth is not properly configured, return a placeholder function
  if (!isValidClientId) {
    return () => {
      toast.error(
        "Google login is not configured. Please configure your Google OAuth Client ID in .env.local"
      );
    };
  }

  // Otherwise, use the real hook
  try {
    return useGoogleLoginOriginal(config);
  } catch (error) {
    console.error("Error initializing Google Login:", error);
    return () => {
      toast.error("Google login initialization failed. Please try email/password login.");
    };
  }
};

export default useSafeGoogleLogin;
