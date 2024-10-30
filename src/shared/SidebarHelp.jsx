// import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// The design of this page will be
// TOP DROPDOWN - For you
// MIDDLE DROPDOWN - For others
// The second dropdown is about accessing the user of a character, if you are visiting someone else's character.
// Maybe the world version could be added, but only if this project has progressed to a sufficient point
// USER VERSION
// Type:HELP <- Other types include WORLD and HELP. Username is given
// [ABOUT]
// [FAQ]
// [RULES] <- Might be long enough to receive a dedicated sidebar
// [TERMS OF SERVICE]
// No Profile/Preference/Sign Out features here

// React states: How can I make sure the user is "logged in" or not?
// Example from https://getbootstrap.com/docs/5.3/components/navbar/#offcanvas
// This one would be brighter, also no dropdown but instead a left sidebar, named it just for consistency
const DropdownHelp = () => {
    return (
  <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: "280px", height: "100vh"}}>
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"/></svg>
        <span className="fs-4">Helpdesk</span>
    </a>
    <hr />
    <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
            <a aria-current="page" href="#">Help Page</a>
        </li>
        <hr />
        {/* List the bulletins/characters/universes */}
        {/* The userName should be the person you are viewing */}
        {/*  */}
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">About</a>
            <a className="nav-link" aria-current="page" href="#">General FAQ</a>
            <a className="nav-link" aria-current="page" href="#">Character FAQ</a>
            <a className="nav-link" aria-current="page" href="#">World FAQ</a>
            <a className="nav-link" aria-current="page" href="#">Copyright FAQ</a>
        </li>
        <hr />
        {/* Rules and Terms of Service may be on separate pages */}
        <li className="nav-item">
            <a className="nav-link" href="#">Rules</a>
            <a className="nav-link" href="#">Terms of Service</a>
        </li>
    </ul>
    </div>
  )
}

export default DropdownHelp;