const mysql2 = require('mysql2');
require('dotenv').config();

// connect to database
const db = mysql2.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);


 
//  export database
module.exports = db;