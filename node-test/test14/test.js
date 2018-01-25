var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'test'
});

connection.connect();

var sql="SELECT * FROM websites";
connection.query(sql, function (error, result, fields) {
    if (error){
        console.log('[SELECT ERROR] - ',error.message);
        return
    };
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});

connection.end();