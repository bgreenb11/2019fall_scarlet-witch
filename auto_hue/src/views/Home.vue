<template>
  <div class="home">
    <!--HelloWorld / -->
    <!-- <HueHelper /> -->
    <!-- v-btn @click="test">Add Devices</v-btn -->
    <InitialSetup />
  </div>
</template>

<script>
import InitialSetup from "./InitialSetup";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  components: {
    InitialSetup,
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
