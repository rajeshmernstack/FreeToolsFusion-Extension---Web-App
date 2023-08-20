const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "freetoolsfusion"
})

connection.connect(function(err){
    if(err) throw err;
    console.log("Successfully Connected");

});



module.exports = connection;