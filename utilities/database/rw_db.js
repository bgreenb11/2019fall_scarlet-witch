module.exports =  class DB {
    constructor() {
        this.database = require('sqlite3').verbose();
        this.db = null;
    }

    open_db() {
        this.db = new this.database.Database('./auto_make.db', this.database.OPEN_READWRITE, (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });

        this.db.run(`CREATE TABLE device (
            device_id INTEGER PRIMARY KEY,
            device_name TEXT NOT NULL
        );`)
    }

    close_db() {
        // close the database connection
        this.db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
};
 

