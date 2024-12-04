import axios from "axios";
import { useEffect, useState } from "react";
import { hashutil } from "../Hashutil.js";
import { useParams } from "react-router-dom";
import { onChangeForm } from "../onChangeForm";
import { validateFail } from "../validateFail";

import './css/myprofile.css'

const Profile = () => {
    const selectedUserId = useParams().userId;

    // create a new user with the following fields
    // userCheckName and userOldPasswd holds the old username and old userPasswd (hashed)
    // userCheckPasswd is for the current password requirements (raw)
    // Those 2 are not edited
    const [newUser, setNewUser] = useState({
        userId: undefined,
        userName: "",
        userIcon: "",
        userEmail: "",
        userPasswd: "",
        userCheckPasswd: ""
    });

    const [oldUser, setOldUser] = useState({
        userId: undefined,
        userName: "",
        userIcon: "",
        userEmail: "",
        userPasswd: "",
    })
    
    // Temporary image state for uploading
    const [image, setImage] = useState("");

    // Get newUser
    useEffect(() => {
        axios.get(`http://localhost:3000/api/users/${selectedUserId}`)
          .then(response =>
            {setNewUser(response.data);
            setOldUser(response.data);})
          .catch(error => console.log(error))
        }, []);
    console.log(newUser);
    
    function sendImage(event) {
        // Do not reload page
        event.preventDefault();
    
        const formData = new FormData();
        formData.append("file", image);
    
        axios.post("http://localhost:3000/api/auth/upload", formData,
          {headers:{"Content-Type": "multipart/form-data",}, "body":{}}
        ).then((res) => {
          console.log(image)
          console.log(res)
          setNewUser(values => ({...values, userImage: `src/server/assets/${res.data}`}));
          updateUser(event)
        }).catch(error => {
          console.log(error);
        });
      }

    const updateUser = (event) => {
        // Prevent window reloads
        event.preventDefault();

        // Check if oldUserName is changed
        // and the provided "current Password" does not map correctly to the old userName
        if((newUser.userName != oldUser.userName) &&
        (hashutil(oldUser.userName, newUser.userPasswd) != oldUser.userPasswd)){
            validateFail("Current password is incorrect",newUser);
            return;
        }

        // Otherwise, modify the user - email and icon are benign
        axios.put(`http://localhost:3000/api/auth/users/${selectedUserId}`, {
            userId: selectedUserId,
            userName: newUser.userName,
            userIcon: newUser.userIcon,
            userEmail: newUser.userEmail,
            userPasswd: (newUser.userPasswd === oldUser.userPasswd
                ? newUser.userPasswd : hashutil(newUser.userName, newUser.userPasswd)),
            }).then(function(response){
              validateFail(response => "User Data modified!", newUser);
      
              // Actually, need to reload the state whole if we were to really update the user sidebar...
              location.reload();
            })
              .catch(error => validateFail(error.response.data, newUser));
    };

    return (
        <section className="userInfo">
          <h1>User Information</h1>
          {/* Image */}
          <img src={oldUser.userImage} style={{borderRadius: "50%"}} className="avatar" />
          <br></br>
          {/* <!-- Button trigger modal --> */}
          <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#ImageModal">
          Change Image
          </button>
    
          {/* Email */}
          <div>Email: {oldUser.userEmail}</div>
    
          {/* Password */}
          <div>Password: ********</div>
          {/* <!-- Button trigger modal --> */}
          <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#userPasswd">
          Change Password
          </button>
    
          {/* Name */}
          <div>Name: {oldUser.userName}</div>
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" value="Save Changes" className="btn btn-primary" onClick={sendImage}>Save Changes</button>
                        </div>
                    </form>
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
                  <form onSubmit={updateUser}>
                    <div className="modal-body">
                        <div className="modalContentMiddle">
                            {/* Inspired by the Group Project - I also used a modal form in the Group Project */}
                                <label htmlFor="userName">New password</label><br></br>
                                <input type="password" id="userPasswd" name="userPasswd" value={newUser.userPasswd} onChange={(event)=>onChangeForm(event, setNewUser)} /><br></br><br></br>
                                <label htmlFor="userName">Old password</label><br></br>
                                <input type="password" id="userCheckPasswd" name="userCheckPasswd" value={newUser.userCheckPasswd} onChange={(event)=>onChangeForm(event, setNewUser)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={()=>setNewUser(values => ({...values, userPasswd: userOldPasswd}))} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <input type="submit" value="Save Changes" className="btn btn-primary" />
                    </div>
                  </form>
                </div>
            </div>
          </div>

          {/* Modal for Email */}
          <div className="modal fade" id="userName" aria-labelledby="userName" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" id="userNameLabel">Change your Email</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form onSubmit={updateUser}>
                    <div className="modal-body">
                        <div className="modalContentMiddle">
                            {/* Inspired by the Group Project - I also used a modal form in the Group Project */}
                            <label htmlFor="userEmail">New Email</label><br></br>
                            <input type="text" id="userEmail" name="userEmail" value={newUser.userEmail} onChange={(event)=>onChangeForm(event, setNewUser)} />
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
                  <form onSubmit={updateUser}>
                    <div className="modal-body">
                        <div className="modalContentMiddle">
                            {/* Inspired by the Group Project - I also used a modal form in the Group Project */}
                                <label htmlFor="userName">New username</label><br></br>
                                <input type="text" id="userName" name="userName" value={newUser.userName} onChange={(event)=>onChangeForm(event, setNewUser)} />
                                <label htmlFor="userOldPasswd">Current password</label><br></br>
                                <input type="password" id="userOldPasswd" name="userCheckPasswd" value={newUser.userCheckPasswd} onChange={(event)=>onChangeForm(event, setNewUser)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={()=>setNewUser(values => ({...values, userName: userCheckName}))} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <input type="submit" value="Save Changes" className="btn btn-primary" />
                    </div>
                  </form>
                </div>
            </div>
          </div>
    
        </section>
    )
};

export default Profile;