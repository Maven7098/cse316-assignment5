import mysql from "mysql2";

function mysql_addReserve(con,{reserveDate,reserveCap,reservePurpose,facilityId,userId}){
    return new Promise(function(resolve, reject){
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "pass4root",
            database: "cse316_assignment3"
        });

        // Add a reservation
        // Corresponds to POST - /reserves in router.js
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            console.log({reserveDate,reserveCap,reservePurpose,facilityId,userId});
            var sql = `INSERT INTO reserves (reserveDate, reserveCap, reservePurpose, facilityId, userId) VALUES (DATE_ADD(${reserveDate}, INTERVAL 1 DAY), ${reserveCap}, ${reservePurpose}, ${facilityId}, ${userId});`
            con.query(sql, function (err, result) {
                if (err) reject(err);
                // I would've wanted to say facility name, but this forces us to get name by means of JOIN
                resolve("Facility Reserved!");
            });
        });
    });
}

export default mysql_addReserve;