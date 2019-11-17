<template>
  <v-container>
    <v-row class="justify-space-between">
        <v-col>
            <v-card>
                <v-card-title>Library</v-card-title>
                <v-list class="overflow-y-auto" height="300">
                    <v-list-item
                        v-for="track in tracks"
                        :key="track.path"
                        v-on:click="selectTrack(track)"
                    >
                        <p>{{track.path.substring(track.path.length - 20, track.path.length)}}</p>
                    </v-list-item>
                </v-list>
                <v-card-actions class="justify-end">
                    <v-btn icon><v-icon>mdi-plus</v-icon></v-btn>
                    <v-btn icon><v-icon>mdi-minus</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col>
            <v-card>
                <v-card-title>Groups</v-card-title>
                <v-list class="overflow-y-auto" height="300">
                    <v-list-item
                        v-for="group in groups"
                        :key="group.name"
                        v-on:click="selectGroup(group)"
                    >
                        <p>{{group.name}}</p>
                    </v-list-item>
                </v-list>
                <v-card-actions class="justify-end">
                    <v-btn icon><v-icon>mdi-plus</v-icon></v-btn>
                    <v-btn icon><v-icon>mdi-minus</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
        <v-card
            class="d-flex flex-column justify-space-around align-center"
            width="50%"
            style="margin: auto;"
            height="100"
        >
            <audio id="TRACK">
                <source :src="defaultAudioFile" type="audio/mpeg" />
            </audio>
            <div>
                <p>{{addedTrack.path}}</p>
            </div>
            <div>
                <v-icon v-on:click="trackController(shuffleType)">{{shuffleType.state}}</v-icon>
                <v-icon v-on:click="trackController(backwardType)">{{backwardType.state}}</v-icon>
                <v-icon v-on:click="trackController(playingType)">{{playingType.state}}</v-icon>
                <v-icon v-on:click="trackController(forwardType)">{{forwardType.state}}</v-icon>
                <v-icon v-on:click="trackController(loopType)">{{loopType.state}}</v-icon>
            </div>
        </v-card>
  </v-container>
</template>

<script>
// import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import { loadTracks /*, storeTracks */ } from './TrackManager';

const AudioContext = require('web-audio-api').AudioContext;
const MusicTempo = require('music-tempo');
const fs = require('fs');

const context = new AudioContext();
const TRACK = document.getElementById("TRACK")

context.outStream = null;

const playing = {
    0: "mdi-play",
    1: "mdi-pause"
}

const loop = {
    0: "mdi-repeat-off",
    1: "mdi-repeat",
    2: "mdi-repeat-once"
}

const shuffle = {
    0: "mdi-shuffle",
    1: "mdi-shuffle-disabled"
}

export default {
    data() {
        return {
            tracks: [],
            groups: [],
            selectedGroup: null,
            currentAudio: null,
            currentTrackIndex: null,
            addedTrack: {
                "path": "None Selected",
                "bpm": null
            },
            defaultAudioFile: "../assets/SampleMusic/electronic.mp3",
            playingType: {
                state: playing[0],
                index: 0,
                id: "play"
            },
            loopType: {
                state: loop[0],
                index: 0,
                id: "loop"
            },
            shuffleType: {
                state: shuffle[0],
                index: 0,
                id: "shuffle"
            },
            forwardType: {
                state: "mdi-skip-forward",
                index: 0,
                id: "forward"
            },
            backwardType: {
                state: "mdi-skip-backward",
                index: 0,
                id: "backward"
            }
        }
    },
    methods: {
        ...mapGetters(["getTrack, getTracks"]),

        ...mapActions(["addTrack, addTracks"]),

        selectTrack: function (track) {
            this.addedTrack = track;
        },

        determineSong: async function (filePath) {
            this.addedTrack.path = filePath;
            let song = fs.readFileSync(filePath);
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

            this.addTrack(this.addedTrack);
            this.addedTrack = {
                "path": null,
                "bpm": null
            }
        },

        determineMSperBeat: function (bpm) {
            var bps = bpm / 60;
            var bpms = bps / 1000;
            var mspb = 1 / bpms;

            return mspb;
        },

        trackController: function (stateType) {
            var stateDict, numStates;

            switch (stateType.id) {
                case "loop":
                    stateDict = loop;
                    break;
                case "play":
                    this.playTrack(stateType);
                    stateDict = playing;
                    break;
                case "shuffle":
                    stateDict = shuffle;
                    break;
                case "forward":
                case "backward":
                    return;
                default:
                    console.error("Incorrect state type given to track controller.");
                    return;
            }

            numStates = Object.keys(stateDict).length;

            stateType.index += 1;
            stateType.index %= numStates;
            stateType.state = stateDict[stateType.index];
        },

        play: function (buffer) {
            let source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(context.destination);
            source.start;
        },

        playTrack: function (stateType) {
            if (stateType.id !== "play") {
                console.error(`Cannot handle play with invlaid state type: ${stateType.id} given.`);
                return;
            }

            let song;

            switch(stateType.index) {
                case 0:
                    //Play Song
                    TRACK.play();


                    break;
                case 1:
                    // Stop the song
                    break;
                default:
                    console.error(`Invalid play index of ${stateType.index} given.`);
                    break;
            }
        },
    },

    created() {
        this.tracks = loadTracks();

        console.log(this.tracks)
    }
}
</script>

<style>

</style>