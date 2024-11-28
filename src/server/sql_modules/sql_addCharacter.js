function mysql_addCharacter(con, newCharacter){
    return new Promise(function(resolve, reject){
    // Corresponds to POST - /characters/ in router.js
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        // As stated in README_MySQL.txt, I will merge this with the facilities list whose facility ID match the facility ID provided in each reservation.
        var sql = `INSERT INTO characters (characterName, characterIcon, characterStory, characterWorld, characterCreator) VALUES (${newCharacter.characterName}, ${newCharacter.characterIcon}, ${newCharacter.characterStory}, ${newCharacter.characterWorld}, ${newCharacter.characterCreator}) ;`
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            resolve(`Character ${newCharacter.characterName} Added!`);
        });
    });
})};

export default mysql_addCharacter;