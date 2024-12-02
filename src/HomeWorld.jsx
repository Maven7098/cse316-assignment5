import axios from 'axios';
import { react, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const HomeWorld = () => {
    const [worldList, setWorldList] = useState([]);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/worlds`)
          // Grab only the titles; that's all what matters!
          .then((response) => setWorldList(response.data))
          .catch(error => console.log(error))
    }, []);
    
    console.log("homeworld world list: ", worldList);

    useEffect(() => {
        // Re-initialize table upon subsequent calls
        axios.get(`http://localhost:3000/api/users/`)
          .then(res => setUserList(res.data))
          .catch(error => console.log(error))
      }, []);
    
      console.log("homechar user list: ", userList);

    if(!worldList){
        return(
            <p>Loading worlds...</p>
        )
    }

    // Based on the pagination code, but itemOffset is fixed to 0
  // 10 items per page.
  const itemsPerPage = 6;
  const endOffset = itemsPerPage;
  console.log(`Loading items from ${0} to ${endOffset}`);
  const currentItems = worldList.toReversed().slice(0, endOffset);

    return(
        <>
        <div className="container-fluid">
              <div className="row flex-nowrap">
                <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
                  {/* Only render character frame if there is at least 1 character */}
                  {/* Modal for existing worlds */}
                  {currentItems.map((world) => (
                      // This consists of a world frame
                      <div className="grid-member card" style={{width: "18rem"}}>
                        <Link to={`/worlds/${world.worldId}`}>
                          {/* Insert character icon... Or throw placeholder if there is none */}
                          {/* Code taken from https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror */}
                          <img src={`/${world.worldIcon}`} onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src="/src/server/placeholder/world.png";
                              }} className="card-img-top" alt={world.worldName}></img>
                        </Link>
                          <div className="card-body">
                              <h5 className="card-title">{world.worldName}</h5>
                              <p className="card-text">{world.worldStory}</p>
                            {/* Upon clicking this button, the user will be sent to the creator of this world */}
                            {/* TODO: How to pass children if we were to travel through links? */}
                            {/* Also, world.worldCreator - 1 since SQL is 1-indexed but JS is 0-indexed - preventing off-by-one errors- */}
                            <Link className="btn btn-primary" to={`/users/${world.worldCreator}`}><i className="bi bi-people"></i>{userList.find((user)=> user.userId == world.worldCreator)?.userName}</Link>
                          </div>
                        </div>
                  ))}
              </div>
            </div>
          </div>
        </>
    )
}

export default HomeWorld;