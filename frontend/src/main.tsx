import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./common/styles/tailwind.css";
import Context from "./common/utils/config/context.tsx";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="950575847846-ngm9mu79bg2knt4ktg6b85o5sjkd09p5.apps.googleusercontent.com">
    <Context>
      <App />
    </Context>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
