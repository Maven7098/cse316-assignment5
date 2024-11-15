// Character information on right chart
// Option to edit character

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dropdown from './Dropdown.jsx'
// import DropdownGuest from './DropdownGuest.jsx'
import DropdownOwner from './DropdownOwner.jsx'
import BulletinEdit from "./BulletinEdit.jsx"
import DropdownWorld from './DropdownWorld.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dropdown />
    {/* <DropdownGuest /> */}
    {/* Unfortunately, we cannot put Index as a child of DropdownOwner */}
    {/* Nor can I do without the two div's */}
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DropdownOwner />
        <BulletinEdit />
        <a href="">Enter World Chat</a>
        <a href="">Add Character to World</a>
        <DropdownWorld />
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
