function mysql_getSearch(con, searchName){
    return new Promise(function(resolve, reject){
        // Get all posts from a selected user
        // Corresponds to POST - /search/:searchQuery in routerGuest.js
        con.connect(function(err) {
            if (err) throw err;
            searchName = "'%"+searchName+"%'"
            console.log("Connected!");

            // Should I filter based only on name, or should story be considered too? (for worlds and characters that is)
            var sqlUser = `SELECT * from users WHERE userName LIKE ${searchName};`
            var sqlWorld = `SELECT * from worlds WHERE worldName LIKE ${searchName};`
            var sqlCharacter = `SELECT * from characters WHERE characterName LIKE ${searchName};`
            
            // A generic object that is supposed to hold the following:
            // objectId - ID of user/world/character
            // objectImage - 
            // objectType - User, World, Character
            var genericObject = [];
            con.query(sqlUser, function (err, result) {
                if (err) reject(err);

                // If there is no search returned in user, should be caught
                // Otherwise we get TypeError: Cannot read properties of undefined (reading 'map')
                // But don't exit immediately, since we can get results from world or characters
                console.log("User");
                console.log(sqlUser);
                if(result != undefined){
                    console.log(result);
                    result.map((user)=>{
                        genericObject.push({
                            objectId: user.userId,
                            objectName: user.userName,
                            objectIcon: user.userIcon,
                            objectType: "user"
                        });
                    })
                }
                con.query(sqlWorld, function (err, result){
                    if (err) reject(err);
                    // Turn the world items into generic and push them into objectArray
                    console.log("World");
                    console.log(sqlWorld);
                    if(result != undefined){
                        console.log(result);
                        result.map((world)=>{
                            genericObject.push({
                                objectId: world.worldId,
                                objectName: world.worldName,
                                objectIcon: world.worldIcon,
                                objectType: "world"
                            });
                        })
                    }
                    con.query(sqlCharacter, function (err, result){
                        if (err) reject(err);
                        // Turn the character items into generic and push them into objectArray
                        console.log("Character");
                        console.log(sqlCharacter);
                        if(result != undefined){
                            console.log(result);
                            result.map((character)=>{
                                genericObject.push({
                                    objectId: character.characterWorld,
                                    objectName: character.characterName,
                                    objectIcon: character.characterIcon,
                                    objectType: "char"
                                });
                            })
                            resolve(genericObject);
                        }
                    })
                })
            })
        });
    })
}

export default mysql_getSearch;