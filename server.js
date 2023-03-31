const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const PORT = process.env.PORT || 3002;
const db = require("./db/DBAccess")

const startQuestions = () => {
  inquirer.prompt([
    {
      type: 'list',
        name: 'type',
        message: 'What would you like to do?',
        choices: [
            'View All Employees', 
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
   switch(response.type){
    case "View All Employees":
        console.log("inside case 'View All Employees");
        viewAllEmployess();
        break;
    case "View All Roles":
        viewAllRoles();
        break;
    case "View All Departments":
        viewAllDepartments();
        break;
    case "Add Employee":
        addEmployee();
        break;
    case "Add Department":
        addDepartment();
        break;
    case "Add Role":
        addRole();
        break;
   }
  })
};

function viewAllDepartments() {
    db.getAllDepts()
    .then (([dept]) => {
        console.log ('`\n');
        console.table(dept);
    })
    .then(() => startQuestions());
};

function viewAllRoles() {
    db.getAllRoles()
    .then (([role]) => {
        console.log ('`\n');
        console.table(role);
    })
    .then(() => startQuestions());
};

function viewAllEmployess() {
    console.log("In function viewAllEmployess");
    db.getAllEmpls()
    .then (([role]) => {
        console.log ('`\n');
        console.table(role);
    })
    .then(() => startQuestions());
};

const addEmployee = () =>{
    inquirer.prompt ([
        {
         type: 'input',
         name:  'firstName',
         message: 'What is the first name of the employee?'
        },
        {
         type: 'input',
         name:  'lastName',
         message: 'What is the last name of the employee?'
        },
        {
         type: 'list',
         name: 'EmployeeRole',
         message: 'What is the role of the employee?',
         choices: [
            {name:'Sales Lead', value:1},
            {name:'Salesperson',value:2}, 
            {name:'Lead Engineer', value:3},
            {name:'Software Engineer',value:4},
            {name:'Account Manager',value:5},
            {name:'Accountant',value:6}, 
            {name:'Legal Team Lead',value:7},
            {name:'Lawyer', value:8}],
        },
        {
         type: 'list',
         name: 'employeeManager',
         message: 'Who is the manager of the employee?',
         choices: [
            {name:'John Doe', value:1},
            {name:'Mike Chan', value:2}, 
            {name:'Ashley Rodriguez', value:3},
            {name:'Kevin Tupik', value:4},
            {name:'Kunal Singh', value:5},
            {name:'Malia Brown', value:6}, 
            {name:'Sarah Lourd', value:1},
            {name:'Tom Allen', value:1}],
        }
    ])
    .then((response) => {
        db.connection.query(`INSERT INTO employee ( first_name, last_name, role_id, manager_id)
        VALUES ('${response.firstName}','${response.lastName}',${response.EmployeeRole}, ${response.employeeManager})`,(err,data) =>{
            if(err) throw err;
            console.log(data)
            viewAllEmployess()
        })
    })
}

const addDepartment = () =>{
    inquirer.prompt ([
        {
         type: 'input',
         name:  'departmentName',
         message: 'What is the name of the department?'
        },
        
    ])
    .then((response) => {
        db.connection.query(`INSERT INTO department (name)
        VALUES ('${response.departmentName}')`,(err,data) =>{
            if(err) throw err;
            console.log(data)
            viewAllEmployess()
        })
    })
}

const addRole = () =>{
    inquirer.prompt ([
        {
         type: 'input',
         name:  'roleName',
         message: 'What is the name of the role?'
        },
        {
         type: 'input',
         name:  'roleSalary',
         message: 'What is the salery of the role?'
        },
        {
         type: 'list',
         name: 'roleDepartment',
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
        db.connection.query(`INSERT INTO role ( title, salary,)
        VALUES ('${response.roleName}','${response.roleSalary}')`,(err,data) =>{
            if(err) throw err;
            console.log(data)
            .then(() => startQuestions());
        })
    
    })
};

startQuestions();