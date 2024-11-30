// import React from 'react';
// import SidebarWorld from "./SidebarWorld.jsx";
// import WorldMain from "../World/WorldMain.jsx";
// import WorldBulletins from "../World/WorldBulletins.jsx";
// import WorldCharacters from "../World/WorldCharacters.jsx";
// import WorldMembers from "../World/WorldMembers.jsx";
// import ErrorPage from "../ErrorPage.jsx"

// import {Routes, Route, BrowserRouter, useParams} from 'react-router-dom'
// // Leave the footer for later
// // import Footer from "./Footer.jsx"

// function WorldLayoutRoutes({currentUserId}) {
//     const selectedWorld = useParams();

//     return (
//         <>
//             <Routes>
//                 <Route path="/worlds" element={<SidebarWorld />}>
//                 {/* <Route index element={<Home />} /> */}
//                 <Route path={`worlds/:worldId`} element={<WorldMain />} />
//                 <Route path={`worlds/:worldId/bulletins`} element={<WorldBulletins currentUserId={currentUserId} />} />
//                 <Route path={`worlds/:worldId/characters`} element={<WorldCharacters selectedWorld={selectedWorld} />} />
//                 <Route path={`worlds/:worldId/members`} element={<WorldMembers />} />
//                 <Route path="/*" element={<ErrorPage />} />
//                 </Route>
//             </Routes>
//             {/* <footer>
//                 <Footer />
//             </footer> */}
//         </>
//     )
// }

// export default WorldLayoutRoutes;