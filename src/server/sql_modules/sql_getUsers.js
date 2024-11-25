function mysql_getUsers(con){
    return new Promise(function(resolve, reject){

        // Get all users
        // Corresponds to GET - /users in routerGuest.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `select * from users;`
            
            con.query(sql, function (err, result) {
                if (err) reject(err);
                console.log(result);
                // Create an array of facilities to be returned
                const ret = [];
                // Push each user into an array
                // As the list of users only needs to be basic
                // (the rest will be found by getSelectedUser)
                result.map((user)=>ret.push({
                    userId: user.userId,
                    userName: user.userName,
                    userPasswd: user.userPasswd,
                    userIcon: user.userIcon,
                    userEmail: user.userIcon,
                }))

                // Return array of users
                resolve(ret);
            });
        });
    });
}
export default mysql_getUsers;