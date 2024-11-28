function mysql_modSelectedMessage(con, newMessage){
    return new Promise(function(resolve, reject){
    // Corresponds to PUT - worlds/:id/messages
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        // As stated in README_MySQL.txt, I will merge this with the facilities list whose facility ID match the facility ID provided in each reservation.
        var sql = `UPDATE message SET messageContent=${newMessage.messageContent} WHERE messageId=${newMessage.messageId} ;`
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            resolve(`Message ${newMessage.messageTitle} Modified!`);
        });
    });
})}

export default mysql_modSelectedMessage