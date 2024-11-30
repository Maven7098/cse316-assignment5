
function mysql_getSelectedCharacter(con, characterId){
    return new Promise(function(resolve, reject){

        // Get all facilities
        // Corresponds to GET - /facilities in router.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `SELECT * from characters WHERE characterId=${characterId};`
            con.query(sql, function (err, result) {
                if (err) reject(err);
                console.log(result);
                if(result != undefined && result.length > 0){
                    // The fact that 1 character only belongs to 1 world is a design choice
                    const ret = {
                        characterId: result[0].characterId,
                        characterName: result[0].characterName,
                        characterIcon: result[0].characterIcon,
                        characterStory: result[0].characterStory,
                        characterWorld: result[0].characterWorld,
                        characterCreator: result[0].characterCreator
                    }
                    // Resolve the character object we just created
                    resolve(ret);
                }
                else{
                    reject(characterId);
                }
                
            });
        });
    });
}
export default mysql_getSelectedCharacter;