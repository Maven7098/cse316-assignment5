import React from 'react'
import {Link} from 'react-router-dom'

const UserWorlds = (currentUserId, selectedUserId) => {
    // TODO: construct user from given userId
    const [assets, setAssets] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/api/users/${selectedUserId}`)
          .then(response => setAssets(response.data))
          .catch(error => console.log(error));
      }, []);
      console.log(assets);

  // TODO: Add a backend to send the messages over
  const [newWorld, setNewWorld] = React.useState({
    worldName: undefined,
    worldIcon: undefined,
    worldStory: undefined
  });

  const onChangeForm = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      // Set the values in [Key,Value] pairs
      setNewWorld(values => ({...values, [name]: value}))
  }

  // TODO: Get the world data from the backend
  const [worldTable, setWorldTable] = React.useState([]);
  const [varTable, setVarTable] = React.useState(0);
  useEffect(() => {
      axios.get('http://localhost:3000/api/worlds')
      .then(response => setWorldTable(response.data))
      .then(console.log(worldTable)).then("Table Reset")
      .catch(error => console.log(error));
  }, [varTable]);

  const validateFail = (item) => {
      alert(item);
      console.log(newWorld.worldName);
      console.log(newWorld.worldIcon);
      console.log(newWorld.worldStory);
  }

  const addNewWorld = (event)=> {
      // Force update of Table upon submission
      setVarTable(varTable+1);

      // Prevent automatic reloading of page
      event.preventDefault();

      // BEYOND CSE316 - Longer posts? Or a word counter?
      // Should I prevent a creation of a world that shares an existing world or not?");

      console.log(newWorld.worldName + " / " + newWorld.worldIcon + " / " + newWorld.worldStory + " / " + currentUserId.userId);
      // axios.post('http://localhost:3000/api/users', null)
      // .catch((err)=>"Dummy Error to force 1st POST request");
      // // TODO: Send the user data to the database to create a new user
      // axios.post('http://localhost:3000/api/users', {
      // postId: newPost.postId,
      // postTitle: newPost.postTitle,
      // postContent: newPost.postContent,
      // postUserId: currentUserId.userId,
      // }).then(validateFail("The facility is now reserved"))
      //   .catch(error => console.log(error));
  }

  return (
    <>
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
            
            {/* TODO: Create a "Create World" modal */}
            <button type="button" className="grid-member card btn btn-primary" data-bs-toggle="modal" data-bs-target={`#writeModal`} style={{width: "18rem", textAlign:"center"}}>Create!</button>

            <div className="card-modal">
              <div className="modal fade" id={`writeModal`} tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="postModalLabel">Create New World</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={addNewWorld} className='realForm'>
                      {/* World Name */}
                      <label htmlFor="worldName" className="form-label">Name: </label>
                      <br></br>
                      <input type="text" name="worldName" value={newWorld.worldName} onChange={onChangeForm} className="form-control"></input>
                      <br></br>

                      {/* World Icon */}
                      <label htmlFor="worldIcon" className="form-label">Image: </label>
                      <br></br>
                      <input type="file" name="worldIcon" value={newWorld.worldIcon} onChange={onChangeForm} className="form-control"></input>
                      <br></br>

                      {/* Your story */}
                      <label htmlFor="worldStory">Backstory: </label>
                      <br></br>
                      {/* The textarea for React is slightly different from normal HTML */}
                      <textarea value={newWorld.worldStory} name='worldStory' onChange={onChangeForm} className="form-control"></textarea>
                      <br></br>
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {assets.map((world) => (
                // This consists of a world frame
                <div className="grid-member card" style={{width: "18rem"}}>
                    <img src={world.worldImg} className="card-img-top" alt={world.worldName}></img>
                    <div className="card-body">
                        <h5 className="card-title">{world.worldName}</h5>
                        <p className="card-text">{world.worldStory}</p>
                        {/* Upon clicking this button, the user will be sent to the creator of this world */}
                        {/* TODO: How to pass children if we were to travel through links? */}
                        <Link className="btn btn-primary" to="/users/:userId/"><i className="bi bi-people"></i>{world.worldCreator}</Link>
                    </div>
                  </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserWorlds