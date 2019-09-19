
function sendRequest(event_name){
    const fetch = require("node-fetch");
    fetch(`https://maker.ifttt.com/trigger/${event_name}/with/key/mImJmuThM0iulQ9hNA9XYJ0oAto9ShVBfYUj9VY-kTH`);
    console.log(`${event_name} fired`);
}