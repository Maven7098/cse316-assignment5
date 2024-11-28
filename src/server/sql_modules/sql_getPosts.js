function mysql_getPosts(con, userId){
    return new Promise(function(resolve, reject){
        // Get all posts from a selected user
        // Corresponds to GET - /messages/:userId in routerUser.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `SELECT * from messages WHERE messageType=0 AND messageSenderId=${userId};`
            con.query(sql, function (err, result) {
                if (err) reject(err);
                if(result != undefined){
                    // A list of all the posts of a selected user
                    const ret=[];
                    
                    // Map the list, we only need ID, title and content for posts, since posts cannot reply
                    result.map((message)=>ret.push({
                        messageId: message.messageId,
                        messageTitle: message.messageTitle,
                        messageContent: message.messageContent
                    }))
                    resolve(ret);
                }
                else{
                    reject("undefined: result not found")
                }
            });
        });
    })
}

export default mysql_getPosts;