import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './Navbar.jsx'
// import NavbarGuest from './NavbarGuest.jsx'
import SidebarUser from './SidebarUser.jsx'
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
        <div style={{display:"flex", flexDirection:"column", flex: "1 1 auto"}}>
          <div className="column" style={{marginTop:"78px", flex:"1 1 auto"}}>
            <h1>Dummy</h1>
          </div>
        </div>
      </div>
    </div>
  </StrictMode>,
)
