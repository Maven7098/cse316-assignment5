import React from 'react'
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "../Layouts/Navbar.jsx";
import NavbarGuest from "./NavbarGuest.jsx";
import UserMain from '../User/UserMain.jsx';
import UserBulletins from "../User/UserBulletins.jsx";
import UserCharacters from "../User/UserCharacters.jsx";
import UserWorlds from "../User/UserWorlds.jsx";
import ErrorPage from "../ErrorPage.jsx"

function RootPageRoutes (currentUser){
  
  console.log(!(currentUser == undefined));
  console.log(currentUser);
  return (
    <>
      <nav>
          <Navbar />
      </nav>
            <Routes>
        <Route path="/" element={<Navbar currentUser={currentUser} />}>
          {/* <Route index element={<Home />} /> */}
          <Route path={`users/:userId`} element={<UserMain selectedUser={currentUser} />} />
          <Route path={`users/:userId/bulletins`} element={<UserBulletins selectedUser={currentUser} />} />
          <Route path={`users/:userId/characters`} element={<UserCharacters selectedUser={currentUser} />} />
          <Route path={`users/:userId/worlds`} element={<UserWorlds selectedUser={currentUser} />} />
          <Route path="/*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Outlet />
    </>
  )
}

export default RootPageRoutes