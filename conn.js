const mysql = require('mysql2');

const db = mysql.createConnection(
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

    module.exports = db;
