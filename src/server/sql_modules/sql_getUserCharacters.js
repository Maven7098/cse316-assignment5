
function mysql_getUserCharacters(con, userId){
    return new Promise(function(resolve, reject){

        // Get all facilities
        // Corresponds to GET - /facilities in router.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `SELECT c.* FROM characters c LEFT JOIN users u ON c.characterCreator = u.userId WHERE u.userId=${userId};`
            con.query(sql, function (err, result) {
                if (err) reject(err);

                // Theoretically we can find the list of members without array
                // LIST CHARACTERS WHERE CHARACTERS == WORLD
                // THEN LIST CHARACTERS.OWNERS
                // However, when I tried this, I ran into too many renders, forcing us to take us here

                // The fact that 1 character only belongs to 1 world is a design choice
                // Target: Grab the Character Name and Character ID of a given world
                resolve(result);
            });
        });
    });
}
export default mysql_getUserCharacters;