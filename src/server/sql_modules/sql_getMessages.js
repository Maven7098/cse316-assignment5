function mysql_getMessages(con, worldId){
    return new Promise(function(resolve, reject){
        // Get all messages from a selected world
        // Corresponds to GET - /messages/:userId in routerUser.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            // Luckily, we can identify the worlds of a character in just 1 step
            // Since characters have an ID of the world they belong to, and characters cannot belong to multiple worlds
            var sql = `SELECT m.* FROM characters c LEFT JOIN messages m ON c.characterId = m.messageSenderId WHERE m.messageType=1 AND c.characterWorld=${worldId};`
            con.query(sql, function (err, result) {
                if (err) reject(err);
                
                // A list of all the posts of a selected user
                const ret=[];
                
                // Map the list, we need the sender Id (a list of characters) as well as a list of Replies
                // ReplyId is 0 if this message does not reply to anything.
                // ReplyId cannot be changed (you can't have a message reply to another message).
                result.map((message)=>ret.push({
                    messageId: message.messageId,
                    messageTitle: message.messageTitle,
                    messageContent: message.messageContent,
                    messageReplyId: message.messageReplyId,
                    messageSenderId: message.messageSenderId
                }))
                resolve(ret);
            });
        });
    })
}

export default mysql_getMessages;