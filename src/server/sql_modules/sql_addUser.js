function mysql_addCharacter(con, newUser){
    return new Promise(function(resolve, reject){
    // Corresponds to POST - /characters/ in router.js
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        // As stated in README_MySQL.txt, I will merge this with the facilities list whose facility ID match the facility ID provided in each reservation.
        var sql = `INSERT INTO users (userName, userPasswd, userEmail) VALUES (${newUser.userName}, ${newUser.userPasswd}, ${newUser.userEmail});`
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            resolve(`User ${newUser.userName} Registered!`);
        });
    });
})};

export default mysql_addCharacter;