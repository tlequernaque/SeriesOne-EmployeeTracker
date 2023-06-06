const inquirer = require('inquirer');
const db = require('../config/connection')
const mysql2 = require('mysql2');
const { query } = require('../config/connection');
const cTable = require('console.table');
const figlet = require('figlet');
const colors = require('colors/safe');

const viewAllDeptQuery = require('./viewAllDeptQuery');
const viewAllRolesQuery = require('./viewAllRolesQuery');
const viewAllEmployeesQuery = require('./viewAllEmployeesQuery');

// prompt questions array
const initialPromptQuestions = [
  {
    type: 'list',
    name: 'initialPrompt',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Delete Employee',
      'End'
    ]
  },
];

const initialPrompt = async () => {
  await inquirer.prompt(initialPromptQuestions).then((answers) => {
    console.log('Answer:', answers.initialPrompt);
    const answer = answers.initialPrompt;
    switch (answer) {

      case 'View All Departments':
        viewAllDepartments();
        console.log('I want to view all deparments.');
        break;

      case 'View All Roles':
        viewAllRoles();
        console.log('I want to view all roles.');
        break;

      case 'View All Employees':
        viewAllEmployees();
        console.log('I want to view all employees.');
        break;

      case 'Add Department':
        addDepartment();
        break;

      case 'Add Role':
        addRole();
        console.log('I want to add a role.');
        break;

      case 'Add Employee':
        addEmployee();
        console.log('I want to add an employee.');
        break;

      case 'Update Employee Role':
        updateEmployeeRole();
        console.log('I want to update an employee role.');
        break;

      case 'Delete Employee':
        deleteEmployee();
        console.log('I want to delete an employee');
        break;

      default:
        db.end();
        bye();
        process.exit();
    }
  });
};

// Functions defined 

// view all departments function
const viewAllDepartments = async () => {
  const data = await new Promise((resolve, reject) => {
    db.query(viewAllDeptQuery, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    });
  });
  console.log('');
  console.table(data);
  initialPrompt();
};

// view all roles function
const viewAllRoles = async () => {
  const data = await new Promise((resolve, reject) => {
    db.query(viewAllRolesQuery, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  console.log('');
  console.table(data);
  initialPrompt();
};

// view all employees function
const viewAllEmployees = async () => {
  const data = await new Promise((resolve, reject) => {
    db.query(viewAllEmployeesQuery, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    });
  });
  console.log('');
  console.table(data);
  initialPrompt();
};

// add department function
const addDepartment = async () => {
  await inquirer.prompt([
    {
      type: 'input',
      message: 'Which Department would you like to Add?',
      name: 'depts',
    },
  ])
    .then((answers) => {
      const department = answers.depts;
      const sql = `INSERT INTO department (dep_name) VALUES ('${department}')`;
      db.query(sql, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log('');
          initialPrompt();
        }
      });
    });
};

// add role function
const addRole = () => {
  db.query(`SELECT id, dep_name FROM department`,
    async function (err, results) {
      if (err) {
      } else {
        let deptArray = results.map((obj) => {
          return { value: obj.id, name: obj.dep_name };
        });
        await inquirer.prompt([
          {
            type: 'input',
            name: 'roleTitle',
            message: 'What Role would you like to add?',
          },
          {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the Role?',
          },
          {
            type: 'list',
            name: 'roleDept',
            message: 'What is the Department for the Role?',
            choices: deptArray,
          },
        ])
          .then((answers) => {
            const title = answers.roleTitle;
            const salary = answers.roleSalary;
            const department = answers.roleDept;
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${title}', ${salary}, ${department})`,
              function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('');
                  initialPrompt();
                }
              });
          });
      }
    })
}

// add employee function
const addEmployee = () => {
  db.query(
    `SELECT id, title FROM roles`,
    async function (err, results) {
      if (err) {
        console.log(err);
      } else {
        // map the results to a key : value pair for inquirer
        let roleQueryArray = results.map((obj) => {
          return { value: obj.id, name: obj.title };
        });
        const queryEmployees = `SELECT id, first_name, last_name FROM employees ORDER BY id ASC`;
        db.query(queryEmployees, async function (err, results) {
          if (err) {
            console.log(err);
          } else {
            let employeeQueryArray = results.map((obj) => {
              return {
                value: obj.id,
                name: obj.first_name + ' ' + obj.last_name,
              };
            });
            employeeQueryArray.push({ value: 'NULL', name: 'None' });
            await inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'firstName',
                  message: 'What is the employee\'s first name?',
                },
                {
                  type: 'input',
                  name: 'lastName',
                  message: 'What is the employee\'s last name?',
                },
                {
                  type: 'list',
                  name: 'employeeRole',
                  message: 'What is the employee\'s role?',
                  choices: roleQueryArray,
                },
                {
                  type: 'list',
                  name: 'manager',
                  message: 'Who is the employees Manager',
                  choices: employeeQueryArray,
                },
              ])
              .then((answers) => {
                const first = answers.firstName;
                const last = answers.lastName;
                const role = answers.employeeRole;
                const manager = answers.manager;
                const addEmployeeQuery = `
                  INSERT INTO employees (first_name, last_name, role_id, manager_id)
                  VALUES ('${first}', '${last}', ${role}, ${manager})`;
                db.query(addEmployeeQuery, async function (err, results) {
                  if (err) {
                    console.log(err);
                  }
                });
                console.log('');
                initialPrompt();
              });
          }
        });
      }
    }
  );
};

// update employee role function
const updateEmployeeRole = () => {
  db.query(
    `SELECT id, employees.first_name, employees.last_name FROM employees`,
    async function (err, results) {
      if (err) {
        console.log(err);
      } else {
        let employeeQueryArray = results.map((obj) => {
          return {
            value: obj.id,
            name: obj.first_name + ' ' + obj.last_name,
          };
        });
        // run query to get all roles to be selected
        db.query(`SELECT id, title FROM roles`,
          async (err, results) => {
            if (err) {
              console.log(err);
            } else {
              // map array to be in value: <id>, name: <title> format
              let roleQueryArray = results.map((obj) => {
                return {
                  value: obj.id,
                  name: obj.title,
                };
              });
              await inquirer
                .prompt([
                  {
                    type: 'list',
                    name: 'employeeName',
                    message: `Which employee's role do you want to update?`,
                    choices: employeeQueryArray,
                  },
                  {
                    type: 'list',
                    name: 'roleName',
                    message:
                      'Which role do you want to assign the selected employee?',
                    choices: roleQueryArray,
                  },
                ])
                .then((answers) => {
                  const id = answers.employeeName;
                  const roleId = answers.roleName;
                  db.query(
                    `UPDATE employees SET role_id = ${roleId} WHERE id = ${id}`,
                    (err, results) => {
                      if (err) {
                        console.log(err);
                      }
                      console.log('');
                      initialPrompt();
                    }
                  );
                });
            }
          });
      }
    }
  );
};

// delete employee from database 
const deleteEmployee = () => {
  let query = "SELECT employees.id, employees.first_name, employees.last_name FROM employees;";
  // connect to mySQL using query instruction 1 to access data from roles table
  db.query(query, function (err, res) {
    // throw error if there is issue accessing data
    if (err) throw err;
    // combine names from first_name/ last_name cols to be displayed in terminal
    for (i = 0; i < res.length; i++) {
      // create new row called manager, containing each employee's manager name
      res[i].employee = res[i].first_name + " " + res[i].last_name;
      // remove first_name from res so as to not display it
      delete res[i].first_name;
      // remove last_name from res so as to not display it
      delete res[i].last_name;
    };
    // print data retrieved to terminal in table format 
    console.table(res);
    // assign data from employees table (res) to employeeList
    let employeeList = res;
    // array of actions to prompt user
    let addEmpPrompt = [
      {
        name: "select_employee",
        type: "list",
        message: "Terminate employee",
        // dynamic choises using employeeList (first_name and last_name cols of employees table)
        choices: function () {
          // init employees array - used to return existing employee names as choises array prompted to user
          employees = [];
          // loop through employeeList to extract the employee names from employeeList which is an object array containing data from employees table in the form of rowPackets
          for (i = 0; i < employeeList.length; i++) {
            // concat mId, first_name, and last_name strings and push the resulting string into our employees (choises) array
            employees.push(employeeList[i].id + ": " + employeeList[i].employee);
          };
          // add string "0: None" to the beginning of employees (choises)
          employees.unshift("0: Exit");
          // return employees (choises) array to be rendered by inquirer to the user 
          return employees;
        }
      },
      {
        name: "confirm",
        type: "list",
        // dynamic message using user selected employee name
        message: function (answers) {
          return "Are you sure you want to TERMINATE " + answers.select_employee.split(": ")[1];
        },
        // prompt user to pick between Yes and No
        choices: ["Yes", "No"],
        // dont use this prompt if user selected Exit in previous prompt
        when: function (answers) {
          return answers.select_employee !== "0: Exit";
        }
      }
    ];
    // prompt user actions using inquirer 
    inquirer.prompt(addEmpPrompt)
      // await user responce from inquirer
      .then(function (answer) {
        // if user selects "0: Exit" return to main menu
        if (answer.select_employee == "0: Exit") {
          // prompt user for next action
          initialPrompt();
          // if user selects "No" restart deleteEmployee
        } else if (answer.confirm == "No") {
          // prompt user for next action
          deleteEmployee();
        } else {
          // SQL command to insert new data in employees table
          let query = "DELETE FROM employees WHERE employees.id =" + answer.select_employee.split(": ")[0];
          // connect to mySQL using query instruction to insert new employee in employee table
          db.query(query, function (err, res) {
            // throw error if there is issue writing data
            if (err) throw err;
          });
          // array of actions to prompt user
          let addagainPrompt = [
            {
              name: "again",
              type: "list",
              message: "Would you like to remove another employee?",
              choices: ["Yes", "Exit"]
            }
          ];
          // prompt user actions using inquirer 
          inquirer.prompt(addagainPrompt)
            // await user responce from inquirer
            .then(function (answer) {

              // SQL command to get data from employees table
              let query = "SELECT employees.id, employees.first_name, employees.last_name FROM employees;";
              // connect to mySQL using query instruction to access data from roles table
              db.query(query, function (err, res) {
                // throw error if there is issue accessing data
                if (err) throw err;
                // combine names from first_name/ last_name cols to be displayed in terminal
                for (i = 0; i < res.length; i++) {
                  // create new row called manager, containing each employee's manager name
                  res[i].employee = res[i].first_name + " " + res[i].last_name;
                  // remove first_name from res so as to not display it
                  delete res[i].first_name;
                  // remove last_name from res so as to not display it
                  delete res[i].last_name;
                };
                // execute function updateEmployee again if user selection is "Yes"
                if (answer.again == "Yes") {
                  // prompt add new employee to employee_db
                  deleteEmployee();
                  // update employee first/ last_name table in terminal, and execute function cli_prompt if user selection is "Exit"
                } else if (answer.again == "Exit") {

                  // print data retrieved to terminal in table format 
                  console.table(res);
                  // prompt user for next action
                  initialPrompt();
                };
              });
            });
        };
      });
  });
};


const bye = () => {
  console.log(``);
  console.log(``);
  console.log(colors.rainbow(figlet.textSync('bye!')));
  console.log(``);
  console.log(``);
}

module.exports = initialPrompt;