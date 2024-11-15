// import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// This part is blank at the moment.

// The design of this page will be
// TOP Navbar - For you
// MIDDLE Navbar - For others
// The second Navbar is about accessing the user of a character, if you are visiting someone else's character.
// Maybe the world version could be added, but only if this project has progressed to a sufficient point
// WORLD VERSION
// Type:WORLD <- Other types include WORLD and HELP. Username is given
// [WORLD NEWS]
// [LIST CHARACTER]
// [LIST MEMBERS] <- May need to study about relationship between universe and character once frontend finishes
// <br />
// [LIST ART]
// [LIST WRITING]
// No Profile/Preference/Sign Out features here

// React states: How can I make sure the user is "logged in" or not?
// Example from https://getbootstrap.com/docs/5.3/components/navbar/#offcanvas
// This one would be brighter, also no Navbar but instead a left sidebar, named it just for consistency
const NavbarWorld = ({worldName, worldIcon}) => {
    return (
  <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: "280px", height: "100vh"}}>
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"/></svg>
        <span className="fs-4">World</span>
    </a>
    <hr />
    <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
            <img src={worldIcon} style={{width: "48px", height: "48px", marginRight: "16px"}}></img>
            <a aria-current="page" href="#">{worldName}</a>
        </li>
        <hr />
        {/* List the bulletins/characters/members of the world */}
        {/* The worldName should be the world you are viewing */}
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">Bulletins</a>
            <a className="nav-link" aria-current="page" href="#">Characters</a>
            <a className="nav-link" aria-current="page" href="#">Members</a>
            {/* At this point, I cannot afford to add direct messaging to world members. That would be CSE416 */}
        </li>
        <hr />
        {/* List drawings and writings irrespective of authors */}
        <li className="nav-item">
            <a className="nav-link" href="#">Drawings</a>
            <a className="nav-link" href="#">Writings</a>
        </li>
        <hr />
        {/* Other actions with your profile */}
        {/* <li className="nav-item"> */}
            {/* It is unclear if a World should have a profile for logging information */}
            {/* <a className="Navbar-item" href="#">{worldName}'s Profile</a>
        </li> */}
    </ul>
    </div>
  )
}

export default NavbarWorld