import React from 'react'

import SidebarUser from '../Layouts/SidebarUser';

// Dummy assets to get us started with the posts.
import assets from "../assets/producer.p_post.json"

const UserBulletins = (currentUser, selectedUser) => {

  // TODO: Add a backend to send the messages over
  const [newPost, setNewPost] = React.useState({
    postId: undefined,
    postTitle: undefined,
    postContent: undefined
  });

  const onChangeForm = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      // Set the values in [Key,Value] pairs
      setNewPost(values => ({...values, [name]: value}))
  }

  // TODO: Get the user data from the backend
  const [postTable, setPostTable] = React.useState([]);
  const [varTable, setVarTable] = React.useState(0);
  // useEffect(() => {
  //     axios.get('http://localhost:3000/api/users')
  //     .then(response => setUserTable(response.data))
  //     .then(console.log(userTable)).then("Table Reset")
  //     .catch(error => console.log(error));
  // }, [varTable]);

  const validateFail = (item) => {
      alert(item);
      console.log(newPost.postId);
      console.log(newPost.postTitle);
      console.log(newPost.postContent);
  }

  const addNewPost = (event)=> {
      // Force update of Table upon submission
      setVarTable(varTable+1);

      // Prevent automatic reloading of page
      event.preventDefault();

      // BEYOND CSE316 - Longer posts? Or a word counter?
      if(newPost.postContent.length > 300)
        validateFail("A post must have less than 300 words.");

      // Password salting: We will use the email to salt, as with CSE316 Assignment 4.
      // const newPasswd = generate_hash(newUser.userEmail, newUser.userPasswd);
      console.log(newPost.postTitle + " / " + newPost.postContent + " / " + currentUser.userId);
      // axios.post('http://localhost:3000/api/users', null)
      // .catch((err)=>"Dummy Error to force 1st POST request");
      // // TODO: Send the user data to the database to create a new user
      // axios.post('http://localhost:3000/api/users', {
      // postId: newPost.postId,
      // postTitle: newPost.postTitle,
      // postContent: newPost.postContent,
      // postUserId: currentUser.userId,
      // }).then(validateFail("The facility is now reserved"))
      //   .catch(error => console.log(error));
  }

  return (
    <>
      <SidebarUser selectedUser={selectedUser} />
      
      {/* TODO: Import user bulletin list */}
      <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
              {/* TODO: Add a modal form to write a new message */}
              <button type="button" className="grid-member card btn btn-primary" data-bs-toggle="modal" data-bs-target={`#writeModal`} style={{width: "18rem", textAlign:"center"}}>Write!</button>

              <div className="card-modal">
                      <div className="modal fade" id={`writeModal`} tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="postModalLabel">New Message</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <form onSubmit={addNewPost} className='realForm'>
                                {/* Date to be used */}
                                <label htmlFor="postTitle" className="form-label">Title:</label>
                                <br></br>
                                <input type="text" name="postTitle" value={newPost.postTitle} onChange={onChangeForm} className="form-control"></input>
                                <br></br>
                                {/* Your story */}
                                <label htmlFor="postContent">Story: </label>
                                <br></br>
                                {/* The textarea for React is slightly different from normal HTML */}
                                <textarea value={newPost.postContent} name='postContent' onChange={onChangeForm} className="form-control"></textarea>
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

            {assets.map((post) => (
                // This consists of a character frame
                <div className="grid-member card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">{post.postTitle}</h5>
                        <p className="card-text">{post.postContent}</p>
                        {/* Upon clicking this button, a modal will pop up */}
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#postModal${post.postId}`}>More...</button>
                    </div>

                    {/* A modal... to write? */}
                    <div className="card-modal">
                      <div className="modal fade" id={`postModal${post.postId}`} tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="postModalLabel">{post.postTitle}</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <p>{post.postContent}</p>
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

export default UserBulletins