function mysql_getCharacters(con){
    return new Promise(function(resolve, reject){

        // Get all users
        // Corresponds to GET - /users in routerGuest.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `select * from characters;`
            
            con.query(sql, function (err, result) {
                if (err) reject(err);
                console.log(result);
                // Create an array of characters to be returned
                const ret = [];
                // Push each character into an array
                // As the list of users only needs to be basic
                // (the rest will be found by getSelectedUser)
                result.map((character)=>ret.push({
                    characterId: character.characterId,
                    characterName: character.characterName,
                    characterIcon: character.characterIcon,
                    characterStory: character.characterStory,
                    characterWorld: character.characterWorld,
                    characterCreator: character.characterCreator
                }))

                // Return array of users
                resolve(ret);
            });
        });
    });
}
export default mysql_getCharacters;