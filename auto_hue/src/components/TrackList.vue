<template>
  <div> <p>TRACK LIST</p> </div>
</template>

<script>
const AudioContext = require('web-audio-api').AudioContext;
const MusicTempo = require('music-tempo');
const fs = require('fs');

export default {
    data() {
        return {
            tracks: [],
            addedTrack: {
                "path": null,
                "bpm": null
            },
            defaultAudioFile: "/Users/jduffy/Desktop/School/Fall_2019/cs340/2019fall_scarlet-witch/auto_hue/src/assets/SampleMusic/electronic.mp3",
        }
    },
    methods: {
        determineSong: async function (filePath) {
            this.addedTrack.path = filePath;
            let song = fs.readFileSync(filePath);
            let context = new AudioContext();
            context.decodeAudioData(song, this.calculateTempo, this.issue);
        },

        issue: function () {
            this.addedTrack = {
                "path": null,
                "bpm": null
            }
        },

        calculateTempo: function  (buffer) {

            var data = [];

            // Take average of stereo channels
            if (buffer.numberOfChannels == 2) {
                var channelA = buffer.getChannelData(0);
                var channelB = buffer.getChannelData(1);
                var channelLength = channelA.length;

                for (var i = 0; i < channelLength; i++) {
                    data[i] = (channelA[i] + channelB[i]) / 2;
                }

            // Get single buffer for mono
            } else {
                data = buffer.getChannelData(0);
            }

            var mt = new MusicTempo(data);
            this.addedTrack.bpm = mt.tempo;

            // NEED TO SAVE TRACK TO STORE
        },

        determineMSperBeat: function (bpm) {
            var bps = bpm / 60;
            var bpms = bps / 1000;
            var mspb = 1 / bpms;

            return mspb;
        }
    }
}
</script>

<style>

</style>