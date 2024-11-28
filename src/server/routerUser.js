// This is CommonJS format.
// As React uses ECMAScript, I will use ECMAScript for the others as well
import express from 'express';

// These 2 will be used as dummies before MySQL comes online
import mysql from 'mysql2';
let routerUser = express.Router();

// MySQL calls - Note that this DOES NOT map 1:1 to the front-end.

// This area only contains places w/ restricted access
// USER - Modify User
// WORLD - Create World, Modify World
// MESSAGE - Create Message, Modify Message

// For Users
// GET - served in routerGuest.js
// POST - served in routerMain.js - used for user registration
// PUT
import mysql_modSelectedUser from './sql_modules/sql_modSelectedUser.js';
// DELETE - May not be needed

// For Worlds
// GET - served in routerGuest.js
// POST
import mysql_addWorld from './sql_modules/sql_addWorld.js'; // Add a world (from the user page)
// PUT
import mysql_modSelectedWorld from './sql_modules/sql_modSelectedWorld.js';
// DELETE - May not be needed
// I did not state any requirements for delete requirements. I don't know if I should delete anything.
// Left as Beyond CSE316 requirement

// For Characters
// GET - served in routerGuest.js
// POST
import mysql_addCharacter from './sql_modules/sql_addCharacter.js'; // Add a character (from the world page)
// PUT
import mysql_modSelectedCharacter from './sql_modules/sql_modSelectedCharacter.js'; // Modify a character
// DELETE - May not be needed
// I did not state any requirements for delete requirements. I don't know if I should delete anything.
// Left as Beyond CSE316 requirement

// For Messages or Posts
// GET - served in routerGuest.js
// POST
import mysql_addMessage from './sql_modules/sql_addMessage.js'; // Add a message (from the world page)
import mysql_addPost from './sql_modules/sql_addPost.js'; // Add a post (from the user page)
// PUT
import mysql_modSelectedMessage from './sql_modules/sql_modSelectedMessage.js'; // Should I edit message?
import mysql_modSelectedPost from './sql_modules/sql_modSelectedPost.js'; // Should I edit message?
// DELETE - May not be needed
// I did not state any requirements for delete requirements. I don't know if I should delete anything.
// Left as Beyond CSE316 requirement

// Shared MySQL open
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass4root",
  database: "cse316_assignment3"
});

// For Users

// PUT - users
routerUser.put('/users/:id', async (req,res)=>{
    try {
        // a newUser object to be sent to SQL call 
        const newUser = {
          userId: req.params.id,
          userName: "'" + req.body.userName + "'",
          userPasswd: "'" + req.body.userPasswd + "'",
          userEmail: "'" + req.body.userEmail + "'",
          userIcon: "'" + req.body.userIcon + "'"
        }

        // Modify the data in database
        const result = await mysql_modSelectedUser(con, newUser)
        res.send(result)
      } catch (err) {
        res.status(500).send({
          success: false,
          error: err,
        })
    }
});

// POST - worlds
routerUser.post('/worlds/:id', async (req,res)=>{
    // Instantiate newFacility object
    try {
      // a newWorld object to be sent to SQL call 
      const newWorld = {
        worldId: req.params.id,
        worldName: "'" + req.body.worldName + "'",
        worldIcon: "'" + req.body.worldIcon + "'",
        worldStory: "'" + req.body.worldStory + "'",
        worldCreator: req.body.worldCreator
      }

      // Modify the data in database
      const result = await mysql_addWorld(con, newWorld)
      res.send(result)
    } catch (err) {
      res.status(500).send({
        success: false,
        error: err,
      })
  }
});

// PUT - worlds
routerUser.put('/worlds/:id', async (req,res)=>{
    // Instantiate newFacility object
    try {
      // a newWorld object to be sent to SQL call 
      // worldCreator cannot be changed once created
      const newWorld = {
        worldId: req.params.id,
        worldName: "'" + req.body.worldName + "'",
        worldIcon: "'" + req.body.worldIcon + "'",
        worldStory: "'" + req.body.worldStory + "'"
      }

      // Modify the data in database
      const result = await mysql_modSelectedWorld(con, newWorld)
      res.send(result)
    } catch (err) {
      res.status(500).send({
        success: false,
        error: err,
      })
  }
});

// POST - characters
routerUser.post('/characters', async (req,res)=>{
  try {
    let newCharacter={
      // For some reason, when forms are submitted this way, the brackets come off
      // "'" was added for strings and the date type for this reason
      characterName: "'"+req.body.characterName+"'",
      characterIcon: "'" + req.body.characterIcon + "'",
      characterStory: "'" + req.body.characterStory + "'",
      characterWorld: req.body.characterWorld,
      characterCreator: req.body.characterCreator
    }
    const result = await mysql_addCharacter(con, newCharacter);
    res.send(result)
  } catch (err) {
    res.status(500).send("Error: "+err)
  }
});

// PUT - characters
routerUser.put('/characters/:id', async (req,res)=>{
  // Instantiate newFacility object
  try {
    // a newCharacter object to be sent to SQL call 
    // characterWorld and characterCreator cannot be changed once character is created
    const newCharacter = {
      characterId: req.params.id,
      characterName: "'"+req.body.characterName+"'",
      characterIcon: "'" + req.body.characterIcon + "'",
      characterStory: "'" + req.body.characterStory + "'"
    }

    // Modify the data in database
    const result = await mysql_modSelectedCharacter(con, newCharacter)
    res.send(result)
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err,
    })
}
});

// Question: Should I add a DELETE call?
// routerUser.delete('/reserves/:id', async (req,res)=>{
//   try {
//     const result = await mysql_delReserve(con, req.params.id);
//     res.send(result)
//   } catch (err) {
//     res.status(500).send("Error: "+err)
//   }
// })

// POST - messages
routerUser.post('/messages/:id', async (req,res)=>{
  try {
    let newMessage={
      // For some reason, when forms are submitted this way, the brackets come off
      // "'" was added for strings and the date type for this reason
      messageTitle: "'" + req.body.messageTitle + "'",
      messageReplyId: req.body.messageReplyId,
      messageSenderId: req.body.messageSenderId,
      messageContent: "'" + req.body.messageContent + "'"
    }
    const result = await mysql_addMessage(con, newMessage);
    res.send(result)
  } catch (err) {
    res.status(500).send("Error: "+err)
  }
});
// POST - posts
routerUser.post('/messages/:id', async (req,res)=>{
  try {
    let newPost={
      // For some reason, when forms are submitted this way, the brackets come off
      // "'" was added for strings and the date type for this reason
      messageTitle: "'" + req.body.messageTitle + "'",
      messageSenderId: req.params.id,
      messageContent: "'" + req.body.messageContent + "'"
    }
    const result = await mysql_addPost(con, newPost);
    res.send(result)
  } catch (err) {
    res.status(500).send("Error: "+err)
  }
});
// PUT - messages
routerUser.put('/messages/:id', async (req,res)=>{
  // Instantiate newFacility object
  try {
    // a newCharacter object to be sent to SQL call 
    // messageReplyId and messageSenderId cannot be changed once message is sent
    const newMessage = {
      messageId: req.body.messageId,
      messageContent: "'" + req.body.messageContent + "'"
    }

    // Modify the data in database
    const result = await mysql_modSelectedMessage(con, newMessage)
    res.send(result)
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err,
    })
}
});
// PUT - posts
routerUser.put('/messages/:id', async (req,res)=>{
  // Instantiate newFacility object
  try {
    // a newCharacter object to be sent to SQL call 
    // postId
    const newPost = {
      messageId: req.body.messageId,
      messageContent: "'" + req.body.messageContent + "'"
    }

    // Modify the data in database
    const result = await mysql_modSelectedPost(con, newPost)
    res.send(result)
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err,
    })
}
});

// Set up storage for uploaded files
const storage = multer.diskStorage({
  // Does multer use relative or absolute directories? Go check out
  destination: (request, file, callback) => {
    console.log(file);
    callback(null, path.join(__dirname, '/AssignImages'));
  },
  filename: (request, file, callback) => {
    console.log(file);
    callback(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

// Upload image - from https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/
routerUser.post('/upload', upload.single('file'), (req, res) => {
  // Handle the uploaded file
  console.log(req.file.filename);
  res.send(req.file.filename);
});

export default routerUser;