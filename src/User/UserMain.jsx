import React, { useState, useEffect } from 'react'
import UserCharacters from './UserCharacters'
import UserWorlds from './UserWorlds'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const UserMain = (currentUserId) => {
  const selectedUserId = useParams().userId;
  const [selectedUser, setSelectedUser] = useState();
  useEffect(() => {
  axios.get(`http://localhost:3000/api/users/${selectedUserId}`)
    // Grab only the titles; that's all what matters!
    .then((response) => setSelectedUser(response.data))
    .catch(error => console.log(error))
  }, []);

  return (
    <div>
      {selectedUser ?(
        <div>
          <h1>{selectedUser.userName}'s Story</h1>
          <p>{selectedUser.userStory}</p>
          <h2>{selectedUser.userName}'s Characters</h2>
          <UserCharacters />
          <h2>{selectedUser.userName}'s Worlds</h2>
          <UserWorlds currentUserId={currentUserId} />
        </div>) : 
        <h1>Loading</h1>
      }
    </div>
  )
}

export default UserMain