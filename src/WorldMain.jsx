// The option to chat in world
// The option to add character to world
// The world description
// will be available here

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dropdown from './Dropdown.jsx'
// import DropdownGuest from './DropdownGuest.jsx'
import DropdownOwner from './DropdownOwner.jsx'
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
        <a href="">Enter World Chat</a>
        <a href="">Add Character to World</a>
        <h1>Description</h1>
        <p>Dummy text</p>
      </div>
    </div>
  </StrictMode>,
)
