import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { RouterProvider } from "react-router/dom";
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";
import { router } from "./router/router.jsx";

AOS.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="urbanist-font max-w-7xl mx-auto">
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>
    </div>
  </StrictMode>
);
