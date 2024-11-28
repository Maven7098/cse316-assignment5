import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import axios from 'axios'
import { onChangeForm } from '../onChangeForm.js';

import {State, useState} from 'react'
import { Outlet } from 'react-router-dom'

import { hashutil } from "../Hashutil.js";
import Cookies from 'js-cookie'

// Navbar will be available starting "MEDIUM" screen size (as stated in Bootstrap)
// MENU------[SIGN IN][REGISTER]-[USER BUTTON]
// ------------------------------Click to Open
// 
// ------------------------------[Register!]
// ------------------------------[Sign in!]
// IF you are not logged in, GUEST mode applies
    // User button is replaced w/ "Sign In" button
    // Sidebar cannot expand as User button is required for sidebar activation

// React states: How can I make sure the user is "logged in" or not?
// Example from https://getbootstrap.com/docs/5.3/components/navbar/#offcanvas

// TODO: Set the state to current user once you log in
const NavbarGuest = () => {

    // Blank strings are given, as otherwise React will complain as if we are using uncontrolled forms
    const [newUser, setNewUser] = useState({
        userName: '',
        userPasswd: '',
        userEmail: ''
    });

    const [oldUser, setOldUser] = useState({
        userName: '',
        userPasswd: ''
    })

    const validateFail = (item) => {
        alert(item);
        console.log(userName);
        console.log(userPasswd);
        console.log(userEmail);
    }

    const addNewUser = (event)=> {
        // Prevent automatic reloading of page
        event.preventDefault();

        // Password salting: We will use the email to salt, as with CSE316 Assignment 4.
        const newPasswd = hashutil(newUser.userName, newUser.userPasswd);
        console.log(newUser.userName, newUser.userPasswd, newUser.userEmail);

        // TODO: Send the user data to the database to create a new user
        axios.post('http://localhost:3000/api/users', {
            userName: newUser.userName,
            userPasswd: newPasswd,
            userEmail: newUser.userEmail
        }).then(validateFail("User Creation Success!"))
          .catch(error => console.log(error));
    }

    const loginUser = (event)=> {
        // Prevent automatic reloading of page
        event.preventDefault();

        // Password salting: We will use the email to salt, as with CSE316 Assignment 4.
        const newPasswd = hashutil(newUser.userName, newUser.userPasswd);
        console.log(newUser.userName, newUser.userPasswd, newUser.userEmail);

        // TODO: Send the user data to the database to log in
        // TODO: Send the user data to the database to create a new user
        axios.post('http://localhost:3000/api/users', {
            userName: newUser.userName,
            userPasswd: newPasswd
        }).then(function (response){
            // Once authenticated, set the token and user
            Cookies.set("accessToken",response.data.accessToken);
            Cookies.set("currentUser",response.data.currentUser);
            console.log(Cookies.get());
        })
          .catch(error => console.log(error));
    }

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
            {/* Project is unnamed so far, so I call it Assignment 5 for the mock-up */}
            <a className="navbar-brand" href="#">Assignment 5</a>
            {/* Should be replaced by the user icon at the end */}
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Your Profile</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            {/* Guest Mode */}
            <div className="offcanvas-body">
                {/* Register */}
                <form onSubmit={addNewUser}>
                    {/* Name input */}
                    <label htmlFor="userName" className="col-sm-2 col-form-label">Username:</label>
                    <input type="text" className="form-control" name="userName" value={newUser.userName} onChange={onChangeForm(setNewUser)} /><br />

                    {/* Password input */}
                    <label htmlFor="userPasswd" className="col-sm-2 col-form-label">Password:</label>
                    <input type="password" className="form-control" name="userPasswd" value={newUser.userPasswd} onChange={onChangeForm(setNewUser)} /><br />

                    {/* Email button */}
                    <label htmlFor="userEmail" className="col-sm-2 col-form-label">Email:</label>
                    <input type="email" className="form-control" name="userEmail" value={newUser.userEmail} onChange={onChangeForm(setNewUser)} /><br />
                    
                    {/* TODO: Create a user with a userName, userPasswd and userEmail values */}
                    {/* Using POST request */}
                    <button className="btn btn-primary">Continue with Email</button>
                </form>
                <br />
                {/* Sign in */}
                <span style={{marginRight: "16px"}}>Already registered?</span>
                <button className="btn btn-outline-primary">Sign In</button>
                <form onSubmit={loginUser}>
                    {/* Name input */}
                    <label htmlFor="oldUserName" className="col-sm-2 col-form-label">Username:</label>
                    <input type="text" className="form-control" id="oldUserName" name="userName" value={oldUser.userName} onChange={onChangeForm(setOldUser)} /><br />
                    {/* Password input */}
                    <label htmlFor="oldUserPasswd" className="col-sm-2 col-form-label">Password:</label>
                    <input type="password" className="form-control" id="oldUserPasswd" name="userPasswd" value={oldUser.userPasswd} onChange={onChangeForm(setOldUser)} /><br />
                    {/* TODO: Fetch the user with the correct password and username from the database */}
                    {/* Using GET request */}
                    <button className="btn btn-primary">Sign In</button>
                </form>
            </div>
            </div>
        </div>
        <Outlet />
    </nav>
  )
}

export default NavbarGuest