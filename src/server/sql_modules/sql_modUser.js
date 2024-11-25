function mysql_modUser(con, newUser){
    return new Promise(function(resolve, reject){
    // Modify a user
    // Corresponds to PUT - /users/:id in routerUser.js
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `UPDATE users SET userName=${newUser.userName}, userPasswd=${newUser.userPasswd}, userEmail=${newUser.userEmail}, userIcon=${newUser.userIcon} WHERE userId=${newUser.userId};`
        con.query(sql, function (err, result) {
            if (err) throw err;
            // Lucky that userName to be sent to MySQL is the same as the userName to be printed
            resolve(`User ${newUser.userName} Modified!`);
        });
    });
})}

export default mysql_modUser;