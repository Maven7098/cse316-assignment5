import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { onChangeForm } from '../onChangeForm';
import { validateFail } from '../validateFail';

const UserBulletins = ({currentUserId}) => {

  // Due to the parameters being the user object itself
  // user.userId is the one to use
  const selectedUserId = useParams().userId;

  console.log(selectedUserId)
  console.log(currentUserId);

  // TODO: Add a backend to send the messages over
  const [newPost, setNewPost] = useState({
    messageId: undefined,
    messageTitle: undefined,
    messageContent: undefined
  });

  // TODO: Get the user data from the backend
  const [postTable, setPostTable] = useState([]);
  const [varTable, setVarTable] = useState(0);
  useEffect(() => {
      axios.get(`http://localhost:3000/api/posts/${selectedUserId}`)
      .then(response => setPostTable(response.data))
      .catch(error => console.log(error));
  }, [varTable]);

  const addNewPost = (event)=> {
      // Prevent automatic reloading of page
      event.preventDefault();

      // Force update of Table upon submission
      setVarTable(varTable+1);

      // BEYOND CSE316 - Longer posts? Or a word counter?

      // Password salting: We will use the email to salt, as with CSE316 Assignment 4.
      // const newPasswd = generate_hash(newUser.userEmail, newUser.userPasswd);
      console.log(newPost.messageTitle + " / " + newPost.messageContent + " / " + currentUserId.userId);
      // TODO: Send the user data to the database to create a new post
      axios.post('http://localhost:3000/api/auth/posts', {
      messageTitle: newPost.messageTitle,
      messageContent: newPost.messageContent,
      messageSenderId: currentUserId,
      }).then(validateFail("Message written!", newPost))
        .catch(error => console.log(error));
  }

  return (
    <>
      {/* TODO: Import user bulletin list */}
      <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
              {/* TODO: Add a modal form to write a new message */}
              {selectedUserId === currentUserId &&
                <button type="button" className="grid-member card btn btn-primary" data-bs-toggle="modal" data-bs-target={`#writeModal`} style={{width: "18rem", textAlign:"center"}}>Write!</button>
              }
              {/* A modal to write */}
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
                        {/* Post title */}
                        <label htmlFor="messageTitle" className="form-label">Title:</label>
                        <br></br>
                        <input type="text" name="messageTitle" value={newPost.messageTitle} onChange={(event)=>onChangeForm(event,setNewPost)} className="form-control"></input>
                        <br></br>
                        {/* Your story */}
                        <label htmlFor="messageContent">Story: </label>
                        <br></br>
                        {/* The textarea for React is slightly different from normal HTML */}
                        <textarea value={newPost.messageContent} name='messageContent' onChange={(event)=>onChangeForm(event,setNewPost)} className="form-control" maxLength={512}></textarea>
                        <br></br>

                        {/* Disable submit post until messageTitle and messageContent are ready */}
                        {(newPost.messageTitle && newPost.messageContent)
                        ? <button type="submit" className="btn btn-primary">Submit</button>
                        : <button type="submit" className="btn btn-secondary" disabled>Submit</button>}
                      </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Post table mapping should only be done if postTable has more than 1 entry*/}
              {/* else "postTable is not a function" error is thrown */}
              {/* postTable.toReversed().map allows me to see the posts in reverse order (newest first) */}
              {postTable.length > 0 &&
                (postTable.toReversed().map((post) => (
                  // This consists of a card of a post
                  <div className="grid-member card" style={{width: "18rem"}}>
                    <div className="card-body">
                      <h5 className="card-title">{post.messageTitle}</h5>
                      <p className="card-text">{post.messageContent}</p>
                      {/* Upon clicking this button, a modal will pop up */}
                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#postModal${post.messageId}`}>More...</button>
                    </div>
    
                    {/* A modal to read */}
                    <div className="card-modal">
                      <div className="modal fade" id={`postModal${post.messageId}`} tabIndex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="postModalLabel">{post.messageTitle}</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <p>{post.messageContent}</p>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )))
              }
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBulletins