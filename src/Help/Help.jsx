import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from '../Layouts/Navbar.jsx'
// import NavbarGuest from './NavbarGuest.jsx'
import NavbarHelp from './NavbarHelp.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    {/* <NavbarGuest /> */}
    {/* Unfortunately, we cannot put Index as a child of SidebarUser */}
    {/* Nor can I do without the two div's */}
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <NavbarHelp />
        <div style={{display:"flex", flexDirection:"column", flex: "1 1 auto"}}>
          <div className="column" style={{marginTop:"78px", flex:"1 1 auto"}}>
            <h1>A help page</h1>
          </div>
        </div>
      </div>
    </div>
  </StrictMode>,
)
