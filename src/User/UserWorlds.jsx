import React, { useState, useEffect } from 'react'

import axios from 'axios';

import {Link, useParams} from 'react-router-dom'

import { onChangeForm } from '../onChangeForm';
import { validateFail } from '../validateFail';

const UserWorlds = ({currentUserId}) => {
  // Selected user Id is identical to parameters
  const selectedUserId = useParams().userId;
  
  // TODO: construct user from given userId
  // This is how we grab a list of characters in this user.
  const [worldTable, setWorldTable] = useState([]);
  const [varTable, setVarTable] = useState(0);
  useEffect(() => {
    // Re-initialize table upon subsequent calls
    setWorldTable([]);
    // Why the complexity?
    // We need to include one of the 2 cases:
    // A. selectedUser is the creator of the world (regardless of whether selectedUser has a character in this world or not)
    // B. selectedUser is not the creator of the world, but has a character in this world
    axios.get(`http://localhost:3000/api/users/${selectedUserId}`)
      .then(function (response){
        console.log(JSON.parse(response.data.userWorlds));
        // Parse the useCharacters back into array, and map them to get the actual characters
        // Reducing this and pushing at once sounds more preferable though
        JSON.parse(response.data.userWorlds).map((world)=>{axios.get(`http://localhost:3000/api/worlds/${world}`)
          .then((response)=>{
            setWorldTable(worldTable => [...worldTable, response.data])
          })
          .catch(error => console.log(error))
        })})
      }, [varTable, selectedUserId]);

  // TODO: Add a backend to send the messages over
  const [newWorld, setNewWorld] = useState({
    worldName: undefined,
    worldIcon: undefined,
    worldStory: undefined
  });

  // TODO: Get the person who has a world
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3000/api/users')
    .then(response=>setUsers(response.data))
    .catch(error=>console.log(error))
  }, [])

  // Temporary image state for uploading
  const [image, setImage] = useState("");

  // Upload the image upon new image sent to form
  // also update the characterIcon on the meanwhile
  const formData = new FormData();
  formData.append("file", image);
  useEffect(()=>{
    axios.post("http://localhost:3000/api/auth/upload", formData,
      {headers:{"Content-Type": "multipart/form-data",}, "body":{}}
    ).then((res) => {
      setNewWorld(values => ({...values, worldIcon: `src/server/assets/${res.data}`} ));
      // Should I prevent a creation of a character that shares a name with a existing character or not?");
      console.log(newWorld.worldName + " / " + newWorld.worldIcon + " / " + newWorld.worldStory + " / " + currentUserId);
      console.log(image)
      console.log(res)
    }).then(res => console.log(res))
  },[image])

  const addNewWorld = (event)=> {
      // Prevent automatic reloading of page
      event.preventDefault();

      // Force update of Table upon submission
      setVarTable(varTable+1);

      // Should I prevent a creation of a world that shares an existing world or not?");
      console.log(newWorld.worldName + " / " + newWorld.worldIcon + " / " + newWorld.worldStory + " / " + currentUserId);
      
      // TODO: Send the user data to the database to create a new user
      axios.post('http://localhost:3000/api/auth/worlds', {
      worldName: newWorld.worldName,
      worldIcon: newWorld.worldIcon,
      worldStory: newWorld.worldStory,
      worldCreator: currentUserId
      }).then(validateFail("Congratulations in the creation of a new world!", newWorld))
        .catch(error => console.log(error));
  }

  return (
    <>
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
            {/* Create a world, ONLY IF the currentUser === selectedUser */}
            {currentUserId === selectedUserId &&
            // {/* TODO: Create a "Create World" modal */}
            <button type="button" className="grid-member card btn btn-primary" data-bs-toggle="modal" data-bs-target={`#writeModal`} style={{width: "18rem", textAlign:"center"}}>Create!</button>
            }

            {/* Modal for creating a new World */}
            <div className="card-modal">
              <div className="modal fade" id={`writeModal`} tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="postModalLabel">Create New World</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={addNewWorld} className='realForm'>
                      {/* World Name */}
                      <label htmlFor="worldName" className="form-label">Name: </label>
                      <br></br>
                      <input type="text" name="worldName" value={newWorld.worldName} onChange={(event)=>onChangeForm(event, setNewWorld)} className="form-control" maxLength={256}></input>
                      <br></br>

                      {/* World Icon */}
                      <label htmlFor="worldIcon" className="form-label">Image: </label>
                      <br></br>
                      <input type="file" name="image" onChange={event => setImage(event.target.files[0])} className="form-control"></input>
                      <br></br>

                      {/* Your story */}
                      <label htmlFor="worldStory">Backstory: </label>
                      <br></br>

                      {/* The textarea for React is slightly different from normal HTML */}
                      <textarea value={newWorld.worldStory} name='worldStory' onChange={(event)=>onChangeForm(event, setNewWorld)} className="form-control" maxLength={512}></textarea>
                      <br></br>
                      {(newWorld.worldStory && newWorld.worldName) ? <button type="submit" className="btn btn-primary">Submit</button> : <button type="submit" className="btn btn-secondary" disabled>Submit</button>}
                    </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal for existing worlds */}
            {worldTable.map((world) => (
                // This consists of a world frame
                <div className="grid-member card" style={{width: "18rem"}}>
                  <Link to={`/worlds/${world.worldId}`} currentUserId={currentUserId}>
                    {/* Insert character icon... Or throw placeholder if there is none */}
                    {/* Code taken from https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror */}
                    <img src={`/${world.worldIcon}`} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="/src/server/placeholder/world.png";
                        }} className="card-img-top" alt={world.worldName}></img>
                  </Link>
                    <div className="card-body">
                        <h5 className="card-title">{world.worldName}</h5>
                        <p className="card-text">{world.worldStory}</p>
                      {/* Upon clicking this button, the user will be sent to the creator of this world */}
                      {/* TODO: How to pass children if we were to travel through links? */}
                      {/* Also, world.worldCreator - 1 since SQL is 1-indexed but JS is 0-indexed - preventing off-by-one errors- */}
                      <Link className="btn btn-primary" to={`/users/${world.worldCreator}`}><i className="bi bi-people"></i>{users.find((user)=> user.userId == world.worldCreator)?.userName}</Link>
                    </div>
                  </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserWorlds