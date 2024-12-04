import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useParams } from 'react-router-dom';

import {Outlet, Link} from "react-router-dom";
import { useState, useEffect } from 'react';

import axios from 'axios';
// import "../index.css"

// The design of this page will be
// TOP Navbar - For you
// MIDDLE Navbar - For others
// The second Navbar is about accessing the user of a character, if you are visiting someone else's character.
// Maybe the world version could be added, but only if this project has progressed to a sufficient point
// USER VERSION
// Type:USER <- Other types include WORLD and HELP. Username is given
// [USER NEWS]
// [LIST CHARACTER]
// [LIST UNIVERSE] <- May need to study about relationship between universe and character once frontend finishes
// No Profile/Preference/Sign Out features here

// React states: How can I make sure the user is "logged in" or not?
// Example from https://getbootstrap.com/docs/5.3/components/navbar/#offcanvas
// This one would be brighter, also no Navbar but instead a left sidebar, named it just for consistency


const SidebarUser = () => {
    const selectedUserId = useParams().userId;

    const [selectedUser, setSelectedUser] = useState({
        userId: undefined,
        userName: '',
        userIcon: ''
    })

    useEffect(() => {
        axios.get(`http://localhost:3000/api/users/${selectedUserId}`)
          .then(response => setSelectedUser(response.data))
          .catch(error => console.log(error.response.data))
        }, [selectedUserId]);
    console.log(selectedUser);

    return (
        <div style={{display:"flex", flexGrow:"1", flexShrink:"0", overflow:"hidden"}}>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width:"280px", minHeight:"calc(100vh - 56px)", float:"left"}}>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to={`/users/${selectedUser.userId}`}>
                            {/* Insert character icon... Or throw placeholder if there is none */}
                            {/* Code taken from https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror */}
                            <img src={`/${selectedUser.userIcon}`} onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src="/src/server/placeholder/user.png";
                                }} className="card-img-top" style={{width: "48px", height: "48px", marginRight: "16px"}}></img>
                            <span aria-current="page">{selectedUser.userName}</span>
                        </Link>
                    </li>
                    <hr />
                    {/* List the bulletins/characters/universes */}
                    {/* The userName should be the person you are viewing */}
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to={`/users/${selectedUser.userId}/bulletins`}>{selectedUser.userName}'s Bulletins</Link>
                        <Link className="nav-link" aria-current="page" to={`/users/${selectedUser.userId}/characters`}>{selectedUser.userName}'s Characters</Link>
                        {/* This page will not only list the universes you made, but all worlds you are currently in */}
                        {/* They will be divided later on */}
                        <Link className="nav-link" aria-current="page" to={`/users/${selectedUser.userId}/worlds`}>{selectedUser.userName}'s Worlds</Link>
                    </li>
                    
                    <hr />
                </ul>
            </div>
            <div style={{display:"block"}}>
                <Outlet />
            </div>
        </div>
  )
}

export default SidebarUser