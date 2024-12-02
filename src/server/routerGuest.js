// This is CommonJS format.
// As React uses ECMAScript, I will use ECMAScript for the others as well
import express from 'express';

// These 2 will be used as dummies before MySQL comes online
import mysql from 'mysql2';
let routerGuest = express.Router();

// MySQL calls - Note that this DOES NOT map 1:1 to the front-end.

// User Authentication
// I will not implement refresh tokens at this point (maybe 1 week later?)
// Generate token

// For Users
// GET
// Get a list of users - used for the main page
// and a number of auxiliary back-end functions
import mysql_getUsers from './sql_modules/sql_getUsers.js';
// Get data for one selected user
import mysql_getSelectedUser from './sql_modules/sql_getSelectedUser.js';
// POST - served in servmain.js
// PUT - served in routerUser.js
// DELETE - Beyond CSE316 (even then, I would've put in routerUser.js)

// For Worlds
// GET
import mysql_getWorlds from './sql_modules/sql_getWorlds.js'; // Get a list of worlds - used for the main page
import mysql_getSelectedWorld from './sql_modules/sql_getSelectedWorld.js'; // Get data for one selected world
// POST - served in routerUser.js
// PUT - served in routerUser.js
// DELETE - Beyond CSE316 (maybe not even needed?)
// I did not state any requirements for delete requirements. I don't know if I should delete anything.
// Left as Beyond CSE316 requirement

// For Characters
// GET
import mysql_getCharacters from './sql_modules/sql_getCharacters.js'
// A list of Individual Characters can be obtained in the getSelectedUser getSelectedWorld
import mysql_getSelectedCharacter from './sql_modules/sql_getSelectedCharacter.js'; // 
// POST - served in routerUser.js
// PUT - served in routerUser.js
// DELETE - May not be needed
// I did not state any requirements for delete requirements. I don't know if I should delete anything.
// Left as Beyond CSE316 requirement

// For Messages or Posts
// GET
import mysql_getPosts from './sql_modules/sql_getPosts.js' // Get a list of posts (for selected user)
import mysql_getMessages from './sql_modules/sql_getMessages.js'; // Get a list of messages (for selected world)
import mysql_getWorldCharacters from './sql_modules/sql_getWorldCharacters.js';
import mysql_getUserCharacters from './sql_modules/sql_getUserCharacters.js';
// POST - served in routerUser.js
// PUT - served in routerUser.js
// DELETE - May not be needed
// I did not state any requirements for delete requirements. I don't know if I should delete anything.
// Left as Beyond CSE316 requirement

// Special
// GET
import mysql_getSearch from './sql_modules/sql_getSearch.js';

// Shared MySQL open
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass4root",
  database: "cse316_assignment5"
});

// Users

// GET - users
// Get the user list
routerGuest.get('/users', async (req,res)=>{
    try {
        const result = await mysql_getUsers(con)
        res.send(result)
      } catch (err) {
        res.status(500).send({
          success: false,
          error: err,
        })
      }
});

// Get information about individual user
routerGuest.get('/users/:id', async (req,res)=>{
    try {
        // Find the user with the matching User ID
        const result = await mysql_getSelectedUser(con, req.params.id);
        // If the user is not found, return 404
        if(!result){
            res.status(404).send('The user with given id was not found');
            return;
        }
        res.send(result)
      } catch (err) {
        res.status(500).send({
          success: false,
          error: err,
        })
      }
});

// Worlds

// GET - world
// Get the worlds list
routerGuest.get('/worlds', async (req,res)=>{
  try {
    // Get the list of all worlds in the worlds table
      const result = await mysql_getWorlds(con)
      res.send(result)
    } catch (err) {
      res.status(500).send("Error: "+err);
    }
});

// Get information about individual world
routerGuest.get('/worlds/:id', async (req,res)=>{
  try {
      // Find the world with the matching World ID
      const result = await mysql_getSelectedWorld(con, req.params.id);
      // If the world is not found, return 404
      if(!result){
          res.status(404).send('The world with given id was not found');
          return;
      }
      res.send(result)
    } catch (err) {
      res.status(500).send({
        success: false,
        error: err,
      })
    }
});

// Characters
// GET - character

// In world pages and user pages, you will receive a list of character Ids
// user.userCharacters.map((character)=>{axios.get(`localhost:3000/api/characters/character.characterId`, (req,res...))})
// As the list of character Ids are stringified for both, we need to parse them in the front-end whenever you need a list of characters

// Get the list of characters
routerGuest.get('/characters/', async (req,res)=>{
  try {
      // Find all characters in the characters table
      const result = await mysql_getCharacters(con);
      console.log(result);
      res.send(result)
    } catch (err) {
      res.status(500).send({
        success: false,
        error: err,
      })
    }
});

// Get the selected character
routerGuest.get('/characters/:id', async (req,res)=>{
  try {
      // Find the character with the matching Character ID
      const result = await mysql_getSelectedCharacter(con, req.params.id);
      // If the character is not found, return 404
      if(!result){
          res.status(404).send('The character with given id was not found');
          return;
      }
      console.log(result);
      res.send(result)
    } catch (err) {
      res.status(500).send({
        success: false,
        error: err,
      })
    }
});

// Messages
// GET - message
// Get the list of posts from a selected user
routerGuest.get('/posts/:id', async (req,res)=>{
  try {
      // Find the user with the matching user ID
      const result = await mysql_getPosts(con, req.params.id);
      // If the user is not found, return 404
      if(!result){
          res.status(404).send('The user with given id was not found');
          return;
      }
      res.send(result)
    } catch (err) {
      res.status(500).send({
        success: false,
        error: err,
      })
    }
});
// Get the list of messages from a selected world
routerGuest.get('/messages/:id', async (req,res)=>{
  try {
      // Find the world with the matching World ID
      const result = await mysql_getMessages(con, req.params.id);
      // If the world is not found, return 404
      if(!result){
          res.status(404).send('The world with given id was not found');
          return;
      }
      res.send(result)
    } catch (err) {
      res.status(500).send({
        success: false,
        error: err,
      })
    }
});

// GET - Get a list of characters of a user
routerGuest.get('/users/characters/:id', async (req,res)=>{
  try {
      // Find the list of characters made by a user with a given User ID
      const result = await mysql_getUserCharacters(con, req.params.id);
      // If the user is not found, return 404
      if(!result){
          res.status(404).send('The world with given id was not found');
          return;
      }
      res.send(result)
    } catch (err) {
      res.status(500).send({
        success: false,
        error: err,
      })
    }
});

// GET - Get a list of characters of a world
routerGuest.get('/worlds/characters/:id', async (req,res)=>{
  try {
      // Find the list of characters in the world with a given World ID
      const result = await mysql_getWorldCharacters(con, req.params.id);
      // If the character is not found, return 404
      if(!result){
          res.status(404).send('The world with given id was not found');
          return;
      }
      res.send(result)
    } catch (err) {
      res.status(500).send({
        success: false,
        error: err,
      })
    }
});

// POST - Search
// Get a list of items like search
routerGuest.post('/search/', async (req,res)=>{
  try {
      // Find the search result
      const result = await mysql_getSearch(con, req.body.query);
      // If the search result is not found, return 404
      if(!result){
          res.status(404).send('Search returned null');
          return;
      }
      res.send(result)
    } catch (err) {
      res.status(500).send({
        success: false,
        error: err,
      })
    }
});

export default routerGuest;