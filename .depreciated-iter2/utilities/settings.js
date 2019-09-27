const fs = require('fs');

module.exports = class SettingsHelper {

    constructor(json) {
        this.data = json;
    }

    apply(setting, value) {
        this.data[setting] = value;
    }

    update() {
        var data_string = JSON.stringify(this.data);
        fs.writeFile('./settings.json', data_string, err => {
            if (err) {
                console.log("Error saving settings.");
            } else {
                console.log("Settings successfully saved.");
            }
        });
    }

    display() {
        var data_string = JSON.stringify(this.data);
        console.log(data_string);
    }

    access(setting) {
        try {
           return this.data[setting];
        } catch (error) {
            console.log(error)
        }
    }
};