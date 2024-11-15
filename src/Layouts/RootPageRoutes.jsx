import React from 'react'
import { Outlet, Link, useNavigate, useParams,
    RouterProvider, createBrowserRouter } from "react-router-dom"
import Navbar from "./Navbar.jsx";
import NavbarGuest from "./NavbarGuest.jsx";

const RootPageRoutes = ({currentUser}) => {
  return (
    <>
    <nav>
        ({currentUser} === undefined ? <NavbarGuest /> :<Navbar />)
    </nav>
    <Routes>
        <Route index element={<Home />} />
        <Route path={`/${currentUser.userId}`} element={<Dashboard />} />
        <Route path={`/${currentUser.userId}/bulletins`} element={<UserBulletin selectedUser={currentUser} />} />
        <Route path={`/${currentUser.userId}/characters`} element={<UserCharacters selectedUser={currentUser} />} />
        <Route path={`/${currentUser.userId}/worlds`} element={<UserWorlds selectedUser={currentUser} currentUser={currentUser} />} />
        <Route path="/*" element={<ErrorPage />} />
    </Routes>
    </>
  )
}

export default RootPageRoutes