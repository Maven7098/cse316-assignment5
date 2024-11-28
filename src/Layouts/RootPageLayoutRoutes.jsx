import React from 'react'
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import NavbarGuest from "./NavbarGuest.jsx";
import UserMain from '../User/UserMain.jsx';
import UserBulletins from "../User/UserBulletins.jsx";
import UserCharacters from "../User/UserCharacters.jsx";
import UserWorlds from "../User/UserWorlds.jsx";
import ErrorPage from "../ErrorPage.jsx"

function RootPageLayoutRoutes ({currentUserId, setCurrentUserId}){
  console.log(currentUserId);
  console.log(setCurrentUserId);
  if(currentUserId != undefined){
    return (
      <>
        <Routes>
          <Route path="/" element={<Navbar currentUserId={currentUserId} setCurrentUserId={setCurrentUserId} />}>
            {/* <Route index element={<Home />} /> */}
              <Route path={`users/:userId`} element={<UserMain selectedUser={currentUserId} />} />
              <Route path={`users/:userId/bulletins`} element={<UserBulletins selectedUser={currentUserId} />} />
              <Route path={`users/:userId/characters`} element={<UserCharacters selectedUser={currentUserId} />} />
              <Route path={`users/:userId/worlds`} element={<UserWorlds selectedUser={currentUserId} />} /> 
            <Route path="/*" element={<ErrorPage />} />
          </Route>
        </Routes>
        <Outlet />
      </>
    )
  }
  else{
    return(
      <>
        <Routes>
            <Route path="/" element={<NavbarGuest setCurrentUserId={setCurrentUserId} />}>
              {/* <Route index element={<Home />} /> */}
              <Route path="/*" element={<ErrorPage />} />
            </Route>
        </Routes>
      </>
    )
  }
}

export default RootPageLayoutRoutes