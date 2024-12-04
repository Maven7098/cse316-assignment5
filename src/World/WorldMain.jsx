import React, { useState, useEffect } from 'react'
import WorldCharacters from './WorldCharacters'
import WorldMembers from './WorldMembers'
import { useParams } from 'react-router-dom'
import { onChangeForm } from '../onChangeForm'
import { validateFail } from '../validateFail'
import axios from 'axios'

const UserMain = ({currentUserId}) => {
  // Because we need to update a component not connected to it (SidebarWorld.jsx)
  // I just chose to reload the whole thing once it's done

  const selectedWorldId = useParams().worldId;
  const [selectedWorld, setSelectedWorld] = useState();
  useEffect(() => {
  axios.get(`http://localhost:3000/api/worlds/${selectedWorldId}`)
    // Grab only the titles; that's all what matters!
    .then(response => setSelectedWorld(response.data))
    .catch(error => console.log(error.response.data))
  }, []);
  console.log(selectedWorld)

  const [newWorld, setNewWorld] = useState({
    worldIcon: undefined,
    worldStory: undefined
  });

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
      console.log(newWorld.worldIcon + " / " + newWorld.worldStory + " / " + currentUserId);
      console.log(image)
      console.log(res)
    }).then(res => console.log(res))
  },[image])

  const modNewWorld = (event)=> {
      // Prevent automatic reloading of page
      event.preventDefault();

      // Should I prevent a creation of a world that shares an existing world or not?");
      console.log(newWorld.worldName + " / " + newWorld.worldIcon + " / " + newWorld.worldStory + " / " + currentUserId);
      
      // TODO: Send the user data to the database to modify world
      axios.put(`http://localhost:3000/api/auth/worlds/${selectedWorldId}`, {
      worldIcon: newWorld.worldIcon,
      worldStory: newWorld.worldStory
      }).then(function(response){
        validateFail("Congratulations in the creation of a new world!", newWorld);

        // Actually, need to reload the state whole if we were to really update the world sidebar...
        location.reload();
      })
        .catch(error => validateFail(error.response.data, newWorld));
  }

  return (
    <div>
    {(selectedWorld?.worldCreator == currentUserId) && (
      <div>
        {/* // A button to Edit World, if you are the creator of this world */}
        <button type="button" className='btn btn-info'  onClick={() => setNewWorld(values => ({...values, worldStory: selectedWorld.worldStory, worldIcon: selectedWorld.worldIcon}))}  data-bs-toggle="modal" data-bs-target={`#editModal`} > Edit...</button>

        {/* // A modal to Edit World */}
        <div className="card-modal">
          <div className="modal fade" id={`editModal`} tabIndex="-1" aria-labelledby="newWorldModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="newWorldModalLabel">Modify This World</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={modNewWorld} className='realForm'>

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
                  {(newWorld.worldStory) ? <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button> : <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary" disabled>Submit</button>}
                </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      {selectedWorld ?(
        <div>
          <h1>{selectedWorld.worldName}'s Story</h1>
          <p>{selectedWorld.worldStory}</p>
          <h2>Characters</h2>
          <WorldCharacters />
          <h2>Members</h2>
          <WorldMembers currentUserId={currentUserId} />
        </div>) : 
        <h1>Loading</h1>
      }
    </div>
  )
}

export default UserMain