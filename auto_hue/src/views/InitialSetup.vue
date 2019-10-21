<template>
  <v-card max-width="500" min-height="300" class="mx-auto my-8 inline-block">
    <div v-if="index === 0">
      <v-container>
        <v-col cols="auto">
          <v-row justify="center" align="center">
            <v-card-title class="headline">Welcome!</v-card-title>
          </v-row>
          <v-row justify="center" align="center">
            <v-card-text class="text-center">{{this.pages[this.index]}}</v-card-text>
          </v-row>
          <v-row>
            <v-card-actions>
              <v-btn v-on:click="navigate">Next</v-btn>
            </v-card-actions>
          </v-row>
        </v-col>
      </v-container>
    </div>
    <div v-if="index === 1">
      <v-list two-line class="overflow-y-auto" max-height="300">
        <v-list-item v-for="bridge in bridges" :key="bridge.id" v-on:click="chooseBridge(bridge)">
          <v-list-item-content>
            <v-list-item-title v-text="bridge.id" />
            <v-list-item-subtitle v-text="bridge.internalipaddress" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div v-if="index === 2">
      <v-container>
        <v-col cols="auto">
          <v-row justify="center" align="center">
            <v-card-title class="headline">Setup</v-card-title>
          </v-row>
          <v-row justify="center" align="center">
            <v-card-text class="text-center">{{this.pages[this.index]}}</v-card-text>
          </v-row>
          <v-row justify="center" align="center" height="auto" width="auto">
            <v-img contain width="200" height="200" src="../assets/huebridgediagram.svg" />
          </v-row>
        </v-col>
      </v-container>
    </div>
    <div v-if="index === 3">
      <v-container>
        <v-col cols="auto">
          <v-row justify="center" align="center">
            <v-card-title class="headline">Setup</v-card-title>
          </v-row>
          <v-row justify="center" align="center">
            <v-card-text class="text-center">{{this.pages[this.index]}}</v-card-text>
          </v-row>
        </v-col>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      index: 0,
      bridges: [],
      bridge: null,
      hash_username: null,
      pages: [
        "Please locate your bridge.",
        "Please select your bridge:",
        "Press and hold the center button on your bridge.",
        "Success!",
        "Sorry. We couldn't find your bridge. Please make sure to press and hold the center button when trying to link. Would you like to try again?"
      ]
    };
  },
  methods: {
    navigate: function() {
      switch (this.index) {
        case 0:
          this.index += 1;
          this.findAllBridges();
          break;
        case 2:
          console.log("Done");
          break;
        case 3:
          this.linkBridge();
          break;
        default:
          console.log(this.index);
          break;
      }
    },
    findAllBridges: function() {
      axios.get("https://discovery.meethue.com").then(response => {
        this.bridges = response.data;
      });
    },
    chooseBridge: function(b) {
      this.bridge = b;
      this.index += 1;
      console.log(this.index);
      this.start_linkBridge();
    },
    start_linkBridge: function() {
      self = this;
      setTimeout(function() {
        self.linkBridge();
      }, 10000);
    },
    linkBridge: function() {
      console.log("linking")
      var json = {
        devicetype: "auto_hue#desktop user"
      };
      axios
        .post(`http://${this.bridge.internalipaddress}/api/`, json)
        .then(response => {
          console.log(JSON.stringify(response));
          this.hash_username = response.data[0].success.username;
          console.log(this.hash_username);
          this.index += 1;
        });
    }
  }
};
</script>