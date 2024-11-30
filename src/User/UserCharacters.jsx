import React from 'react'

import { useState, useEffect } from 'react';

import axios from 'axios';

import {Link, useParams} from 'react-router-dom'

// TODO: Replace this with the back-end data

const UserCharacters = () => {
  const selectedUserId = useParams().userId;
  // Get a list of characters from this user.
  const [selectedUserCharacters, setSelectedUserCharacters] = useState([]);

  // This is how we grab a list of characters in this user.
  useEffect(() => {
    // Re-initialize table upon subsequent calls
    setSelectedUserCharacters([]);
    axios.get(`http://localhost:3000/api/users/characters/${selectedUserId}`)
      .then(res => setSelectedUserCharacters(res.data))
      .catch(error => console.log(error))
  }, []);

  console.log(selectedUserCharacters)

  // Grab the list of worldnames
  const [worldList, setWorldList] = useState([]);
  useEffect(() => {
  axios.get(`http://localhost:3000/api/worlds`)
    // Grab only the titles; that's all what matters!
    .then((response) => setWorldList(response.data))
    .catch(error => console.log(error))
  }, []);

  return (
    <>
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
              {/* Only render character frame if there is at least 1 character */}
              {selectedUserCharacters.length > 0 && (
                selectedUserCharacters.map((char) => (
                  // This consists of a character frame
                  <div className="grid-member card" style={{width: "18rem"}}>
                      <img src={`/${char.characterIcon}`} className="card-img-top" alt={char.characterName}></img>
                      <div className="card-body">
                          <h5 className="card-title">{char.characterName}</h5>
                          <p className="card-text">{char.characterStory}</p>
                          {/* Upon clicking this button, the user will be sent to a world */}
                          {worldList != undefined && (
                            <Link to={`/worlds/${char.characterWorld}`} className="btn btn-primary"><i className="bi bi-house"></i>{worldList[char.characterWorld - 1]?.worldName}</Link>
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

export default UserCharacters