
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

                // Theoretically we can find the list of members without array
                // LIST CHARACTERS WHERE CHARACTERS == WORLD
                // THEN LIST CHARACTERS.OWNERS

                // The fact that 1 character only belongs to 1 world is a design choice
                if(result !== undefined && result.length > 0){
                    const worldMembersTemp = [];
                    const worldCharactersTemp = [];
                    // Founder is naturally a member of the world, even if Founder does not have a character
                    worldMembersTemp.push(result[0].worldCreator)
                    // Turn the userId and characterId as arrays
                    result.map((world)=>{
                        worldMembersTemp.push(world.characterCreator)
                        worldCharactersTemp.push(world.characterId)
                    })
                    // Remove duplicates
                    const worldMembersSet = new Set(worldMembersTemp);
                    const worldMembers = [...worldMembersSet]
                    const worldCharactersSet = new Set(worldCharactersTemp);
                    const worldCharacters = [...worldCharactersSet]

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
                    resolve(ret);
                }
                else{
                    reject("No world with given ID found");
                }
            });
        });
    });
}
export default mysql_getSelectedWorld;