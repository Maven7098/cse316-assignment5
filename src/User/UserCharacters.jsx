import React from 'react'

import { useState, useEffect } from 'react';

import axios from 'axios';

import {Link, useParams} from 'react-router-dom'

import ReactPaginate from 'react-paginate';

// TODO: Replace this with the back-end data

// paginationOn - enable pagination clicker (it is not enabled for overview pages)
const UserCharacters = ({paginationOn}) => {
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
  }, [selectedUserId]);

  console.log(selectedUserCharacters)

  // Grab the list of worldnames
  const [worldList, setWorldList] = useState([]);
  useEffect(() => {
  axios.get(`http://localhost:3000/api/worlds`)
    // Grab only the titles; that's all what matters!
    .then((response) => setWorldList(response.data))
    .catch(error => console.log(error))
  }, [selectedUserId]);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // 10 items per page
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = selectedUserCharacters.toReversed().slice(itemOffset, endOffset);
  const pageCount = Math.ceil(selectedUserCharacters.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % selectedUserCharacters.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
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
    )
    }
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"16px", flex:"1"}}>
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
                          {worldList != undefined && (
                            <Link to={`/worlds/${char.characterWorld}`} className="btn btn-primary"><i className="bi bi-house"></i>{worldList.find((world)=>world.worldId == char.characterWorld)?.worldName}</Link>
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