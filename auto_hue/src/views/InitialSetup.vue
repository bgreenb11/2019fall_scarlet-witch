<template>
  <v-card width="350" height="auto" min-height="300" class="mx-auto my-8 inline-block">
    
    <v-container>
        <v-row no-gutters justify="space-between">
            <v-col align="center">
            <p class="display-1 text-center text-uppercase">Welcome</p>
            </v-col>
        </v-row>
        <v-row no-gutters justify="space-between">
            <v-col align="center">
                <p v-if="bridges.length !== 0 || index === 0" class="subtitle-2 text-center text-uppercase">{{this.pages[this.index]}}</p>
                <p v-if="bridges.length === 0 && index === 1" class="subtitle-2 text-center text-uppercase">{{this.missing}}</p>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col align="center">
                <v-img v-if="index === 0" width="300" height="300" src="../assets/HueBridgeSetup/huebridge.svg" />
                <v-img v-if="index === 1" width="300" height="300" src="../assets/HueBridgeSetup/huebridgefail.svg" />
                <v-img v-if="index === 2" width="300" height="300" src="../assets/HueBridgeSetup/huebridgepress.svg" />
                <v-img v-if="index === 3" width="300" height="300" src="../assets/HueBridgeSetup/huebridgesuccess.svg" />
                <v-img v-if="index === 4" width="300" height="300" src="../assets/HueBridgeSetup/huebridgefail.svg" />
            </v-col>
        </v-row>
        <v-row v-if="index === 1" no-gutters justify="space-between">
          <v-col align="center">
            <v-list v-if="bridges.length !== 0" class="overflow-y-auto" max-height="300">
              <v-list-item
                v-for="bridge in bridges"
                :key="bridge.id"
                v-on:click="chooseBridge(bridge)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="bridge.id" />
                  <v-list-item-subtitle v-text="bridge.internalipaddress" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-text-field
               v-if="bridges.length === 0"
              placeholder="IP"
              outline
              :rules="[rules.required, rules.ip]"
                v-model="bridge_ip"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-around">
            <v-col align="center">
                <v-btn :disabled="loading" :loading="loading" block text v-on:click="navigate">Next</v-btn>
                <v-btn v-if="index === (pages.length - 1)" :disabled="loading" :loading="loading" block text v-on:click="navigate">Quit</v-btn>
            </v-col>
        </v-row>
    </v-container>

    <!--
    <div v-if="index === 0">
      <v-container>
        <v-row no-gutters justify="space-between">
          <v-col align="center">
            <p class="display-1 text-center text-uppercase">Welcome</p>
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-between">
          <v-col align="center">
            <p class="subtitle-2 text-center text-uppercase">{{this.pages[this.index]}}</p>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col align="center">
            <v-img width="300" height="300" src="../assets/HueBridgeSetup/huebridge.svg" />
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-around">
          <v-col align="center">
            <v-btn block text v-on:click="navigate">Next</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="index === 1">
      <v-container>
        <v-row no-gutters justify="space-between">
          <v-col align="center">
            <p class="display-1 text-center text-uppercase">Setup</p>
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-between">
          <v-col align="center">
            <p v-if="bridges.length !== 0" class="subtitle-2 text-center text-uppercase">{{this.pages[this.index]}}</p>
            <p v-if="bridges.length === 0" class="subtitle-2 text-center text-uppercase">{{this.missing}}</p>
          </v-col>
        </v-row>
        <v-row v-if="bridges.length === 0" no-gutters>
          <v-col align="center">
            <v-img width="300" height="300" src="../assets/HueBridgeSetup/huebridgefail.svg" />
          </v-col>
        </v-row>
        <v-row v-if="bridges.length !== 0" no-gutters justify="space-between">
          <v-col align="center">
            <v-list class="overflow-y-auto" max-height="300">
              <v-list-item
                v-for="bridge in bridges"
                :key="bridge.id"
                v-on:click="chooseBridge(bridge)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="bridge.id" />
                  <v-list-item-subtitle v-text="bridge.internalipaddress" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="index === 2">
      <v-container>
        <v-row no-gutters justify="space-between">
          <v-col align="center">
            <p class="display-1 text-center text-uppercase">Setup</p>
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-between">
          <v-col align="center">
            <p class="subtitle-2 text-center text-uppercase">{{this.pages[this.index]}}</p>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col align="center">
            <v-img width="300" height="300" src="../assets/HueBridgeSetup/huebridgepress.svg" />
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-around">
          <v-col align="center">
            <v-btn :disabled="loading" :loading="loading" block text v-on:click="navigate">Next</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="index === 3 || index === 4">
      <v-container>
        <v-row no-gutters justify="space-between">
          <v-col align="center">
            <p class="display-1 text-center text-uppercase">Setup</p>
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-between">
          <v-col align="center">
            <p class="subtitle-2 text-center text-uppercase">{{this.pages[this.index]}}</p>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col align="center">
            <v-img v-if="index === 3" width="300" height="300" src="../assets/HueBridgeSetup/huebridgesuccess.svg" />
            <v-img v-if="index === 4" width="300" height="300" src="../assets/HueBridgeSetup/huebridgefail.svg" />
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-around" v-if="index === 3">
          <v-col align="center">
            <v-btn block text v-on:click="navigate">Proceed</v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-between" v-if="index === 4">
          <v-col align="center">
            <v-row>
            <v-btn
              :disabled="loading"
              :loading="loading"
              block
              text
              v-on:click="navigate"
            >Try Again</v-btn>
            <v-btn block text v-on:click="navigate">Quit</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
    -->
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      index: 0,
      bridges: [],
      bridge: null,
      hash_username: null,
      loading: false,
      connected: false,
      bridge_ip: null,
      missing: "We could not find a bridge on the network. Please enter your bridge's IP address below.",
      pages: [
        "Please locate your bridge.",
        "Please select your bridge below.",
        "Press and hold the center button on your bridge. While holding, press the next button below. This process should take about 10 seconds.",
        "Success!",
        "Sorry. We couldn't find your bridge. Please make sure to press and hold the center button when trying to link. Would you like to try again?"
      ],
      rules: {
          required: value => !!value || 'Required.',
          ip: value => {
              const ip_pattern = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
              return ip_pattern.test(value) || 'Invalid IP.';
          }
      }
    };
  },
  methods: {
    ...mapGetters(["getBridge"]),
    ...mapActions(["setBridge"]),
    navigate: function() {
      console.log(this.index);
      switch (this.index) {
        case 0:
          this.index += 1;
          this.findAllBridges();
          break;
        case 1:
            if (this.bridge_ip !== null) {
                this.bridge = {
                    id: "GeneratedFromAutoHue",
                    internalipaddress: this.bridge_ip
                }
                this.bridges.push(this.bridge);
                this.index += 1;
            }

            break;
        case 2:
          this.loading = true;
          this.start_linkBridge();
          break;
        case 3:
          this.setBridge(this.bridge);
          console.log("Done");
          break;
        case 4:
          this.loading = true;
          this.start_linkBridge();
          break;
      }
    },
    findAllBridges: function() {
      axios.get("https://discovery.meethue.com").then(response => {
        this.connected = true;
        this.bridges = response.data;
      });
    },
    chooseBridge: function(b) {
      console.log(this.index);
      this.bridge = b;
      this.index += 1;
    },
    start_linkBridge: function() {
      console.log(this.index);
      self = this;
      setTimeout(function() {
        self.linkBridge();
      }, 10000);

    },
    linkBridge: function() {
      var json = {
        devicetype: "auto_hue#desktop user"
      };
      try {
        axios
            .post(`http://${this.bridge.internalipaddress}/api/`, json)
            .then(response => {
            this.loading = false;
            console.log(this.loading);
            try {
                this.hash_username = response.data[0].success.username;
                this.index = this.pages.length - 2;
            } catch (error) {
                console.error(error);
                this.index = this.pages.length - 1;   
            }
            })
            .catch(error => {
            
            });
      } catch (error) {
          console.error(error);
          this.index = 0;
          // Reset setup or close out
      }
    }
  },
  watch: {
    loader() {}
  }
};
</script>