// Character information on right chart
// Option to edit character

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './Navbar.jsx'
// import NavbarGuest from './NavbarGuest.jsx'
import SidebarUser from './SidebarUser.jsx'
import CharacterData from "./CharacterData.jsx"
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    {/* <NavbarGuest /> */}
    {/* Unfortunately, we cannot put Index as a child of SidebarUser */}
    {/* Nor can I do without the two div's */}
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <SidebarUser />
        <CharacterData />
      </div>
    </div>
  </StrictMode>,
)
