// This is not used for the actual assignment, just left here so that I can speed up the image uploads once I go back to the frontend

import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";

import './index.css'
import "./components/UserInfo.css"
import { useState } from 'react';
import { HashUtil } from './HashUtil.js'

import axios from 'axios';

import Cookies from 'js-cookie';

// Part 3 - User Information
const UserConfig = ({currentUser}) => {
  // newUser defaults to values taken in currentUser (which is a cookie)
  const [newUser, setNewUser] = useState({
    userName: "",
    userPasswd: "",
    userIcon: currentUser.userIcon
  });
  // Temporary image state for uploading
  const [image, setImage] = useState("");

  const onChangeForm = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // Set the values in [Key,Value] pairs
    setNewUser(values => ({...values, [name]: value}))
    console.log(currentUser); console.log(HashUtil(currentUser.userEmail,newUser.userPasswd));
  }

  const validate = (event) => {
    // Do not refresh
    event.preventDefault();

    // send PUT with the selected options
    axios.put(`http://localhost:3000/api/users/${currentUser.userId}`,
      {
        userId: currentUser.userId,
        userName: (newUser.userName ? newUser.userName : currentUser.userName),
        // If you did not change your password, leave password alone
        userPasswd: (newUser.userPasswd === currentUser.userPasswd | !newUser.userPasswd
        ? currentUser.userPasswd : HashUtil(currentUser.userEmail,newUser.userPasswd)),
        userIcon: newUser.userIcon,
        userEmail: currentUser.userEmail
        }).then(function(){
      // Reset authentication
      // Reset Cookie
      axios.get(`http://localhost:3000/api/users/${currentUser.userId}`).catch(err => console.log(err))
      .then((res)=>{
        Cookies.set("currentUser", JSON.stringify(res.data.user));
        location.reload();
      })
      .catch((err)=>console.log(err))
    })
    .catch(error => console.log(error.response.data));
  }

  function sendImage(event) {
    // Do not reload page
    event.preventDefault();
    
    // I MUST reset the image name here so as to prevent conflict between front and back-end.
    // An alternative way is to grab the filename from the backend...
    // image.name = Date.now() + '-' + image.name;

    const formData = new FormData();
    formData.append("file", image);

    axios.post("http://localhost:3000/api/upload", formData,
      {headers:{"Content-Type": "multipart/form-data",}, "body":{}}
    ).then((res) => {
      console.log(image)
      console.log(res)
      setNewUser(values => ({...values, userIcon: `src/server/AssignImages/${res.data}`}));
    }).catch(error => {
      console.log(error.response.data);
    });
  }

  return (
    <section className="userInfo">
      <h1>User Information</h1>
      {/* Image */}
      <img src={currentUser.userIcon} className="avatar" />
      <br></br>
      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#ImageModal">
      Change Image
      </button>

      {/* Due to Email being the salt, Email cannot be changed */}
      <div>Email: {currentUser.userEmail}</div>

      {/* Password */}
      <div>Password: ********</div>
      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#userPasswd">
      Change Password
      </button>

      {/* Name */}
      <div>Name: {currentUser.userName}</div>
      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#userName">
      Change Username
      </button>

      {/* Modal for Image */}
      <div className="modal fade" id="ImageModal" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-5" id="imageModalLabel">Change your image</h1>
              </div>
              <form onSubmit={sendImage}>
                <div className="modal-body">
                    <div className="modalContentMiddle">
                        </div>
                          {/* Adapted from https://getbootstrap.com/docs/5.3/forms/input-group/#custom-file-input */}
                            <p>New Image</p>
                            <div className="input-group mb-3">
                              <input type="file" name="image" onChange={e => setImage(e.target.files[0])}/>
                            </div>
                            <input type="submit" value="Upload Image" className='btn btn-primary' />
                    </div>
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" value="Save Changes" className="btn btn-primary" onClick={validate}>Save Changes</button>
                </div>
            </div>
        </div>
      </div>

      {/* Modal for Password */}
      <div className="modal fade" id="userPasswd" aria-labelledby="userPasswd" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-5" id="userNameLabel">Change your password</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={validate}>
                <div className="modal-body">
                    <div className="modalContentMiddle">
                        {/* Inspired by the Group Project - I also used a modal form in the Group Project */}
                            <label htmlFor="userName">New password</label><br></br>
                            <input type="password" id="userPasswd" name="userPasswd" value={newUser.userPasswd} onChange={onChangeForm} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <input type="submit" value="Save Changes" className="btn btn-primary" />
                </div>
              </form>
            </div>
        </div>
      </div>

      {/* Modal for UserName */}
      <div className="modal fade" id="userName" aria-labelledby="userName" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-5" id="userNameLabel">Change your username</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={validate}>
                <div className="modal-body">
                    <div className="modalContentMiddle">
                        {/* Inspired by the Group Project - I also used a modal form in the Group Project */}
                            <label htmlFor="userName">New username</label><br></br>
                            <input type="text" id="userName" name="userName" value={newUser.userName} onChange={onChangeForm} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <input type="submit" value="Save Changes" className="btn btn-primary" />
                </div>
              </form>
            </div>
        </div>
      </div>

    </section>
  )
}

export default UserConfig