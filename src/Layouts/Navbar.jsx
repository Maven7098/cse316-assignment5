// import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Dropdown will be available starting "MEDIUM" screen size (as stated in Bootstrap)
// MENU------[SIGN IN][REGISTER]-[USER BUTTON]
// ------------------------------Click to Open
// 
// ------------------------------[Register!]
// ------------------------------if you are registered
// ------------------------------[Sign in!]
// ------------------------------USERMODE BUTTONS
// ------------------------------[USER HOME]
// ------------------------------<br />
// ------------------------------[USER NEWS]
// ------------------------------[LIST CHARACTER]
// ------------------------------[LIST WORLD]
// ------------------------------<br />
// ------------------------------[LIST ART]
// ------------------------------[LIST WRITING]
// ------------------------------<br />
// ------------------------------[PROFILE]
// ------------------------------[SIGN OUT]

// IF you are not logged in, GUEST mode applies
    // User button is replaced w/ "Sign In" button
    // Sidebar cannot expand as User button is required for sidebar activation
// IF you are logged in, USER mode applies
    // User sidebar can be activated by 
// React states: How can I make sure the user is "logged in" or not?
// Example from https://getbootstrap.com/docs/5.3/components/navbar/#offcanvas
const Dropdown = ({username, userid}) => {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
            {/* Project is unnamed so far, so I call it Assignment 5 for the mock-up */}
            <a className="navbar-brand" href="index.html">Assignment 5</a>
            {/* Should be replaced by the user icon at the end */}
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Your Profile</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    {/* Your user icon and name */}
                    <li className="nav-item">
                        <img src={userIcon} style={{width: "48px", height: "48px", marginRight: "16px"}}></img>
                        {/* A USERNAME should be provided, but how could I provide it? */}
                        {/* As a user is created, a new webpage of USERID should also be created */}
                        <a aria-current="page" href="#">{username}</a>
                    </li>
                    <hr />
                    {/* List the bulletins/characters/universes */}
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">Your Bulletins</a>
                        <a className="nav-link" aria-current="page" href="#">Your Characters</a>
                        {/* This page will not only list the universes you made, but all universes you are currently in */}
                        {/* They will be divided later on */}
                        <a className="nav-link" aria-current="page" href="#">Your Worlds</a>
                    </li>
                    <hr />
                    {/* List drawings and writings irrespective of universe */}
                    <li className="nav-item">
                        <a className="nav-link" href="#">Your Drawings</a>
                        <a className="nav-link" href="#">Your Writings</a>
                    </li>
                    <hr />
                    {/* Other actions with your profile */}
                    <li className="nav-item">
                        {/* Chose to do 3 for the sake of rule of 3 */}
                        <a className="dropdown-item" href="#">Profile</a>
                        <a className="dropdown-item" href="#">Sign out</a>
                    </li>
                </ul>
                {/* Not sure if I need a search button */}
                {/* Handy, but can also be used for doxxing or other bad faith actions */}
                <form className="d-flex mt-3" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-success" type="submit">Search</button>
                </form>
            </div>
            </div>
        </div>
    </nav>
  )
}

export default Dropdown