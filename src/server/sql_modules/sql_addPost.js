function mysql_addMessage(con, newMessage){
    return new Promise(function(resolve, reject){
        // Get all messages from a selected world
        // Corresponds to GET - /messages/:userId in routerUser.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `INSERT INTO messages (messageType, messageTitle, messageSenderId, messageContent) VALUES (false, ${newMessage.messageTitle}, ${newMessage.messageSenderId}, ${newMessage.messageContent});`
            con.query(sql, function (err, result) {
                if (err) reject(err);
                resolve(`Post ${newMessage.messageTitle} Posted!`);
            });
        });
    })
}

export default mysql_addMessage;