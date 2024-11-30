import React, { useState, useEffect } from 'react'
import WorldCharacters from './WorldCharacters'
import WorldMembers from './WorldMembers'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const UserMain = (currentUserId) => {
  const selectedWorldId = useParams().worldId;
  const [selectedWorld, setSelectedWorld] = useState();
  useEffect(() => {
  axios.get(`http://localhost:3000/api/worlds/${selectedWorldId}`)
    // Grab only the titles; that's all what matters!
    .then((response) => setSelectedWorld(response.data))
    .catch(error => console.log(error))
  }, []);

  return (
    <div>
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