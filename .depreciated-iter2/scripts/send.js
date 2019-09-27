import {get_device_event} from '../utilities/database/read_db.js';

function triggerEvent(device_id, event_name){

    const sqlite3 = require('sqlite3').verbose();

    let db = new sqlite3.Database('../auto_make.db');
    
    let event = get_device_event(device_id, db, event_name);

    sendRequest(event);
}

function sendRequest(event_name){
    const fetch = require("node-fetch");
    fetch(`https://maker.ifttt.com/trigger/${event_name}/with/key/mImJmuThM0iulQ9hNA9XYJ0oAto9ShVBfYUj9VY-kTH`);
    console.log(`${event_name} fired`);
}