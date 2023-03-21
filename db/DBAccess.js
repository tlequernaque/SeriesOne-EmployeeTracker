const db = require('./conn');

class DBAccess {

    constructor (db) {
        this.db = db;
    }

    getAllDepts() {
        return this.db.promise().query(
            "SELECT department.id, department.name FROM department;"
        )
    }

    getAllRoles(){
        return this.db.promise().query(
            "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;"
        )
    }
}

module.exports = new DBAccess ( db);