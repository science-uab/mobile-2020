const mysql = require('mysql');

const conn = mysql.createPool({
    connectionLimit: 20,
    password: "phpRandomPasswordAPI",
    user: "php_api",
    database: "firmaX",
    host: "192.168.1.150",
    port: "3307"
});


// var con = mysql.createConnection({
//     connectionLimit: 20,
//     password: "phpRandomPasswordAPI",
//     user: "php_api",
//     database: "firmaX",
//     host: "192.168.1.150",
//     port: "3307"
//   });

let pordDb = {};

pordDb.allItems = () => {
    // console.log('querydb');
    // return new Promise((resolve, reject) => {
    //     conn.getConnection(function(err){
    //     if (err) console.log(err);
    //     console.log("Connected!");
    //         conn.query(`SELECT * FROM all_users`, (err, results) => {
    //             if(err) return reject(err);
    //             console.log("Result: " + JSON.stringify(result));
    //             return resolve(results);
    //         });
    //     });        
    // });

    conn.getConnection(function(err) {
        if (err) console.log(err);
        console.log("Connected!");
        conn.query(`SELECT * FROM all_users`, function (err, result) {
            if (err) console.log(err);
          console.log("Result: " + JSON.stringify(result));
          return result;
        });
      });
};

module.exports = pordDb;