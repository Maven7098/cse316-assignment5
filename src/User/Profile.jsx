import axios from "axios";
//import userImg from "../AssignImages/user.png";
import { useEffect, useState } from "react";
import { hashutil } from "../Hashutil";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { validateFail } from "../validateFail";

import './css/myprofile.css'


const Profile = () => {
    const selectedUserId = useParams().userId;

    const [oldRawPassword, setOldRawPassword] = useState("");
    const [newRawPassword, setNewRawPassword] = useState("");

    // create a new user with the following fields
    const [newUser, setNewUser] = useState({
      userId: undefined,
      userName: "",
      userIcon: "",
      userEmail: "",
      userPasswd: ""
    });

    // Get newUser
    useEffect(() => {
        axios.get(`http://localhost:3000/api/users/${selectedUserId}`)
          .then(response => setNewUser(response.data))
          .catch(error => console.log(error))
        }, []);
    console.log(newUser);
    
    // Temporary set current imgSelected state
    const [imgSelected, setImgSelected] = useState("");
    
    const changeImg = async (event) => {
        event.preventDefault();
        // Upload the imgSelected upon new imgSelected sent to form
        // also update the characterIcon on the meanwhile
        const formData = new FormData();
    formData.append("file", imgSelected);

    axios.post("http://localhost:3000/api/auth/upload", formData,
      {headers:{"Content-Type": "multipart/form-data",}, "body":{}}
    ).then((res) => {
      console.log(imgSelected)
      console.log(res)
      setNewUser(values => ({...values, userImage: `src/server/assets/${res.data}`}));
    //   updateUser();
    }).catch(error => {
      console.log(error);
    });
    };

    const updateUser = async () => {

    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                id: newUser.userId,
                userName: newUser.userName,
                userPasswd: hashutil(newUser.userName, newUser.userPasswd),
                userIcon: newUser.userIcon,
            }),
        });

        const data = await response.json();

        if (response.status === 403) {
            validateFail("Access forbidden: Invalid credentials or insufficient permissions.", newUser);
            console.log('Access forbidden: Invalid credentials or insufficient permissions.');
            return;
        }

        if (response.ok) {
            validateFail("User updated successfully!", newUser);
            console.log(data.message || 'User updated successfully!');
            
            // Force refresh after successful user update
            location.reload();
        } else {
            validateFail("Failed to update user", newUser);
            console.log(data.message || 'Failed to update user.');
        }
    } catch (error) {
        validateFail(error.response.data, newUser);
        console.log('An error occurred while updating the user.');
        console.error('Error:', error);

    }
};


    const handleName = (event) => {
        // If the user name is changed before the password
        // the hash is no longer reachable
        // 
        setName(event.target.value);
    }

    const changeName = () => {
        updateUser();
    };

    const changePwd = () => {
        const hashedOldPassword = hashutil(newUser.user_name, oldRawPassword);
        alert("password: " + password);
        alert("old raw: " + oldRawPassword);
        alert("old password: " + hashedOldPassword);
        if(!(newUser.password === hashedOldPassword)){
            alert("Your original password is wrong");
            return;
        }

        newHashedPassword = hashutil(newUser.user_name, newRawPassword);

        setPassword(newHashedPassword);

        updateUser();
    };

    const handleOldPassword = (event) => {
        setOldRawPassword(event.target.value);
    }

    const handleNewPassword = (event) => {
        setNewRawPassword(event.target.value);
    }

    return (
        <>
            <div className="info_display">
                <h2>User Information</h2>
                <img src={`/${newUser.userIcon}`} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="/src/server/placeholder/world.png";
                        }} className="card-img-top" alt={newUser.userName} width="200px" height="200px"></img>
                <br/>
                <p>{newUser.userIcon}</p>
                

                <div className="box">
                    <button type="button" className="button" id="cimg"><a href="#popup-box-img">Change Image</a></button>
                </div>
                
                <div id="popup-box-img" className="modal">
                    <div className="content">
                        <h3 style={{textAlign: 'left'}}>Change your Image</h3>
                        <br/>
                        <p style={{textAlign: 'left'}}>New Image</p>
                        <br/>
                        <form onSubmit={changeImg}>
                            <div className="custom-file">
                            <label className="custom-file-label" htmlFor="customFile">Choose Profile Image</label>
                                <input type="file" onChange={(event) => setImgSelected(event.target.files?.[0] || null)} className="custom-file-input" id='customFile' accept="images/*"/>
                            </div>
                        <br/>
                        <a href="#"><button type="button" className="close">Close</button></a>
                        <button type="submit" className="save_chg">Save Changes</button>
                        </form>
                        
                        <a href="#" style={{position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        fontSize: '30px',
                                        textDecoration: 'none'}} 
                                    >&times;</a>
                    </div>
                </div>

                <br/>
                <br/>
                <p style={{display: 'inline'}}>Name: </p>
                <p style={{display: 'inline'}}>{newUser.userName}</p>

                <div className="box">
                    <button type="button" className="button" id="cnm"><a href="#popup-box-n">Change Name</a></button>
                </div>
                <div id="popup-box-n" className="modal">
                    <Form>
                        <div className="content">
                            <h3 style={{textAlign: 'left'}}>Change your name</h3>
                            <br/>
                            <p style={{textAlign: 'left'}}>New Name</p>
                            <br/>
                            <form>
                                <input type="text" id="txt" name="txt" onChange={handleName}/>
                            </form>
                            <br/>
                            <a href="#"><button type="button" className="close">Close</button></a>
                            <a href="#"><button type="submit" className="save_chg" onClick={() => changeName()}>Save Changes</button></a>
                            <a href="#" style={{position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            fontSize: '30px',
                                            textDecoration: 'none'}}
                                        >&times;</a>
                        </div>
                    </Form>
                </div>
                
                <br/>
                <br/>

                <p style={{display: 'inline'}}>Email: </p>
                <p style={{display: 'inline'}}>{newUser.userEmail}</p>
                
                <br/>
                <br/>
                <p style={{display: 'inline'}}>Password: </p>
                <p style={{display: 'inline'}}>******</p>

                <div className="box">
                    <button type="button" className="button" id="cpwd"><a href="#popup-box-pwd">Change Password</a></button>
                </div>
                <div id="popup-box-pwd" className="modal">
                    <Form>
                        <div className="content">
                            <h3 style={{textAlign: 'left'}}>Change your password</h3>
                            <br/>
                            <p style={{textAlign: 'left'}}>Current Password</p>
                            <br/>
                            <form>
                                <input type="password" id="pwd" name="pwd" onChange={handleOldPassword}/>
                            </form>
                            <p style={{textAlign: 'left'}}>New Password</p>
                            <br/>
                            <form>
                                <input type="password" id="new_pwd" name="new_pwd" onChange={handleNewPassword}/>
                            </form>
                            <br/>
                            <a href="#"><button type="button" className="close">Close</button></a>
                            <a href="#"><button type="submit" className="save_chg" onClick={() => changePwd()}>Save Changes</button></a>
                            <a href="#" style={{position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            fontSize: '30px',
                                            textDecoration: 'none'}}  
                                        >&times;</a>
                        </div>
                    </Form>
                </div>
                
            </div>
        </>
    );
};

export default Profile;