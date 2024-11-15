import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Only has top navbar, does not have any sidebar
import RootPageRoutes from "./Layouts/RootPageRoutes";
// Has a user sidebar
import UserLayoutRoutes from "./Layouts/UserLayoutRoutes";
// Has a world sidebar
import WorldLayoutRoutes from "./Layouts/WorldLayoutRoutes";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RootPageRoutes />} />
                <Route path="/user" element={<UserLayoutRoutes />} />
                <Route path="/world" element={<WorldLayoutRoutes />}/>
            </Routes>
        </Router>
    );
}

export default App;