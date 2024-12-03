import axios from "axios";
//import userImg from "../AssignImages/user.png";
import './css/myprofile.css'
import { useEffect, useState } from "react";
import { hashutil } from "./Hashutil";
import { Form } from "react-bootstrap";


const Profile = () => {
    const [login, setLogin] = useState(false);
    const [userList, setUserList] = useState<User[]>([]);
    const [userId, setUserId] = useState(0);
    const [imgSelected, setImgSelected] = useState<File|null>(null);
    const [imgURL, setImgURL] = useState("");
    const userEmail = localStorage.getItem('email_address');
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [oldRawPassword, setOldRawPassword] = useState("");
    const [newRawPassword, setNewRawPassword] = useState("");
    const accessToken = localStorage.getItem('accessToken');
    let newHashedPassword = "";

    const [currImg, setCurrImg] = useState("");

    

    useEffect(() => {
        fetch(`http://localhost:3000/users/${selectedUserId}`)            
            .then(response => {
                if (!response.ok) {
                    if(response.status === 403){
                        setLogin(false);
                    }else{
                        setLogin(true);
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }else{
                    setLogin(true);
                }
                return response.json();
            })
            .then(data => {
                const formatData = data.map(item => ({
                    id: item.userId,
                    email: item.userEmail,
                    userName: item.userName,
                    password: item.userPasswd,
                    icon: item.userIcon,
                }
                ));
                setUserList(formatData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    

    useEffect(() => {
        if (userEmail && userList.length > 0) {
            const currentUser = userList.find(user => user.email === userEmail);
            if (currentUser && currentUser.id !== userId) {
                setUserId(currentUser.id);
                setName(currentUser.userName);
                setPassword(currentUser.password);
                setCurrImg(currentUser.icon);
            }
        }
    }, [userEmail, userList, userId]);
    


    const changeImg = async () => {
        const formData = new FormData();
        if (imgSelected) {
            formData.append("file", imgSelected);
            formData.append("upload_preset", "f3xbagud");
            console.log("imgSelected: ", imgSelected);
    
            try {
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dihzxttu8/image/upload",
                    formData
                );
                const url = response.data.url;
                console.log("Uploaded image URL: ", url);
                setImgURL(url); // Update the state with the new URL
                console.log("Updated imgURL state: ", url);
    
                updateUser(url); // Pass the URL to update the user
            } catch (error) {
                console.error("Error uploading image: ", error);
                alert("Image upload failed!");
            }
        } else {
            alert("Please select an image first.");
        }
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
            setLogin(false); // Log the user out
            return;
        }

        if (response.ok) {
            setLogin(true);
            console.log(data.message || 'User updated successfully!');
        } else {
            if(response.status === 403){
                setLogin(false);
            }else{
                setLogin(true);
            }
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
        const hashedOldPassword = hashutil(userEmail, oldRawPassword);
        alert("password: " + password);
        alert("old raw: " + oldRawPassword);
        alert("old password: " + hashedOldPassword);
        if(!(password === hashedOldPassword)){
            alert("Your original password is wrong");
            return;
        }

        newHashedPassword = hashutil(userEmail, newRawPassword);

        setPassword(newHashedPassword);

        updateUser(currImg);
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
                <img src={imgURL || currImg /*|| userImg*/} alt="userimg" width="200px" height="200px" />
                <br/>
                

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

                <p style={{display: 'inline'}}>Email: </p>
                <p style={{display: 'inline'}}>{userEmail}</p>
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
                <br/>
                <br/>
                <p style={{display: 'inline'}}>Name: </p>
                <p style={{display: 'inline'}}>{name}</p>

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
            </div>
        </>
    );
};

export default Profile;