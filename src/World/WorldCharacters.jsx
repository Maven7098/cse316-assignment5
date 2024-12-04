import React from 'react'
import { useState, useEffect } from 'react';

import axios from 'axios';
import {Link, useParams} from 'react-router-dom'

import { onChangeForm } from '../onChangeForm.js'
import { validateFail } from '../validateFail.js'

import ReactPaginate from 'react-paginate';

const WorldCharacters = ({currentUserId, paginationOn}) => {
  const selectedWorldId = useParams().worldId;
  // Get a list of characters from this world.
  const [characterList, setCharacterList] = useState([]);
  const [varTable, setVarTable] = useState(0);
  console.log(paginationOn);

// This is how we grab a list of characters in this world.
useEffect(() => {
  // Re-initialize table upon subsequent calls
  setCharacterList([]);
  axios.get(`http://localhost:3000/api/worlds/characters/${selectedWorldId}`)
    .then(res => setCharacterList(res.data))
    .catch(error => console.log(error.response.data))
  }, [varTable]);
  console.log(characterList)

  // Grab the list of usernames
  const [userList, setUserList] = useState([]);
  useEffect(() => {
  axios.get(`http://localhost:3000/api/users`)
    // Grab only the titles; that's all what matters!
    .then((response) => setUserList(response.data))
    .catch(error => console.log(error.response.data))
  }, []);
  console.log(userList);

  // TODO: Add a backend to send the messages over
  const [newCharacter, setNewCharacter] = useState({
    characterId: undefined,
    characterName: "",
    characterStory: "",
    characterIcon: ""
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
      setNewCharacter(values => ({...values, characterIcon: `src/server/assets/${res.data}`} ));
      // Should I prevent a creation of a character that shares a name with a existing character or not?");
      console.log(newCharacter.characterName + " / " + newCharacter.characterIcon + " / " + newCharacter.characterStory + " / " + currentUserId);
      console.log(image)
      console.log(res)
    }).then(res => console.log(res))
  },[image])

  const addNewCharacter = (event)=> {
      // Prevent automatic reloading of page
      event.preventDefault();

      // Force update of Table upon submission
      setVarTable(varTable+1);
      
      console.log(newCharacter)
      axios.post('http://localhost:3000/api/auth/characters', {
        characterName: newCharacter.characterName,
        characterIcon: newCharacter.characterIcon,
        characterStory: newCharacter.characterStory,
        characterCreator: currentUserId,
        characterWorld: selectedWorldId
        }).then(response => validateFail("Congratulations in the creation of a new character!", newCharacter))
      .catch(error => validateFail(error.response.data,newCharacter));
  }

  // Now for modified character
  const modNewCharacter = (event)=> {
    // Prevent automatic reloading of page
    event.preventDefault();

    // Force update of Table upon submission
    setVarTable(varTable+1);
    
    console.log(newCharacter)
    axios.put(`http://localhost:3000/api/auth/characters/${newCharacter.characterId}`, {
      characterName: newCharacter.characterName,
      characterIcon: newCharacter.characterIcon,
      characterStory: newCharacter.characterStory
      }).then(response => validateFail("Congratulations in the creation of a new character!", newCharacter))
    .catch(error => validateFail(error.response.data, newCharacter));
}

  // TODO - Implement pagination
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // 10 - 1 = 9 items per page. The user creation modal takes up 1 card, but is not part of the list.
  const itemsPerPage = 9;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = characterList.toReversed().slice(itemOffset, endOffset);
  const pageCount = Math.ceil(characterList.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % characterList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="container-fluid">

      {paginationOn && (
      <div style={{marginTop:"16px", marginLeft:"16px"}}>
        {/* // Taken from https://codepen.io/monsieurv/pen/yLoMxYQ */}
        <ReactPaginate
          previousLabel="<<"
          nextLabel=">>"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    )}

          <div className="row flex-nowrap">
            <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"16px", flex:"1"}}>
              {/* Create a world, ONLY IF user is logged in */}
              {currentUserId &&
              // {/* TODO: Create a "Create World" modal */}
              <button type="button" className="grid-member card btn btn-primary" data-bs-toggle="modal" data-bs-target={`#writeModal`} style={{width: "18rem", textAlign:"center"}}>Create!</button>
              }

              {/* Modal for creating a new World */}
              <div className="card-modal">
                <div className="modal fade" id={`writeModal`} tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="postModalLabel">Create New Character</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                      <form onSubmit={addNewCharacter} className='realForm'>
                        {/* Character Name */}
                        <label htmlFor="characterName" className="form-label">Name: </label>
                        <br></br>
                        <input type="text" name="characterName" value={newCharacter.characterName} onChange={(event)=>onChangeForm(event, setNewCharacter)} className="form-control" maxLength={256}></input>
                        <br></br>

                        {/* Character Icon */}
                        <label htmlFor="characterIcon" className="form-label">Image: </label>
                        <br></br>
                        <input type="file" name="image" onChange={event => setImage(event.target.files[0])} className="form-control"></input>
                        <br></br>

                        {/* Your story */}
                        <label htmlFor="characterStory">Backstory: </label>
                        <br></br>

                        {/* The textarea for React is slightly different from normal HTML */}
                        <textarea value={newCharacter.characterStory} name='characterStory' onChange={(event)=>onChangeForm(event, setNewCharacter)} className="form-control" maxLength={512}></textarea>
                        <br></br>
                        {/* IF both characterName and characterStory is present, set submit, else set diabled */}
                        {(newCharacter.characterName && newCharacter.characterStory) ? <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button> : <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary" disabled>Submit</button>}
                      </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal for modifying an existing character */}
              <div className="card-modal">
                <div className="modal fade" id={`editModal`} tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="postModalLabel">Modify This Character</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                      <form onSubmit={modNewCharacter} className='realForm'>
                        {/* Character Name */}
                        <label htmlFor="characterName" className="form-label">Name: </label>
                        <br></br>
                        <input type="text" name="characterName" value={newCharacter.characterName} onChange={(event)=>onChangeForm(event, setNewCharacter)} className="form-control" maxLength={256}></input>
                        <br></br>

                        {/* Character Icon */}
                        <label htmlFor="characterIcon" className="form-label">Image: </label>
                        <br></br>
                        <input type="file" name="image" onChange={event => setImage(event.target.files[0])} className="form-control"></input>
                        <br></br>

                        {/* Your story */}
                        <label htmlFor="characterStory">Backstory: </label>
                        <br></br>

                        {/* The textarea for React is slightly different from normal HTML */}
                        <textarea value={newCharacter.characterStory} name='characterStory' onChange={(event)=>onChangeForm(event, setNewCharacter)} className="form-control" maxLength={512}></textarea>
                        <br></br>
                        {/* IF both characterName and characterStory is present, set submit, else set diabled */}
                        {(newCharacter.characterName && newCharacter.characterStory) ? <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button> : <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary" disabled>Submit</button>}
                      </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Only render character frame if there is at least 1 character */}
              {currentItems.length > 0 && (
                currentItems.map((char) => (
                  // This consists of a character frame
                  <div className="grid-member card" style={{width: "18rem"}}>
                      {/* Insert character icon... Or throw placeholder if there is none */}
                      {/* Code taken from https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror */}
                      <img src={`/${char.characterIcon}`} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="/src/server/placeholder/user.png";
                        }} className="card-img-top" alt={char.characterName}></img>
                      <div className="card-body">
                          <h5 className="card-title">{char.characterName}</h5>
                          <p className="card-text">{char.characterStory}</p>
                          {/* Upon clicking this button, the user will be sent to a world */}
                          {userList != undefined && (
                            <Link to={`/users/${char.characterCreator}`} className="btn btn-primary"><i className="bi bi-house"></i>{userList.find((user)=>user.userId == char.characterCreator)?.userName}</Link>
                          )}
                          
                          {/* Upon clicking this button, a modal will pop up */}
                          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#characterModal${char.characterId}`}>More...</button>
                      </div>
  
                      <div className="card-modal">
                        <div className="modal fade" id={`characterModal${char.characterId}`} tabIndex="-1" aria-labelledby="characterModalLabel" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="characterModalLabel">{char.characterName}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <img src={`/${char.characterIcon}`} className="card-img-top" alt={char.characterName}></img>
                                <p>{char.characterStory}</p>
                              </div>
                              <div className="modal-footer">
                                {/* If you are the owner of this character, modify it! */}
                                {/* Will leave messageId as this even if other functions are called as the POST function does not require messageId as a requirement. */}
                                {/* Unlike Worlds, Posts or Messages, Characters can be renamed */}
                                {(char.characterCreator == currentUserId) && <button type="button" className='btn btn-info'
                                onClick={() => setNewCharacter(values => ({...values, characterId: char.characterId, characterName: char.characterName, characterStory: char.characterStory, characterIcon: char.characterIcon}))} data-bs-toggle="modal" data-bs-target={`#editModal`} > Edit...</button>}
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
              ))
              )}
          </div>
        </div>
      </div>
    </>
  )
}

export default WorldCharacters