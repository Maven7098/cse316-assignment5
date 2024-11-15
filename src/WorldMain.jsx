// The option to chat in world
// The option to add character to world
// The world description
// will be available here

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dropdown from './Dropdown.jsx'
// import DropdownGuest from './DropdownGuest.jsx'
<<<<<<< HEAD
import DropdownOwner from './DropdownOwner.jsx'
=======
import DropdownWorld from './DropdownWorld.jsx'
>>>>>>> parent of a5f43b3 (Filename renaming to be more coherent, though needs fixing)
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dropdown />
    {/* <DropdownGuest /> */}
    {/* Unfortunately, we cannot put Index as a child of DropdownOwner */}
    {/* Nor can I do without the two div's */}
    <div className="container-fluid">
      <div className="row flex-nowrap">
<<<<<<< HEAD
        <DropdownOwner />
        <a href="">Enter World Chat</a>
        <a href="">Add Character to World</a>
=======
        <DropdownWorld />
        <div style={{marginTop:"76px"}}>
          <img src='placeholder.png'></img>
          <h1>World Title</h1>
          <p>World Story</p>
          <a className="btn btn-primary" href="#" role="button">Enter World Chat</a> <br></br>
          <br></br>
          <a class="btn btn-secondary" href="#" role="button">Add Character to World</a> 
        </div>
>>>>>>> parent of a5f43b3 (Filename renaming to be more coherent, though needs fixing)
        <h1>Description</h1>
        <p>Dummy text</p>
      </div>
    </div>
  </StrictMode>,
)
