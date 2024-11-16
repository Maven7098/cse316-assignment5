import React from "react";
import ReactDOM from "react-dom/client";
import RootPageRoutes from "./Layouts/RootPageRoutes";
import UserLayoutRoutes from "./Layouts/UserLayoutRoutes.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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

// const [currentUser, setCurrentUser] = React.useState(testUser);
// TODO: User should be undefined
// const [currentUser, setCurrentUser] = useState(undefined);


const router = createBrowserRouter([
  {
    path: "*",
    // I MUST pass this object elsewhere
    // since the Add World part requires to check if the selectedUser === currentUser
    element: <RootPageRoutes currentUser={testUser} />,
    children: [
      {
        path: ":userId",
        element: <UserLayoutRoutes currentUser={testUser} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
