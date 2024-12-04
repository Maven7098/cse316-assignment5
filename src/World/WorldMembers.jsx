import React from 'react'
import { useState, useEffect } from 'react';

import axios from 'axios';
import {Link, useParams} from 'react-router-dom'

import ReactPaginate from 'react-paginate';

const WorldMembers = ({paginationOn}) => {
  const selectedWorldId = useParams().worldId;
  // Get a list of members from this world.
    const [memberList, setMemberList] = useState([]);

// This is how we grab a list of users in this world.
useEffect(() => {
  // Re-initialize table upon subsequent calls
  setMemberList([]);
  axios.get(`http://localhost:3000/api/worlds/${selectedWorldId}`)
    .then(function (response){
      console.log(JSON.parse(response.data.worldMembers));
      // Parse the worldMembers back into array, and map them to get the actual users
      JSON.parse(response.data.worldMembers).map((member)=>{axios.get(`http://localhost:3000/api/users/${member}`)
      .then((response)=>{
        setMemberList(memberList => [...memberList, response.data])
      })
    }
    )})
    .catch(error => console.log(error.response.data))
  }, []);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // 10 items per page
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = memberList.toReversed().slice(itemOffset, endOffset);
  const pageCount = Math.ceil(memberList.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % memberList.length;
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
    )}

        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"16px", flex:"1"}}>
              {/* Only render user frame if there is at least 1 member */}
              {currentItems.length > 0 && (
                currentItems.map((user) => (
                  // This consists of a character frame
                  <Link to={`/users/${user.userId}`} className="grid-member card" style={{width: "18rem"}}>
                      {/* Insert character icon... Or throw placeholder if there is none */}
                      {/* Code taken from https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror */}
                      <img src={`/${user.userIcon}`} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="/src/server/placeholder/user.png";
                        }} className="card-img-top" alt={user.userName}></img>
                    <div className="card-body">
                      <h5 className="card-title">{user.userName}</h5>
                      <p className="card-text">{user.userStory}</p>
                    </div>
                  </Link>
                ))
              )}
          </div>
        </div>
      </div>
    </>
  )
}

export default WorldMembers