const mysql = require('mysql2');

const PORT = process.env.PORT || 3002;


// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: 'password',
    database: 'employee_db'
  },
  console.log(`Connected to the books_db database.`)
);

// db.query()



const startquestions = [
    {
        type: 'list',
        name: 'type',
        message: 'What would you like to do?',
        choices: [
            'View All Employess', 
            'Add Employee', 
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments', 
            'Add Department',
            'Quit']

    }
];