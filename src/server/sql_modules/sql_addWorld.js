function mysql_addWorld(con, newWorld){
    return new Promise(function(resolve, reject){
    // Corresponds to POST - /worlds/ in router.js
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        // As stated in README_MySQL.txt, I will merge this with the facilities list whose facility ID match the facility ID provided in each reservation.
        var sql = `INSERT INTO worlds (worldName, worldIcon, worldStory, worldCreator) VALUES (${newWorld.worldName}, ${newWorld.worldIcon}, ${newWorld.worldStory}, ${newWorld.worldCreator}) ;`
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            resolve(`World ${newWorld.worldName} Added!`);
        });
    });
})}

export default mysql_addWorld;