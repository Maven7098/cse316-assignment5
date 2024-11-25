import mysql from "mysql2";

function mysql_modReserve(reserveId, reserveDate,reserveCap,reservePurpose,facilityId,userId){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "pass4root",
        database: "cse316_assignment3"
    });

    // Get all reservations
    // Corresponds to GET - /reserves in router.js
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        // As stated in README_MySQL.txt, I will merge this with the facilities list whose facility ID match the facility ID provided in each reservation.
        var sql = `UPDATE reserves SET reserveDate=${reserveDate}, reserveCap=${reserveCap}, reservePurpose=${reservePurpose}, facilityId=${facilityId}, userId=${userId} WHERE reserveId=${reserveId} ;`    
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            return result;
        });
    });
}