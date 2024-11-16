import React from 'react'
// import Navbar from "../Layouts/Navbar.jsx"
// import NavbarGuest from "../Layouts/NavbarGuest.jsx"
import SidebarUser from "../Layouts/SidebarUser.jsx"

import {Link} from 'react-router-dom'

// TODO: Replace this with the back-end data
import assets from '../assets/producer.p.json'

const UserCharacters = (selectedUser) => {
  // TODO: Back-end data
    // const [assets, setAssets] = useState([]);
    // useEffect(() => {
    //     axios.get(`http://localhost:3000/api/users/${user.id}`)
    //       .then(response => setAssets(response.data))
    //       .catch(error => console.log(error));
    //   }, []);
    //   console.log(assets);

  return (
    <>
      <SidebarUser selectedUser={selectedUser} />
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
            {assets.map((char) => (
                // This consists of a character frame
                <div className="grid-member card" style={{width: "18rem"}}>
                    <img src={char.characterImg} className="card-img-top" alt={char.characterName}></img>
                    <div className="card-body">
                        <h5 className="card-title">{char.characterName}</h5>
                        <p className="card-text">{char.characterStory}</p>
                        {/* Upon clicking this button, the user will be sent to a world */}
                        <Link className="btn btn-primary"><i className="bi bi-house"></i>{char.characterWorld}</Link>
                        {/* Upon clicking this button, a modal will pop up */}
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#characterModal${char.characterId}`}>More...</button>
                    </div>

                    <div className="card-modal">
                      <div className="modal fade" id={`characterModal${char.characterId}`} tabIndex="-1" aria-labelledby="characterModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="characterModalLabel">{char.characterName}</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <img src={char.characterImg} className="card-img-top" alt={char.characterName}></img>
                              <p>{char.characterStory}</p>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserCharacters