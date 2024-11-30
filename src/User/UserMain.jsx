import React from 'react'
import UserCharacters from './UserCharacters'
import UserWorlds from './UserWorlds'
import { useParams } from 'react-router-dom'

const UserMain = (currentUserId) => {
  return (
    <div>
        <UserCharacters />
        <UserWorlds currentUserId={currentUserId} />
    </div>
  )
}

export default UserMain