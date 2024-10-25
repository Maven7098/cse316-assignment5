import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dropdown from './Dropdown.jsx'
// import DropdownGuest from './DropdownGuest.jsx'
import DropdownWorld from './DropdownWorld.jsx'
import './index.css'
import Universe from './Universe.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dropdown />
    {/* <DropdownGuest /> */}
    {/* Unfortunately, we cannot put Index as a child of DropdownOwner */}
    {/* Nor can I do without the two div's */}
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DropdownWorld />
        <div style={{display:"flex", flexDirection:"column", flex: "1 1 auto"}}>
          <div className="column" style={{flex:"1 1 auto"}}>
            <a className="btn btn-primary" role="button" href='charadd.html' style={{display:"flex", marginTop:"78px"}}>Add New Character</a>
          </div>
          <Universe />
        </div>
      </div>
    </div>
  </StrictMode>,
)
