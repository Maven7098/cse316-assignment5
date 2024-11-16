import React from 'react'
// TODO: Replace this with the back-end data
import assets from '../assets/producer.p_world.json'

const UserWorlds = (selectedUser) => {
    // TODO: Back-end data
    // const [assets, setAssets] = useState([]);
    // useEffect(() => {
    //     axios.get(`http://localhost:3000/api/users/${user.id}`)
    //       .then(response => setAssets(response.data))
    //       .catch(error => console.log(error));
    //   }, []);
    //   console.log(assets);
  return (
    <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
      {/* Also, add a button on top */}
      {assets.map((world) => (
          // This consists of a world frame
          <div class="grid-member card" style={{width: "18rem"}}>
              <img src={world.worldImg} class="card-img-top" alt={world.worldName}></img>
              <div class="card-body">
                  <h5 class="card-title">{world.worldName}</h5>
                  <p class="card-text">{world.worldStory}</p>
                  {/* Need to have this button open a modal */}
                  <a href="#" class="btn btn-primary"><i class="bi bi-person"></i>{world.worldCreator}</a>
                  <br />
                  {/* This should redirect to the actual world in question */}
                  <a href="#" class="btn btn-primary">More...</a>
              </div>
          </div>
      ))}
    </div>
  )
}

export default UserWorlds