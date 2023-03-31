 const db = require('./conn');

class DBAccess {

    constructor (db) {
        this.connection = db;
    }

    getAllDepts() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        )
    }

    getAllRoles(){
        return this.connection.promise().query(
            "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;"
        )
    }

    getAllEmpls(){
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary AS salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
    }
    
}

module.exports = new DBAccess ( db);