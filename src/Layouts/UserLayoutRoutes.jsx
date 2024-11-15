import React from 'react';
import SidebarUser from "./SidebarUser.jsx";
import UserBulletins from "../User/UserBulletins.jsx";
import UserCharacters from "../User/UserCharacters.jsx";
import UserWorlds from "../User/UserWorlds.jsx";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
// Leave the footer for later
// import Footer from "./Footer.jsx"

function UserLayoutRoutes({selectedUser,currentUser}) {
    return (
        <>
            <nav>
                {/* This website employs a dual-sidebar design. */}
                <SidebarUser user={selectedUser} />
            </nav>
            <Routes>
                <Route index element={<Home />} />
                <Route path={`/${selectedUser.userId}`} element={<Dashboard />} />
                <Route path={`/${selectedUser.userId}/bulletins`} element={<UserBulletin selectedUser={selectedUser} />} />
                <Route path={`/${selectedUser.userId}/characters`} element={<UserCharacters selectedUser={selectedUser} />} />
                <Route path={`/${selectedUser.userId}/worlds`} element={<UserWorlds selectedUser={selectedUser} currentUser={currentUser} />} />
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
            {/* <footer>
                <Footer />
            </footer> */}
        </>
    )
}

export default UserLayoutRoutes;