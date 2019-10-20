<template>
  <v-container>
    <div class="devices">
      <h1>Devices</h1>
      <Carousel :navigationEnabled="true" :perPageCustom="[[480, 2], [768, 3]]">
        <Slide v-for="device in allDevices" :key="device.id" class="device">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>{{ device.name }}</v-card-title>
            <v-card-text>Color: {{ device.color ? device.color[0].toUpperCase() + device.color.slice(1) : "None" }}</v-card-text>
          </v-card>
        </Slide>
      </Carousel>
      <h1>Bridges</h1>
      <Carousel :navigationEnabled="true" :perPageCustom="[[480, 2], [768, 3]]">
        <Slide v-for="bridge in allBridges" :key="bridge.ipaddress" class="bridge">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>{{ bridge.name }}</v-card-title>
            <v-card-text>IP Address: {{ bridge.ipaddress }}</v-card-text>
          </v-card>
        </Slide>
      </Carousel>
      <v-btn @click="test">Find Devices</v-btn>
    </div>
  </v-container>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Devices",
  data: () => {
    return { bridges: [] };
  },
  components: {
    Carousel,
    Slide
  },
  computed: mapGetters(["allDevices", "allBridges"]),
  methods: {
    test: function() {
      axios.get("https://discovery.meethue.com").then(response => {
        response.data.forEach(element => {
          console.log(element);
          element = this.addB(element);
          this.addBridges(element);
        });
      });
    },
    ...mapActions(["addBridges"]),
    addB: element => {
      const bridge = {
        name: element.id,
        ipaddress: element.internalipaddress
      };
      return bridge;
    }
  }
};
</script>
