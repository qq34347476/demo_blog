const mysql = require('mysql')


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql_001',
    multipleStatements:true // 支持执行多条 sql 语句
})


module.exports = conn