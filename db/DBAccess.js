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
}

module.exports = new DBAccess ( db);