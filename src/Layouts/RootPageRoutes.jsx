import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Layouts/Navbar.jsx";
import NavbarGuest from "./NavbarGuest.jsx";
import UserMain from '../User/UserMain.jsx';
import UserBulletins from "../User/UserBulletins.jsx";
import UserCharacters from "../User/UserCharacters.jsx";
import UserWorlds from "../User/UserWorlds.jsx";
import ErrorPage from "../ErrorPage.jsx"

function RootPageRoutes (currentUser){
  console.log(currentUser);
  return (
    <>
      <nav>
          (currentUser === undefined ? <NavbarGuest /> :<Navbar />)
      </nav>
      // IF current user is undefined
      (!(currentUser == undefined) && {
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* <Route index element={<Home />} /> */}
          <Route path={`/${currentUser.userId}`} element={<UserMain />} />
          <Route path={`/${currentUser.userId}/bulletins`} element={<UserBulletins />} />
          <Route path={`/${currentUser.userId}/characters`} element={<UserCharacters />} />
          <Route path={`/${currentUser.userId}/worlds`} element={<UserWorlds />} />
          <Route path="/*" element={<ErrorPage />} />
        
        </Route>
      </Routes>
      })
    </>
  )
}

export default RootPageRoutes