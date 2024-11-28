function mysql_modSelectedCharacter(con, newCharacter){
    return new Promise(function(resolve, reject){
    // Corresponds to POST - /characters/ in router.js
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        // As stated in README_MySQL.txt, I will merge this with the facilities list whose facility ID match the facility ID provided in each reservation.
        var sql = `UPDATE characters SET characterName=${newCharacter.characterName}, characterIcon=${newCharacter.characterIcon}, characterStory=${newCharacter.characterStory} WHERE characterId=${characterId} ;`
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            resolve(`Character ${newCharacter.characterName} Modified!`);
        });
    });
})}

export default mysql_modSelectedCharacter;