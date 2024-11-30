import React from "react";
import ReactDOM from "react-dom/client";
import RootPageLayoutRoutes from "./Layouts/RootPageLayoutRoutes.jsx";
import UserLayoutRoutes from "./Layouts/UserLayoutRoutes.jsx";
import WorldLayoutRoutes from "./Layouts/WorldLayoutRoutes.jsx";

import {  createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    // I MUST pass this object elsewhere
    // since the Add World part requires to check if the selectedUser === currentUserId
    element: <RootPageLayoutRoutes />,
    children: [
      {
        path: ":userId",
        element: <UserLayoutRoutes />,
      },
      {
        path: ":worldId",
        element: <WorldLayoutRoutes />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);  