import React from 'react'
import { Routes, Route, Outlet } from "react-router-dom";

import Home from "../Home";
import Search from "../Search.jsx";

import Navbar from "./Navbar.jsx";
import NavbarGuest from "./NavbarGuest.jsx";

import UserMain from '../User/UserMain.jsx';
import UserBulletins from "../User/UserBulletins.jsx";
import UserCharacters from "../User/UserCharacters.jsx";
import UserWorlds from "../User/UserWorlds.jsx";
import Profile from "../User/Profile.jsx";

import SidebarUser from './SidebarUser.jsx';
import SidebarWorld from './SidebarWorld.jsx';

import WorldMain from '../World/WorldMain.jsx'
import WorldBulletins from '../World/WorldBulletins.jsx';
import WorldCharacters from '../World/WorldCharacters.jsx';
import WorldMembers from '../World/WorldMembers.jsx';

import ErrorPage from "../ErrorPage.jsx"

function RootPageLayoutRoutes ({currentUserId, setCurrentUserId}){
  console.log(currentUserId);
  console.log(setCurrentUserId);

  if(currentUserId != undefined){
    return (
      <>
        <Routes>
          <Route path="/" element={<Navbar currentUserId={currentUserId} setCurrentUserId={setCurrentUserId} />}>
              <Route index element={<Home />} />
                <Route path={`/search`} element={<Search />} />
              <Route path={`users/:userId`} element={<SidebarUser />}>
              {/* Hilariously, we need an index element to allow the user sidebar to render */}
                <Route index element={<UserMain currentUserId={currentUserId} />} />
                <Route path={`bulletins`} element={<UserBulletins currentUserId={currentUserId} paginationOn={true} />} />
                <Route path={`characters`} element={<UserCharacters paginationOn={true}/>} />
                <Route path={`worlds`} element={<UserWorlds currentUserId={currentUserId} paginationOn={true} />} />
              </Route>
              <Route path={`worlds/:worldId`} element={<SidebarWorld />} >
                <Route index element={<WorldMain currentUserId={currentUserId} />} />
                <Route path={`bulletins`} element={<WorldBulletins currentUserId={currentUserId} paginationOn={true} />} />
                <Route path={`characters`} element={<WorldCharacters currentUserId={currentUserId} paginationOn={true} />} />
                <Route path={`members`} element={<WorldMembers paginationOn={true} />} />
              </Route>
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
              <Route index element={<Home />} />
                <Route path={`search`} element={<Search />} />
              <Route path={`users/:userId`} element={<SidebarUser />}>
              {/* Hilariously, we need an index element to allow the user sidebar to render */}
                <Route index element={<UserMain currentUserId={currentUserId} />} />
                <Route path={`bulletins`} element={<UserBulletins currentUserId={currentUserId} paginationOn={true} />} />
                <Route path={`characters`} element={<UserCharacters paginationOn={true} />} />
                <Route path={`worlds`} element={<UserWorlds currentUserId={currentUserId} paginationOn={true} />} />
                <Route path={`profile`} element={<Profile currentUserId={currentUserId}/>}/>
              </Route>
              <Route path={`worlds/:worldId`} element={<SidebarWorld />} >
                <Route path={`bulletins`} element={<WorldBulletins currentUserId={currentUserId} paginationOn={true} />} />
                <Route path={`characters`} element={<WorldCharacters currentUserId={currentUserId}  />} />
                <Route path={`members`} element={<WorldMembers />} />
              </Route>
            <Route path="/*" element={<ErrorPage />} />
            </Route>
        </Routes>
      </>
    )
  }
}

export default RootPageLayoutRoutes