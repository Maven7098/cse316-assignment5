import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './Navbar.js'
import SidebarUser from './SidebarUser.js'
import BulletinEdit from "./BulletinEdit.js"
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
      </div>
    </div>
  </StrictMode>,
)

export default UserBulletin;
