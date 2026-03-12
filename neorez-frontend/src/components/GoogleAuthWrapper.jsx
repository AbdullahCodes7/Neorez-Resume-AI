import React, { createContext, useContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Create context to track if Google OAuth is available
const GoogleAuthContext = createContext({ isAvailable: false });

export const useGoogleAuthAvailable = () => {
  return useContext(GoogleAuthContext);
};

// Safe wrapper for GoogleOAuthProvider that handles initialization errors
export const GoogleAuthWrapper = ({ children }) => {
  const googleClientId = import.meta.env.VITE_APP_GOOGLE_CLIENTID;
  const isValidClientId =
    googleClientId &&
    googleClientId !== "placeholder-client-id" &&
    googleClientId !== "your_google_client_id_here";

  if (!isValidClientId) {
    if (!googleClientId) {
      console.warn(
        "Google OAuth Client ID is not configured. " +
          "Please add VITE_APP_GOOGLE_CLIENTID to your .env.local file. " +
          "Get it from Google Cloud Console: https://console.cloud.google.com"
      );
    }
    // Render without Google OAuth provider, but provide context
    return (
      <GoogleAuthContext.Provider value={{ isAvailable: false }}>
        {children}
      </GoogleAuthContext.Provider>
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <GoogleAuthContext.Provider value={{ isAvailable: true }}>
        {children}
      </GoogleAuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthWrapper;
