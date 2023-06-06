const mysql2 = require('mysql2');
require('dotenv').config();

// connect to database
const db = mysql2.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    });

    db.connect(function(error){
        
        console.log(`Connected to the employee_db database.`)
        //startQuestions()
        if (error) {
            throw error;
        }
    });
 
//  export database
module.exports = db;