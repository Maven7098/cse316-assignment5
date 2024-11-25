import mysql from "mysql2";

function mysql_delReserve(con, reserveId){
    return new Promise(function(resolve, reject){
        // Get all facilities
        // Corresponds to GET - /facilities in router.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `DELETE FROM reserves WHERE reserveId=${reserveId};`
            con.query(sql, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    });
}
export default mysql_delReserve;