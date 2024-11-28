import React from 'react';
import SidebarUser from "./SidebarUser.jsx";
import UserBulletins from "../User/UserBulletins.jsx";
import UserCharacters from "../User/UserCharacters.jsx";
import UserWorlds from "../User/UserWorlds.jsx";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
// Leave the footer for later
// import Footer from "./Footer.jsx"

function UserLayoutRoutes({selectedUser,currentUserId}) {
    return (
        <>
            <nav>
                {/* This website employs a dual-sidebar design. */}
                <SidebarUser user={selectedUser} />
            </nav>
            <Routes>
                <Route path={`/users/${selectedUser.userId}`} element={<SidebarUser selectedUser={selectedUser} />}>
                {/* <Route index element={<Home />} /> */}
                <Route path={`users/${selectedUser.userId}`} element={<Dashboard />} />
                <Route path={`users/${selectedUser.userId}/bulletins`} element={<UserBulletins selectedUser={selectedUser} />} />
                <Route path={`users/${selectedUser.userId}/characters`} element={<UserCharacters selectedUser={selectedUser} />} />
                <Route path={`users/${selectedUser.userId}/worlds`} element={<UserWorlds selectedUser={selectedUser} currentUserId={currentUserId} />} />
                <Route path="/*" element={<ErrorPage />} />
                </Route>
            </Routes>
            {/* <footer>
                <Footer />
            </footer> */}
        </>
    )
}

export default UserLayoutRoutes;