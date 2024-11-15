// Character information on right chart
// Option to edit character

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './Navbar.jsx'
// import NavbarGuest from './NavbarGuest.jsx'
import SidebarUser from './SidebarUser.jsx'
import BulletinEdit from "./BulletinEdit.jsx"
import NavbarWorld from './NavbarWorld.jsx'
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
        <BulletinEdit />
        <a href="">Enter World Chat</a>
        <a href="">Add Character to World</a>
        <NavbarWorld />
        <div style={{marginTop:"76px"}}>
          <img src='placeholder.png'></img>
          <h1>World Title</h1>
          <p>World Story</p>
          <a className="btn btn-primary" href="#" role="button">Enter World Chat</a> <br></br>
          <br></br>
          <a class="btn btn-secondary" href="#" role="button">Add Character to World</a> 
        </div>
        <h1>Description</h1>
        <p>Dummy text</p>
      </div>
    </div>
  </StrictMode>,
)
