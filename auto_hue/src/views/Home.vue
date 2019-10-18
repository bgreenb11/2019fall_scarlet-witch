<template>
  <div class="home">
    <HelloWorld />
    <!-- <HueHelper /> -->
    <v-btn @click="test">Add Devices</v-btn>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
// import HueHelper from "../components/HueHelper";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  components: {
    HelloWorld
    // HueHelper
  },
  methods: {
    test: function() {
      axios.get("https://discovery.meethue.com").then(response => {
        response.data.forEach(element => {
          console.log(element);
          this.addB(element);
        });
      });
    },
    addB: element => {
      const bridge = {
        name: element.id,
        ipaddress: element.internalipaddress
      };
      mapActions(["addBridges"], bridge);
    }
  }
};
</script>
