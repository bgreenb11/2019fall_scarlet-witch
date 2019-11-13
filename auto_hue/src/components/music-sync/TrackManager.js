const fs = require("fs");
const path = require("path");

//Dont ask me why this works but apparently this is the path needed to access the json file.
const trackFilePath = path.join(__dirname, "..", "..", "..", "..", "..", "..", "..", "..", "tracks.json");

function loadTracks () {
    var tracks = JSON.parse(fs.readFileSync(trackFilePath));

    return tracks;
}

function storeTracks (tracks) {
    fs.writeFile(trackFilePath, JSON.stringify(tracks), err => {
        if (err) {
            console.error(err);
        }
    })
}

module.exports = {
    loadTracks,
    storeTracks
}