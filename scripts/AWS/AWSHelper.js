const AWS = require('aws-sdk');
AWS.config.loadFromPath(process.cwd() + '/config.json');

let iot = new AWS.Iot();


// Remove if you want to stop creating thing
console.log("Creating SDK Thing");

iot.createThing({thingName: 'SDKTestThing'}, (data, err) => {
    if (err) console.log(err);
    else console.log(data);
});


// Code to list things associated with accounts
console.log("Listing All Things");

iot.listThings({}, (data, err) => {
    if (err) console.log(err);
    else console.log(data);
});

// Remove if you want to keep new thing
console.log("Deleting SDK Thing");

iot.deleteThing({thingName: 'SDKTestThing'}, (data, err) => {
    if (err) console.log(err);
    else console.log(data);
});