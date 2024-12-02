import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { onChangeForm } from '../onChangeForm';
import { validateFail } from '../validateFail';

const WorldBulletins = ({currentUserId}) => {
    // Due to the parameters being the user object itself
    // user.userId is the one to use
    
    const selectedWorld = useParams().worldId;
    console.log(selectedWorld);
    console.log(currentUserId);
    
    // Get a list of characters from this world.
    // See if any character's characterCreator matches the currentUser
    const [worldCharacters, setWorldCharacters] = useState([]);
    // This is how we grab a list of characters in this world.
    useEffect(() => {
      // Re-initialization for repeat calls
      setWorldCharacters([]);
      axios.get(`http://localhost:3000/api/worlds/characters/${selectedWorld}`)
        .then(res => setWorldCharacters(res.data))
        .catch(err => console.log(err))
    }, []);

    const [globalCharacters, setGlobalCharacters] = useState([]);
    // This is how we grab a list of characters.
    useEffect(() => {
      // Re-initialization for repeat calls
      setGlobalCharacters([]);
      axios.get(`http://localhost:3000/api/characters`)
        .then(res => setGlobalCharacters(res.data))
        .catch(err => console.log(err))
    }, []);
    console.log(globalCharacters)

    console.log(worldCharacters);
    
    // Does currentUser has a character in this world?
    // This returns an intersection of the worldCharacters and currentUserCharacters
    // which will be used in the modal
    const currentUserHasCharacter = worldCharacters.filter(character => character.characterCreator == currentUserId);
    console.log(currentUserHasCharacter)

    // TODO: Add a backend to send the messages over
    // messageId is not used for POST operations
    // but used for reply (to retrieve the messageReplyId)
    // and for PUT operations
    const [newMessage, setNewMessage] = useState({
      messageId: undefined,
      messageSenderId: undefined,
      messageReplyId: 0,
      messageTitle: '',
      messageContent: ''
    });

    // Only for the select character part of the modal.
    const onChangeHandler = (event) => {
      setNewMessage(values => ({...values, messageSenderId: event.target.value}));
      console.log(
          "User Selected Value - ",
          event.target.value
      );
    };

    // TODO: Get the list of messages of this world from the backend
    const [messageTable, setMessageTable] = useState([]);
    const [varTable, setVarTable] = useState(0);
    useEffect(() => {
        axios.get(`http://localhost:3000/api/messages/${selectedWorld}`)
        .then(response => setMessageTable(response.data))
        .catch(error => console.log(error));
    }, [varTable]);
    console.log(messageTable)

    const addNewPost = (event)=> {
        // Prevent automatic reloading of page
        event.preventDefault();

        // Force update of Table upon submission
        setVarTable(varTable+1);

        // BEYOND CSE316 - Longer posts? Or a word counter?

        // Password salting: We will use the email to salt, as with CSE316 Assignment 4.
        // const newPasswd = generate_hash(newUser.userEmail, newUser.userPasswd);
        console.log(newMessage.messageTitle + " / " + newMessage.messageContent + " / " + currentUserId.userId);
        // TODO: Send the user data to the database to create a new post
        axios.post('http://localhost:3000/api/auth/messages', {
          messageTitle: newMessage.messageTitle,
          messageContent: newMessage.messageContent,
          messageReplyId: newMessage.messageReplyId,
          messageSenderId: newMessage.messageSenderId,
        }).then(validateFail("Message written!", newMessage))
          .catch(error => console.log(error));
    }

    const modNewPost = (event)=> {
      // Prevent automatic reloading of page
      event.preventDefault();

      // Force update of Table upon submission
      setVarTable(varTable+1);

      // BEYOND CSE316 - Longer posts? Or a word counter?

      // Note: Message title cannot be edited!
      console.log(newMessage.messageContent + " / " + currentUserId.userId);
      // TODO: Send the user data to the database to modify a post
      axios.put(`http://localhost:3000/api/auth/messages/${newMessage.messageId}`, {
        messageContent: newMessage.messageContent,
      }).then(validateFail("Message written!", newMessage))
        .catch(error => console.log(error));
  }

  return (
    <>
      <div className="container-fluid">
      <div className="row flex-nowrap">
            <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
              {/* TODO: Add a modal form to write a new message */}
              {/* Only if the current user has a character in this world */}
              {/* If Write! button is used to write a message, set the replyId to 0 (no reply) */}
              {currentUserHasCharacter &&
                <button type="button" onClick={() => setNewMessage(values => ({...values, messageSenderId: currentUserHasCharacter[0].characterId, messageReplyId: 0}))} className="grid-member card btn btn-primary" data-bs-toggle="modal" data-bs-target={`#writeModal`} style={{width: "18rem", textAlign:"center"}}>Write!</button>
              }
              {/* A modal to write */}
              <div className="card-modal">
                <div className="modal fade" id={`writeModal`} tabIndex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="messageModalLabel">New Message</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                      <form onSubmit={addNewPost} className='realForm'>
                        
                        {/* Post title */}
                        <label htmlFor="messageTitle" className="form-label">Title:</label>
                        <br></br>
                        <input type="text" name="messageTitle" value={newMessage.messageTitle} onChange={(event)=>onChangeForm(event,setNewMessage)} className="form-control"></input>
                        
                        {/* Select Character */}
                        <label htmlFor="messageSenderId" className="form-label">Write as:</label>
                        <select onChange={onChangeHandler} className="form-select" name="messageSenderId" id="messageSenderId">
                        <br></br>
                        {currentUserHasCharacter.map((character)=>{
                            return (<option value={character.characterId}>{character.characterName}</option>)})}</select>
                        <br></br>
                        
                        {/* Your message */}
                        <label htmlFor="messageContent">Message: </label>
                        <br></br>
                        
                        {/* The textarea for React is slightly different from normal HTML */}
                        <textarea value={newMessage.messageContent} name='messageContent' onChange={(event)=>onChangeForm(event,setNewMessage)} className="form-control" maxLength={512}></textarea>
                        <br></br>
                        
                        {/* IF messageContent, messageTitle, messageSenderId are available, then click submit, else disable this button */}
                        {(newMessage.messageContent && newMessage.messageTitle && newMessage.messageSenderId)
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

              {/* A modal to edit */}
              <div className="card-modal">
                <div className="modal fade" id={`editModal`} tabIndex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="messageModalLabel">New Message</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                      <form onSubmit={modNewPost} className='realForm'>
                        
                        {/* Your message */}
                        <label htmlFor="messageContent">Message: </label>
                        <br></br>
                        
                        {/* The textarea for React is slightly different from normal HTML */}
                        <textarea value={newMessage.messageContent} name='messageContent' onChange={(event)=>onChangeForm(event,setNewMessage)} className="form-control" maxLength={512}></textarea>
                        <br></br>
                        
                        {/* IF messageContent is available, then click submit, else disable this button */}
                        {newMessage.messageContent
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

              {/* Post table mapping should only be done if messageTable has more than 1 entry*/}
              {/* else "messageTable is not a function" error is thrown */}
              {(messageTable.length > 0 && worldCharacters.length > 0) &&
                (messageTable.toReversed().map((message) => (
                  // This consists of a card of a message
                  <div className="grid-member card" style={{width: "18rem"}}>
                    <div className="card-body">
                      <h5 className="card-title">{message.messageTitle}</h5>
                      {/* TODO: Add a character roundel image */}
                      <p className="card-text">{worldCharacters.find((character) => character.characterId === message.messageSenderId).characterName}</p>
                      <p className="card-text">{message.messageContent}</p>
                      {/* Upon clicking this button, a modal will pop up */}
                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#messageModal${message.messageId}`}>More...</button>
                      
                      {/* This is to reply to this message */}
                      {/* Set the reply message to the replyId of this message */}
                      {currentUserHasCharacter && <button type="button" className="btn btn-primary" onClick={() => setNewMessage(values => ({...values, messageSenderId: currentUserHasCharacter[0].characterId, messageReplyId: message.messageId}))} data-bs-toggle="modal" data-bs-target={`#writeModal`} >Reply...</button>}
                    </div>
    
                    {/* A modal to read */}
                    <div className="card-modal">
                      <div className="modal fade" id={`messageModal${message.messageId}`} tabIndex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="messageModalLabel">{message.messageTitle}</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <p>{message.messageContent}</p>
                              {message.messageReplyId != 0 &&(
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#messageModal${message.messageReplyId}`}>More...</button>
                              )}
                            </div>
                            <div className="modal-footer">
                              {/* Edit button here */}
                              {/* Will leave messageId as this even if other functions are called as the POST function does not require messageId as a requirement. */}
                              {(worldCharacters.find((character) => character.characterId == message.messageSenderId).characterCreator == currentUserId) && <button type="button" className='btn btn-info' onClick={() => setNewMessage(values => ({...values, messageId: message.messageId, messageContent: message.messageContent}))} data-bs-toggle="modal" data-bs-target={`#editModal`} > Edit...</button>}
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

export default WorldBulletins