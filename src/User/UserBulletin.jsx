import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dropdown from './Dropdown.js'
import DropdownOwner from './DropdownOwner.js'
import BulletinEdit from "./BulletinEdit.js"
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
      </div>
    </div>
  </StrictMode>,
)

export default UserBulletin;
