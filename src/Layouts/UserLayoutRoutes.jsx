import React from 'react';
import SidebarUser from "./SidebarUser.jsx";
import UserMain from '../User/UserMain.jsx';
import UserBulletins from "../User/UserBulletins.jsx";
import UserCharacters from "../User/UserCharacters.jsx";
import UserWorlds from "../User/UserWorlds.jsx";
import ErrorPage from "../ErrorPage.jsx"

import {Routes, Route, BrowserRouter} from 'react-router-dom'
// Leave the footer for later
// import Footer from "./Footer.jsx"

import { useParams } from 'react-router-dom';

function UserLayoutRoutes({currentUserId}) {
    const {selectedUser}= useParams()

    return (
        <>
            <Routes>
                <Route path="/users/:userId" element={<SidebarUser selectedUser={selectedUser} />}>
                <Route path={`/users/:userId`} element={<UserMain />} />
                <Route path={`/users/:userId/bulletins`} element={<UserBulletins currentUserId={currentUserId} />} />
                <Route path={`/users/:userId/characters`} element={<UserCharacters />} />
                <Route path={`/users/:userId/worlds`} element={<UserWorlds currentUserId={currentUserId} />} />
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