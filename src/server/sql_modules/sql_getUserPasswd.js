function mysql_getSelectedUser(con, userPasswd){
    return new Promise(function(resolve, reject){
        // Get your (registered) User ID
        // Only user ID will be given, as this is to be used with a cookie (ask me later)
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");

            var sql = `SELECT userId FROM users WHERE userPasswd = ${userPasswd};`
            
            con.query(sql, function (err, result) {
                if (err) reject(err);
                console.log(result);

                // Return the userId
                resolve(result.userId);
            });
        });
    });
}
export default mysql_getSelectedUser;