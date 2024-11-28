
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
                
                // The fact that 1 character only belongs to 1 world is a design choice
                const ret = {
                    characterId: result.characterId,
                    characterName: result.characterName,
                    characterIcon: result.characterIcon,
                    characterStory: result.characterStory,
                    characterWorld: result.characterWorld,
                    characterCreator: result.characterCreator
                }
                // Resolve the character object we just created
                resolve(ret);
            });
        });
    });
}
export default mysql_getSelectedCharacter;