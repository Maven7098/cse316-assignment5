import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {Outlet, Link} from "react-router-dom";

// This part is blank at the moment.
// import userName from 'Producer.P';
// import userIcon from './assets/ikgefu-1024x1024.jpg';

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


const SidebarUser = (selectedUser) => {
    return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: "280px", height: "100vh"}}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"/></svg>
            <span className="fs-4">User</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
                <Link to={`/${selectedUser.userId}`}>
                    <img src={selectedUser.userIcon} style={{width: "48px", height: "48px", marginRight: "16px"}}></img>
                    <a aria-current="page" href="userhome.html">{selectedUser.userName}</a>
                </Link>
            </li>
            <hr />
            {/* List the bulletins/characters/universes */}
            {/* The userName should be the person you are viewing */}
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={`/${selectedUser.userId}/bulletins`}>{selectedUser.userName}'s Bulletins</Link>
                <Link className="nav-link" aria-current="page" to={`/${selectedUser.userId}/characters`}>{selectedUser.userName}'s Characters</Link>
                {/* This page will not only list the universes you made, but all worlds you are currently in */}
                {/* They will be divided later on */}
                <Link className="nav-link" aria-current="page" to={`/${selectedUser.userId}/worlds`}>{selectedUser.userName}'s Worlds</Link>
            </li>
            
            <hr />
            {/* List drawings and writings irrespective of universe */}
            {/* Not thinking of implement at this point: Marked as "BEYOND CSE316" */}
            {/* <li className="nav-item">
                <a className="nav-link" href="#">{selectedUser.userName}'s Drawings</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">{selectedUser.userName}'s Writings</a>
            </li> */}
            <hr />
            {/* Other actions with your profile */}
            {/* Currently, Profiles do not have extra user data. Marked as "BEYOND CSE316" */}
            {/* <li className="nav-item">
                When viewing other users, only Profile remains, the other 2 options are disabled
                <a className="Navbar-item" href="#">{selectedUser.userName}'s Profile</a>
            </li> */}
        </ul>
    </div>
  )
}

export default SidebarUser