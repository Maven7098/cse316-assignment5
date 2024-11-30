function mysql_modSelectedWorld(con, newWorld){
    return new Promise(function(resolve, reject){
    // Corresponds to PUT - /worlds/:id in router.js
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        // As stated in README_MySQL.txt, I will merge this with the facilities list whose facility ID match the facility ID provided in each reservation.
        var sql = `UPDATE worlds SET worldId=${newWorld.worldId}, worldName=${newWorld.worldName}, worldIcon=${newWorld.worldIcon}, worldStory=${newWorld.worldStory} WHERE worldId=${newWorld.worldId} ;`
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            resolve(`World ${newWorld.worldName} Modified!`);
        });
    });
})}

export default mysql_modSelectedWorld;