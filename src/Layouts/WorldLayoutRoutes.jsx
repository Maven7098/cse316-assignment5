import React from 'react';
import SidebarUser from "./SidebarUser.jsx";
import UserBulletins from "../User/UserBulletins.jsx";
import UserCharacters from "../User/UserCharacters.jsx";
import UserWorlds from "../User/UserWorlds.jsx";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
// Leave the footer for later
// import Footer from "./Footer.jsx"

function WorldLayoutRoutes({selectedWorld,currentUserId}) {
    return (
        <>
            <nav>
                {/* This website employs a dual-sidebar design. */}
                <SidebarWorld world={selectedWorld} />
            </nav>
            <Routes>
                <Route path={`worlds/${selectedWorld.worldId}`} element={<SidebarUser selectedWorld={selectedWorld} />}>
                {/* <Route index element={<Home />} /> */}
                <Route path={`worlds/${selectedWorld.worldId}`} element={<Dashboard />} />
                <Route path={`worlds/${selectedWorld.worldId}/bulletins`} element={<UserBulletins selectedWorld={selectedWorld} currentUserId={currentUserId} />} />
                <Route path={`worlds/${selectedWorld.worldId}/characters`} element={<UserCharacters selectedWorld={selectedWorld} />} />
                <Route path={`worlds/${selectedWorld.worldId}/members`} element={<UserWorlds selectedWorld={selectedWorld} />} />
                <Route path="/*" element={<ErrorPage />} />
                </Route>
            </Routes>
            {/* <footer>
                <Footer />
            </footer> */}
        </>
    )
}

export default WorldLayoutRoutes;