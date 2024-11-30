import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import axios from 'axios';
import Cookies from 'js-cookie';

import {Link, Outlet} from 'react-router-dom'

// Navbar will be available starting "MEDIUM" screen size (as stated in Bootstrap)
// MENU------[SIGN IN][REGISTER]-[USER BUTTON]
// ------------------------------Click to Open
// ------------------------------USERMODE BUTTONS
// ------------------------------[USER HOME]
// ------------------------------<br />
// ------------------------------[USER BULLETIN]
// ------------------------------[USER CHARACTER]
// ------------------------------[USER WORLDS]
// ------------------------------<br />
// ------------------------------[PROFILE]
// ------------------------------[PREFERENCES]
// ------------------------------[SIGN OUT]

// IF you are not logged in, GUEST mode applies
    // User button is replaced w/ "Sign In" button
    // Sidebar cannot expand as User button is required for sidebar activation
// IF you are logged in, USER mode applies
    // User sidebar can be activated by 
// React states: How can I make sure the user is "logged in" or not?
// Example from https://getbootstrap.com/docs/5.3/components/navbar/#offcanvas

const Navbar = ({currentUserId, setCurrentUserId}) => {
    console.log(currentUserId);
    console.log(setCurrentUserId);

    const [currentUser, setCurrentUser] = React.useState({
        userId: undefined,
        userName: '',
        userPasswd: '',
        userIcon: '',
        userEmail: ''
    })

    React.useEffect(() => {
        axios.get(`http://localhost:3000/api/users/${currentUserId}`)
          .then(response => setCurrentUser(response.data))
          .catch(error => console.log(error))
        }, []);
    console.log(currentUser);

    // Logout should not be a function, Jenny, can you help me with this?
    function logout(){
        axios.delete("http://localhost:3000/logout").
        then(function(){
          // Clear cookies - for user information as well as tokens
          console.log(currentUser);
          console.log(Cookies.get());
          Cookies.remove('currentUser');
        //   Cookies.remove('refreshToken');
          Cookies.remove('accessToken');
          // Check if the cookies are gone!
          console.log(Cookies.get());
          setCurrentUserId({});
          location.reload();
        })
        .catch(err=>console.log(err));
      }

    return (
        <>
        <nav className="navbar navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                {/* Project is unnamed so far, so I call it Assignment 5 for the mock-up */}
                <Link className="navbar-brand" to="/">Assignment 5</Link>

                <div className="d-flex flex-row">
                    {/* Not sure if I need a search button */}
                    {/* Handy, but can also be used for doxxing or other bad faith actions */}
                    <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-success" type="submit">Search</button>
                    </form>

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
                                <img src={`/${currentUser.userIcon}`} style={{width: "48px", height: "48px", marginRight: "16px"}}></img>
                                {/* A USERNAME should be provided, but how could I provide it? */}
                                {/* As a user is created, a new webpage of USERID should also be created */}
                                <Link aria-current="page" to={`users/${currentUser.userId}`}>{currentUser.userName}</Link>
                            </li>
                            <hr />
                            {/* List the bulletins/characters/universes */}
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`users/${currentUser.userId}/bulletins`}>Your Bulletins</Link>
                                <Link className="nav-link" aria-current="page" to={`users/${currentUser.userId}/characters`}>Your Characters</Link>
                                <Link className="nav-link" aria-current="page" to={`users/${currentUser.userId}/worlds`}>Your Worlds</Link>
                            </li>
                            <hr />
                            {/* Other actions with your profile */}
                            <li className="nav-item">
                                {/* Chose to do 3 for the sake of rule of 3 */}
                                <Link className="Navbar-item" to={`users/${currentUser.userId}/profile`}>Profile</Link>
                                <br />
                                <button className="Navbar-item" onClick={logout}>Sign out</button>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </nav>
        
        <Outlet />
        </>
    )
}

export default Navbar