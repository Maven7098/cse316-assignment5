import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import axios from 'axios'

import {State, useState} from 'react'
import {Link, Outlet} from 'react-router-dom'

// import { generate_hash } from '../hashutil.js'

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
const NavbarGuest = () => {
    const [newUser, setNewUser] = useState({
        userName: undefined,
        userPasswd: undefined,
        userEmail: undefined
    });

    const onChangeForm = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // Set the values in [Key,Value] pairs
        setNewUser(values => ({...values, [name]: value}))
    }

    // TODO: Get the user data from the backend
    const [userTable, setUserTable] = useState([]);
    const [varTable, setVarTable] = useState(0);
    // useEffect(() => {
    //     axios.get('http://localhost:3000/api/users')
    //     .then(response => setUserTable(response.data))
    //     .then(console.log(userTable)).then("Table Reset")
    //     .catch(error => console.log(error));
    // }, [varTable]);

    const validateFail = (item) => {
        alert(item);
        console.log(userName);
        console.log(userPasswd);
        console.log(userEmail);
    }

    const addNewUser = (event)=> {
        // Force update of Table upon submission
        setVarTable(varTable+1);

        // Prevent automatic reloading of page
        event.preventDefault();

        // Prevent user creation if the combination of the userName and userPasswd exists in userTable
        // AND, not OR
        if(newUser.userName in userTable && newUser.userPasswd in userTable){
            // We can make this look better, but that's for Beyond CSE316
            validateFail("The user with the username and password combination exists.");
        }

        // Password salting: We will use the email to salt, as with CSE316 Assignment 4.
        // const newPasswd = generate_hash(newUser.userEmail, newUser.userPasswd);
        console.log(newUser.userName, newUser.userPasswd, newUser.userEmail);
        // axios.post('http://localhost:3000/api/users', null)
        // .catch((err)=>"Dummy Error to force 1st POST request");
        // // TODO: Send the user data to the database to create a new user
        // axios.post('http://localhost:3000/api/users', {
        //     userName: newUser.userName,
        //     userPasswd: newPasswd,
        //     userEmail: newUser.userEmail
        // }).then(validateFail("The facility is now reserved"))
        //   .catch(error => console.log(error));
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
                <form>
                    {/* Name input */}
                    <label htmlFor="userName" className="col-sm-2 col-form-label">Username:</label>
                    <input type="text" className="form-control" name="userName" value={newUser.userName} onChange={onChangeForm} /><br />

                    {/* Password input */}
                    <label htmlFor="userPasswd" className="col-sm-2 col-form-label">Password:</label>
                    <input type="password" className="form-control" name="userPasswd" value={newUser.userPasswd} onChange={onChangeForm} /><br />

                    {/* Email button */}
                    <label htmlFor="userEmail" className="col-sm-2 col-form-label">Email:</label>
                    <input type="email" className="form-control" name="userEmail" value={newUser.userEmail} onChange={onChangeForm} /><br />
                    
                    {/* TODO: Create a user with a userName, userPasswd and userEmail values */}
                    {/* Using POST request */}
                    <button className="btn btn-primary">Continue with Email</button>
                </form>
                <br />
                {/* Sign in */}
                <span style={{marginRight: "16px"}}>Already registered?</span>
                <button className="btn btn-outline-primary">Sign In</button>
                <form>
                    {/* Name input */}
                    <label htmlFor="userName" className="col-sm-2 col-form-label">Username:</label>
                    <input type="text" className="form-control" id="userName" name="userName" /><br />
                    {/* Password input */}
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password:</label>
                    <input type="password" className="form-control" id="inputPassword" /><br />
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