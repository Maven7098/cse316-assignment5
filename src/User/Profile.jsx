import axios from "axios";
//import userImg from "../AssignImages/user.png";
import { useEffect, useState } from "react";
import { hashutil } from "../Hashutil";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Home from "../Home";
import './css/myprofile.css'


const Profile = () => {
    const selectedUserId = useParams().userId;
    
    const [imgSelected, setImgSelected] = useState(null);

    //const [name, setName] = useState("");
    //const [password, setPassword] = useState("");
    const [oldRawPassword, setOldRawPassword] = useState("");
    const [newRawPassword, setNewRawPassword] = useState("");
    const accessToken = localStorage.getItem('accessToken');
    let newHashedPassword = "";

    const [currImg, setCurrImg] = useState("");


    // create a new user with the following fields
    const [newUser, setNewUser] = useState({
      userId: undefined,
      userName: "",
      userIcon: "",
      userEmail: "",
      userPasswd: ""
    });

    

    useEffect(() => {
        axios.get(`http://localhost:3000/api/users/${selectedUserId}`)
          .then(response => setNewUser(response.data))
          .catch(error => console.log(error))
        }, []);
    console.log(newUser);
    

    const changeImg = async () => {
        // Upload the image upon new image sent to form
        // also update the characterIcon on the meanwhile
        const formData = new FormData();
        formData.append("file", imgSelected);
        useEffect(()=>{
          axios.post("http://localhost:3000/api/auth/upload", formData,
            {headers:{"Content-Type": "multipart/form-data",}, "body":{}}
          ).then((res) => {
            setNewUser(values => ({...values, userIcon: `src/server/assets/${res.data}`} ));
            // Should I prevent a creation of a character that shares a name with a existing character or not?");
            console.log(newUser.userName + " / " + newUser.userIcon + " / " + newUser.userEmail + " / " + currentUserId);
            console.log(imgSelected)
            console.log(res)
          }).then(res => console.log(res))
        },[imgSelected])
    };

    const updateUser = async (imgURL) => {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                id: userId,
                user_name: name,
                password: newHashedPassword,
                profile_pic: imgURL,
            }),
        });

        const data = await response.json();

        if (response.status === 403) {
            console.log('Access forbidden: Invalid credentials or insufficient permissions.');
            //setLogin(false); // Log the user out
            return;
        }

        if (response.ok) {
            //setLogin(true);
            console.log(data.message || 'User updated successfully!');
        } else {
            /*
            if(response.status === 403){
                setLogin(false);
            }else{
                setLogin(true);
            }
            */
            console.log(data.message || 'Failed to update user.');
        }
    } catch (error) {
        console.log('An error occurred while updating the user.');
        console.error('Error:', error);

    }
};


    const handleName = (event) => {
        setName(event.target.value);
    }

    const changeName = () => {
        updateUser(currImg);
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

        updateUser(currImg);
    };

    const handleOldPassword = (event) => {
        setOldRawPassword(event.target.value);
    }

    const handleNewPassword = (event) => {
        setNewRawPassword(event.target.value);
    }
    
    /*
    if(!){
        return(
            <>
                <Home />
            </>
        );
    }
    */

    return (
        <>
            <div className="info_display">
                <h2>User Information</h2>
                <img src={ 'http://localhost:5173/'+newUser.userIcon /*|| userImg*/} alt="userimg" width="200px" height="200px" />
                <br/>
                <p>{newUser.userIcon}</p>
                

                <div className="box">
                    <button type="button" className="button" id="cimg"><a href="#popup-box-img">Change Image</a></button>
                </div>
                
                <div id="popup-box-img" className="modal">
                    <div className="content">
                        <h3 style={{textAlign: 'left'}}>Change your image</h3>
                        <br/>
                        <p style={{textAlign: 'left'}}>New Image</p>
                        <br/>
                        <form>
                            <div className="custom-file">
                                <input type="file" onChange={(event) => setImgSelected(event.target.files?.[0] || null)} className="custom-file-input" id='customFile' accept="images/*"/>
                                <label className="custom-file-label" htmlFor="customFile">Choose Profile Image</label>
                            </div>
                            
                        </form>
                        <br/>
                        <a href="#"><button type="button" className="close">Close</button></a>
                        <a href="#"><button type="button" onClick={changeImg} className="save_chg">Save Changes</button></a>
                        
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