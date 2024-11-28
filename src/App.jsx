import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import setAuthToken from './setAuthToken';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Only has top navbar, does not have any sidebar
import RootPageLayoutRoutes from "./Layouts/RootPageLayoutRoutes";
// Has a user sidebar
import UserLayoutRoutes from "./Layouts/UserLayoutRoutes";
// Has a world sidebar
import WorldLayoutRoutes from "./Layouts/WorldLayoutRoutes";

export default function App() {
    const [currentUserId, setCurrentUserId] = useState();

    const accessToken = Cookies.get("accessToken");
    const currentUser = Cookies.get("currentUser");
    console.log(currentUser);

    // Maybe not the best idea, but I had to use useEffect to only update the user whenever a new user Cookie is registered
    if(accessToken && currentUser != "undefined"){
        setAuthToken(accessToken);
        // In the event you have a cookie, but not state (such as in window refresh), grab state from cookie
        useEffect(() => {
            setCurrentUserId(currentUser);
        }, [currentUser])
    }
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RootPageLayoutRoutes currentUserId={currentUserId} setCurrentUserId={setCurrentUserId} />} />
                <Route path="/users" element={<UserLayoutRoutes />} />
                <Route path="/worlds" element={<WorldLayoutRoutes />}/>
            </Routes>
        </Router>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);