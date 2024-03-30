import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./common/styles/tailwind.css";
import Context from "./common/utils/config/context.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store, { persistor } from './Redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from "sonner";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="950575847846-ngm9mu79bg2knt4ktg6b85o5sjkd09p5.apps.googleusercontent.com">
        <Context>
        <Toaster richColors position="top-left" /> 
          <App />
        </Context>
      </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
