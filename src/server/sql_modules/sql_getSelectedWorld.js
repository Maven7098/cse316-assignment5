
function mysql_getSelectedWorld(con, worldId){
    return new Promise(function(resolve, reject){

        // Get all facilities
        // Corresponds to GET - /facilities in router.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `SELECT w.*, c.characterId, c.characterCreator FROM worlds w LEFT JOIN characters c ON c.characterWorld = w.worldId LEFT JOIN users u ON c.characterCreator = u.userId WHERE w.worldId=${worldId};`
            con.query(sql, function (err, result) {
                if (err) reject(err);

                const worldMembers = [];
                const worldCharacters = [];
                // Turn the userId and characterId as arrays
                result.map((world)=>{
                    worldMembers.push(world.characterCreator)
                    worldCharacters.push(world.characterId)
                })

                // Theoretically we can find the list of members without array
                // LIST CHARACTERS WHERE CHARACTERS == WORLD
                // THEN LIST CHARACTERS.OWNERS

                // The fact that 1 character only belongs to 1 world is a design choice
                const ret = {
                    worldId: result[0].worldId,
                    worldName: result[0].worldName,
                    worldIcon: result[0].worldIcon,
                    worldStory: result[0].worldStory,
                    worldCreator: result[0].worldCreator,
                    worldMembers: JSON.stringify(worldMembers),
                    worldCharacters: JSON.stringify(worldCharacters)
                }
                // Return the first element of the array
                // Not that there are multiple worlds sharing an ID
                resolve(ret[0]);
            });
        });
    });
}
export default mysql_getSelectedWorld;