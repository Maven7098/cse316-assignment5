import React from 'react'
import UserCharacters from './UserCharacters'
import UserWorlds from './UserWorlds'

const UserMain = (selectedUser) => {
    JSON
  return (
    <div>
        <UserCharacters selectedUser={selectedUser} />
        <UserWorlds selectedUser={selectedUser} />
    </div>
  )
}

export default UserMain