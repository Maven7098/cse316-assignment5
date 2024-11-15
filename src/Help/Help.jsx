import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dropdown from './Dropdown.jsx'
// import DropdownGuest from './DropdownGuest.jsx'
import DropdownHelp from './DropdownHelp.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dropdown />
    {/* <DropdownGuest /> */}
    {/* Unfortunately, we cannot put Index as a child of DropdownOwner */}
    {/* Nor can I do without the two div's */}
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <DropdownHelp />
        <div style={{display:"flex", flexDirection:"column", flex: "1 1 auto"}}>
          <div className="column" style={{marginTop:"78px", flex:"1 1 auto"}}>
            <h1>A help page</h1>
          </div>
        </div>
      </div>
    </div>
  </StrictMode>,
)
