import axios from 'axios';
import { react, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const HomeChar = () => {
    const [charList, setCharList] = useState([]);
    const [userList, setUserList] = useState([]);
    
    useEffect(() => {
    axios.get(`http://localhost:3000/api/users`)
      // Grab only the titles; that's all what matters!
      .then((response) => setUserList(response.data))
      .catch(error => console.log(error))
    }, []);

    console.log("homechar world list: ", userList);

    useEffect(() => {
      // Re-initialize table upon subsequent calls
      axios.get(`http://localhost:3000/api/characters/`)
        .then(res => setCharList(res.data))
        .catch(error => console.log(error))
    }, []);
  
    console.log("homechar char list: ", charList);

    if(!charList){
      return(
          <p>Loading characters...</p>
      )
    }


  // Based on the pagination code, but itemOffset is fixed to 0
  // 10 items per page.
  const itemsPerPage = 6;
  const endOffset = itemsPerPage;
  console.log(`Loading items from ${0} to ${endOffset}`);
  const currentItems = charList.toReversed().slice(0, endOffset);

    return (
        <>
            <div className="container-fluid">
              <div className="row flex-nowrap">
                <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
                  {/* Only render character frame if there is at least 1 character */}
                  {charList.length > 0 && (
                    //map the charList to reverse so that the last value comes first
                    currentItems.map((char) => (
                      // This consists of a character frame
                      <div className="grid-member card" style={{width: "18rem"}}>
                          {/* Insert character icon... Or throw placeholder if there is none */}
                          {/* Code taken from https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror */}
                          <Link to={`/worlds/${char.characterWorld}`}>
                          <img src={`/${char.characterIcon}`} onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src="/src/server/placeholder/user.png";
                          }} className="card-img-top" alt={char.characterName}></img>
                          </Link>
                        <div className="card-body">
                            <h5 className="card-title">{char.characterName}</h5>
                            <p className="card-text">{char.characterStory}</p>
                            {/* Upon clicking this button, the user will be sent to a world */}
                            {userList != undefined && (
                              <Link to={`/users/${char.characterCreator}`} className="btn btn-primary"><i className="bi bi-house"></i>{userList.find((user)=>user.userId == char.characterCreator)?.userName}</Link>
                            )}
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
                                    <img src={`/${char.characterIcon}`} className="card-img-top" alt={char.characterName}></img>
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
                  ))
                  )}
              </div>
            </div>
          </div>
        </>
      )
}

export default HomeChar;