function mysql_addMessage(con, newMessage){
    return new Promise(function(resolve, reject){
        // Get all messages from a selected world
        // Corresponds to GET - /messages/:userId in routerUser.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `INSERT INTO messages (messageType, messageTitle, messageReplyId, messageSenderId, messageContent) VALUES (true, ${newMessage.messageTitle}, ${newMessage.messageReplyId}, ${newMessage.messageSenderId}, ${newMessage.messageContent});`
            con.query(sql, function (err, result) {
                if (err) reject(err);
                resolve(`Message ${newMessage.messageTitle} Added!`);
            });
        });
    })
}

export default mysql_addMessage;