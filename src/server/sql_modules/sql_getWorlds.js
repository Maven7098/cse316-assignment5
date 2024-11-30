
function mysql_getSelectedWorld(con, worldId){
    return new Promise(function(resolve, reject){

        // Get all facilities
        // Corresponds to GET - /facilities in router.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `SELECT * FROM worlds;`
            // Theoretically we can find the list of members without array
            // But doing this for all worlds is rather costly; see sql_getSelectedWorld.js
            con.query(sql, function (err, result) {
                if (err) reject(err);
                // Create an array of facilities to be returned
                const ret = [];
                // Push each facility into an array
                result.map((world)=>ret.push({
                    worldId: world.worldId,
                    worldName: world.worldName,
                    worldIcon: world.worldIcon,
                    worldStory: world.worldStory,
                    worldCreator: world.worldCreator
                }))
                // Return the array of worlds
                resolve(ret);
            });
        });
    });
}
export default mysql_getSelectedWorld;