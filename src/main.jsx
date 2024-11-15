import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import RootPageRoutes from "./Layouts/RootPageRoutes.jsx";

const testUser = {
  userId: 0,
  userName: "Marlow58",
  userPasswd: "s0mp0n9u1n",
  userIcon: "./assets/react.svg",
  userEmail: "marlow58.pseudoartist.com",
  userBulletins: "",
  userWorlds: "",
  userCharacters: ""
};

const router = createBrowserRouter([
  {
    path: "*",
    // I MUST pass this object elsewhere
    // since the Add World part requires to check if the selectedUser === currentUser
    element: <RootPageRoutes currentUser={testUser} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
