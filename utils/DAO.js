const mysql=require("mysql");
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'test',
    database : 'order_system'
});
connection.connect();
module.exports=query=>{
    return new Promise((resolve,reject)=>{
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        });
    })
};
