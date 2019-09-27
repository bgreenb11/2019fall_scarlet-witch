const AWS = require('aws-sdk');
AWS.config.loadFromPath(process.cwd() + '/config.json');

// DB RELATED

function listAllTables() {
    var params = {};
    var return_vals = {};
    var db = new AWS.DynamoDB();
    db.listTables(params, (data, err) => {
        if (err) console.log(err);
        else console.log(data);
        return_vals = data;
    });

    return return_vals;
}


// IOT RELATED

function addIotThing(thing) {
    var params = {
        thingName: thing['name']
    };
    var return_vals = {};
    var iot = new AWS.Iot();
    iot.createThing(params, (data, err) => {
        if (err) console.log(err);
        else console.log(data);
        return_vals = data;
    });

    return return_vals;
}


function listAllIotThings(thing) {
    var params = {
        attributeName: thing['attrName'],
        attributeValue: thing['attrValue'],
        maxResults: thing['resultCap'],
        thingTypeName: thing['typeName']
    };
    var return_vals = {};
    var iot = new AWS.Iot();
    iot.listThings(params, (data, err) => {
        if (err) console.log(err);
        else console.log(data);
        return_vals = data;
    });

    return return_vals;
}


function deleteIotThing(thing) {
    var params = {
        thingName: thing['name']
    };
    var return_vals = {};
    var iot = new AWS.Iot();
    iot.deleteThing(params, (data, err) => {
        if (err) console.log(err);
        else console.log(data);
        return_vals = data;
    });

    return return_vals;
}

