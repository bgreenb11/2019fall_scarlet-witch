// This class will act as the interface between the database and the electron app

let read =  require('./read_db');

module.exports =  class DB {
    constructor() {
        this.database = require('sqlite3').verbose();
        this.db = null;
    }

    /**
     * Method to open db
     * Takes no arguments
     */
    open_db() {
        this.db = new this.database.Database('./auto_make.db', (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Connected to the SQlite database.');
        }); 
    }

    /**
     * 
     * @param {string} model_type 
     */
    create_db(model_type) {
        if(model_type === 'devices'){
            this.db.run(`CREATE TABLE IF NOT EXISTS devices (
                device_id INTEGER PRIMARY KEY,
                device_name TEXT NOT NULL
            );`)
        }
        else if(model_type === 'data_entry'){
            this.db.run(`CREATE TABLE IF NOT EXISTS device_data (
                data_entry INTEGER PRIMARY KEY,
                data_type TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                device_id INTEGER NOT NULL,
                FOREIGN KEY (device_id) 
                    REFERENCES device (device_id)
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
            );`)
        }
    }

    /**
     *
     * Method to write to db
     * @param {string} [table=null]
     * @param {string} [write_method=null]
     * @param {JSON} [item=null]
     */
    write_db(table=null, write_method=null, item=null) {
        // Insert option to populate device or data into either table
        if(write_method === 'INSERT'){
            if(table === 'devices'){
                this.db.run(`INSERT INTO devices (device_name, device_id)
                    VALUES(${item.name}, ${item.id})
                ;`)
            }
            else if(table === 'device_data'){
                this.db.run(`INSERT INTO device_data (data_type, device_id, data_entry)
                    VALUES(${item.name}, ${item.id}, ${item.data})
                ;`)
            }
        }

        // Update option if user changes device name
        else if(write_method === 'UPDATE'){
            if(table === 'devices'){
                this.db.run(`UPDATE devices 
                    SET device_name = ${item.name}
                    WHERE device_id = ${item.id}
                ;`)
            }
        }

        // Delete option to delete device/data_entry
        else if(write_method === 'DELETE'){
            if(table === 'devices'){
                this.db.run(`DELETE FROM devices WHERE device_id=${item.id}`)
            }
            else if(table === 'device_data'){
                this.db.run(`DELETE FROM device_data WHERE data_entry=${item.id}`)
            }
        } 
    }

    /**
     * Method to read from db
     *
     * @param {int} time
     * @param {string} unit
     */
    read_db(time=-1, unit="", item=null) {
        if(time === -1 || unit === ""){
            console.error("read_db usage: time = integer > 0, unit = unit of time")
        }

        let data = read.get_device_data(item, time, unit, this.db);

        console.log(data);

        this.db.serialize(() => {
            this.db.each(`SELECT device_id as id,
                            device_name as name
                        FROM devices;`, (err, row) => {
              if (err) {
                console.error(err.message);
              }
              console.log(row.id + "\t" + row.name);
            });
        });
    }

    /**
     * Method to close db connection
     */
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
 