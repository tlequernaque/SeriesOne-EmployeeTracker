const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const PORT = process.env.PORT || 3002;

const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

const startQuestions = () => {
  inquirer.prompt([
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
            'Quit'],
    },
  ])
  .then((response) => {
    
  })
};

const addEmployee = () =>{
    inquirer.prompt ([
        {
         type: 'input',
         Name:  'firstName',
         message: 'What is the first name of the employee?'
        },
        {
         type: 'input',
         Name:  'firstName',
         message: 'What is the last name of the employee?'
        },
        {
         type: 'list',
         name: 'EmployeeRole',
         message: 'What is the role of the employee?',
         choices: [
            'Sales Lead', 
            'Salesperson', 
            'Lead Engineer',
            'Software Engineer',
            'Account Manager',
            'Accountant', 
            'Legal Team Lead',
            'Lawyer'],
        },
        {
         type: 'list',
         name: 'employeeManager',
         message: 'Who is the manager of the employee?',
         choices: [
            'John Doe', 
            'Mike Chan', 
            'Ashley Rodriguez',
            'Kevin Tupik',
            'Kunal Singh',
            'Malia Brown', 
            'Sarah Lourd',
            'Tom Allen'],
        }
    ])
    .then((response) => {
    
    })
}

const addDepartment = () =>{
    inquirer.prompt ([
        {
         type: 'input',
         Name:  'departmentName',
         message: 'What is the name of theh department?'
        },
    ])
    .then((response) => {
    
    })
}

const addRole = () =>{
    inquirer.prompt ([
        {
         type: 'input',
         Name:  'roleName',
         message: 'What is the name of the role?'
        },
        {
         type: 'input',
         Name:  'roleSalery',
         message: 'What is the salery of the role?'
        },
        {
         type: 'list',
         name: 'role department',
         message: 'Which department does the role belong to?',
         choices: [
            'Engineering', 
            'Finance', 
            'Legal',
            'Sales',
            'Service'],
        },
    ])
    .then((response) => {
    
    })
}