import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from '../Layouts/Navbar.jsx'
// import NavbarGuest from './NavbarGuest.jsx'
import NavbarWorld from './NavbarWorld.jsx'
import './index.css'
import AddUniverse from './AddUniverse.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    {/* <NavbarGuest /> */}
    {/* Unfortunately, we cannot put Index as a child of SidebarUser */}
    {/* Nor can I do without the two div's */}
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <NavbarWorld />
        <AddUniverse />
      </div>
    </div>
  </StrictMode>,
)
