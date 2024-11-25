// This is CommonJS format.
// As React uses ECMAScript, I will use ECMAScript for the others as well
import express from 'express';
import Joi from 'joi';

// These 2 will be used as dummies before MySQL comes online
import mysql from 'mysql2';
let routerGuest = express.Router();

// MySQL calls - Note that this DOES NOT map 1:1 to the front-end.

// This area only contains places w/ restricted access
// USER - Modify User
// WORLD - Create World, Modify World
// MESSAGE - Create Message, Modify Message

// For Users
// PUT - used in profile page
import mysql_modUser from './sql_modules/sql_modUser.js';

// For Worlds
// POST
import mysql_addWorld from './sql_addWorld.js'; // Add a world (from the user page)
// PUT
import mysql_modWorld from './sql_modWorld.js';
// DELETE - May not be needed
// I did not state any requirements for delete requirements. I don't know if I should delete anything.
// Left as Beyond CSE316 requirement

// For Characters
// POST
import mysql_addCharacter from './sql_addCharacter.js'; // Add a world (from the user page)
// PUT
import mysql_modCharacter from './sql_modCharacter.js';
// DELETE - May not be needed
// I did not state any requirements for delete requirements. I don't know if I should delete anything.
// Left as Beyond CSE316 requirement

// For Messages or Posts
// POST
import mysql_addMessage from './sql_addMessage.js'; // Add a world (from the user page)
// PUT
import mysql_modMessage from './sql_modMessage.js'; // Should I edit message?
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
router.put('/users/:id', async (req,res)=>{
    try {
        const result = await mysql_modUsers(con)
        res.send(result)
      } catch (err) {
        res.status(500).send({
          success: false,
          error: err,
        })
      }
});

// Get information about individual user
router.get('/users/:id', async (req,res)=>{
    try {
        // Find the facility with the matching ID
        const result = await mysql_getSelectedUser(con, req.params.id);
        // If the facility is not found, return 404
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

// POST - users
// Add a user
router.post('/facilities', (req,res)=>{
    // Instantiate newFacility object
    // Note that req.body.days start as an array, but I need to replace that with the String
    const days = JSON.stringify(req.body.days).slice(1,this.length-1)
    mysql_addFacilities(req.body.title, req.body.description, req.body.image, days, req.body.capacityMin, req.body.capacityMax, req.body.location, req.body.suny)

    // Push new facility to facilities to finish
    // res.post(newFacility);
});

// PUT - facilities
// router.put('/facilities/:id', (req,res)=>{
//     // Instantiate newFacility object
//     mysql_modFacilities(req.body.id, req.body.title, req.body.description, req.body.image, req.body.days, req.body.capacityMin, req.body.capacityMax, req.body.location, req.body.suny)
    
//     // // Push newFacility to facilities to finish
//     // res.post(newFacility);
// });

// DELETE - facilities
// router.delete('/facilities/:id', (req,res)=>{
//     mysql_delFacilities(req.body.id);
//     // // Find the facility with the matching ID
//     // const facility = facilities.find((facility) => facility.id === parseInt(req.params.id));

//     // // If the facility is not found, return 404
//     // if (!facility) {
//     //     res.status(404).send('The course with given id was not found.');
//     // };
    
//     // // Else, find the facility in question among facilities
//     // const index = facilities.indexOf(facility);
//     // // Delete the facility in facilities
//     // facilities.splice(index, 1);
    
//     // res.send(facility);
// });

// Now do the same for the reservations as well

// GET - reservation
// Get the reservation list
router.get('/reserves', async (req,res)=>{
  try {
      const result = await mysql_getReserves(con)
      res.send(result)
    } catch (err) {
      res.status(500).send("Error: "+err);
    }
});

// Get information about individual reservation
// router.get('/reserves/:id', (req,res)=>{
//     // Find the reservation with the matching ID
//     const reserve = reserves.find((reserve) => reserve.id === parseInt(req.params.id));

//     // If the facility is not found, return 404
//     if (!facility) {
//         res.status(404).send('The course with given id was not found.');
//     };

//     // Else, return the facility in question
//     res.send(facility);
// });

// POST - reservations
// router.post('/facilities', (req,res)=>{
//     // Instantiate newReserve object
//     const newReserve = {
//         id: facilities.length + 1,
//         title: req.body.title,
//         description: req.body.description,
//         image: req.body.image,
//         days: req.body.days,
//         capacityMin: req.body.capacityMin,
//         capacityMax: req.body.capacityMax,
//         location: req.body.location,
//         suny: req.body.suny
//     }

//     // Push new reservation to reservations to finish
//     res.post(newReserve);
// });
router.post('/reserves', async (req,res)=>{
  try {
    let reserve={
      // For some reason, when forms are submitted this way, the brackets come off
      // "'" was added for strings and the date type for this reason
      reserveDate: "'"+req.body.reserveDate+"'",
      reserveCap: req.body.reserveCap,
      reservePurpose: "'"+req.body.reservePurpose+"'",
      facilityId: req.body.facilityId,
      userId: req.body.userId
    }
    // const middle = validateReserve(con, reserve);
    // if (middle.error) {
    //     res.status(400).send(middle.error.details[0].message);
    //     return;
    // }
    console.log(reserve);
    const result = await mysql_addReserve(con, reserve);
    res.send(result)
  } catch (err) {
    res.status(500).send("Error: "+err)
  }
    // Instantiate newFacility object
    

    // Push new facility to facilities to finish
    // res.post(newFacility);
});

// PUT - reservations
// router.put('/reserves/:id', (req,res)=>{
//     // Instantiate newFacility object
//     mysql_modReserve(req.body.reserveId, req.body.reserveDate,req.body.reserveCap,req.body.reservePurpose,req.body.facilityId,req.body.userId)
    
//     // // Push newFacility to facilities to finish
//     // res.post(newFacility);
// });

// DELETE - reservations
// router.delete('/reserves/:id', (req,res)=>{
//     // Find the reservation with the matching ID
//     const reserve = reserves.find((reserve) => reserve.id === parseInt(req.params.id));

//     // If the facility is not found, return 404
//     if (!reserve) {
//         res.status(404).send('The course with given id was not found.');
//     };
    
//     // Else, find the reservation in question among reservations
//     const index = reserves.indexOf(reserve);
//     // Delete the reservation in reservations
//     reserves.splice(index, 1);
    
//     res.send(reserve);
// });
router.delete('/reserves/:id', async (req,res)=>{
  try {
    const result = await mysql_delReserve(con, req.params.id);
    res.send(result)
  } catch (err) {
    res.status(500).send("Error: "+err)
  }
})

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
router.post('/upload', upload.single('file'), (req, res) => {
  // Handle the uploaded file
  console.log(req.file.filename);
  res.send(req.file.filename);
});

export default routerUser;