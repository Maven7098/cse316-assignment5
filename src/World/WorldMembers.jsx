import React from 'react'

import { useState, useEffect } from 'react';

import axios from 'axios';

import {Link, useParams} from 'react-router-dom'

// TODO: Replace this with the back-end data

const UserCharacters = () => {
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
    .catch(error => console.log(error))
  }, []);

  return (
    <>
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
              {/* Only render user frame if there is at least 1 member */}
              {memberList.length > 0 && (
                memberList.map((user) => (
                  // This consists of a character frame
                  <Link to={`/users/${user.userId}`} className="grid-member card" style={{width: "18rem"}}>
                    <img src={`/${user.userIcon}`} className="card-img-top" alt={user.userName}></img>
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

export default UserCharacters