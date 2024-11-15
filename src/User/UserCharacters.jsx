import React from 'react'
// import Navbar from "../Layouts/Navbar.jsx"
// import NavbarGuest from "../Layouts/NavbarGuest.jsx"
// import SidebarUser from "../Layouts/SidebarUser.jsx"
import UserCharacterData from './UserCharacterData.jsx'

const UserCharacters = (selectedUser) => {
  return (
    // <NavbarGuest />
    // Unfortunately, we cannot put Index as a child of SidebarUser
    // Nor can I do without the two div's
    <>
        {/* <SidebarUser user={selectedUser} /> */}
        <div className="container-fluid">
        <div className="row flex-nowrap">
            {/* (currentUser === undefined ? <NavbarGuest /> : <Navbar user={currentUser} />) */}
            <UserCharacterData />
        </div>
        </div>
    </>
  )
}

export default UserCharacters