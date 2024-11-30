function mysql_getSelectedUser(con, userId){
    return new Promise(function(resolve, reject){

        // Get all users
        // Corresponds to GET - /users in routerGuest.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");

            // In addition to all user information, also grab the list of worlds and characters of the user
            var sql = `SELECT u.*, w.worldId, c.characterId FROM users u LEFT JOIN characters c ON c.characterCreator = u.userId LEFT JOIN worlds w ON u.userId = w.worldCreator OR c.characterWorld = w.worldId WHERE u.userId = ${userId};`
            
            con.query(sql, function (err, result) {
                if (err) reject(err);
                console.log(result);

                // Define the returning user
                // The list of worlds and characters, being lists, are stringified before exit
                // IF result is defined, and has more than 1 element, return the user item
                if(result != undefined && result.length > 0){
                    // Create an array of facilities to be returned
                    const userWorlds = [];
                    const userCharacters = [];
                    // Turn the worldId and characterId as arrays
                    result.map((user)=>{
                        userWorlds.push(user.worldId)
                        userCharacters.push(user.characterId)
                    })
                    const ret = {
                        userId:result[0].userId,
                        userName:result[0].userName,
                        userPasswd:result[0].userPasswd,
                        userIcon:result[0].userIcon,
                        userEmail:result[0].userEmail,
                        userWorlds:JSON.stringify(userWorlds),
                        userCharacters:JSON.stringify(userCharacters)
                    }
                    // Only return the first user found (not that multiple users will share IDs)
                    resolve(ret);
                }
                // Else reject the promise
                else{
                    reject("No user with given ID found");
                }
            });
        });
    });
}
export default mysql_getSelectedUser;