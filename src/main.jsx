import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-o20gmsw1qoajac0a.us.auth0.com"
    clientId="ZtOwIuxdXyiaOudXaQh2EJzfFqhLh5q9"
    authorizationParams={{
      redirect_uri: "http://localhost:5173/"
    }}
    audience="http://localhost:8000"
    scope="openid profile email"
    
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
