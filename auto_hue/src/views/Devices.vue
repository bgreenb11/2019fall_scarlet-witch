<template>
  <v-container>
    <div class="devices">
      <h1>Devices</h1>
      <Carousel :navigationEnabled="true" :perPageCustom="[[480, 2], [768, 3]]">
        <Slide v-for="device in devices" :key="Object.keys(device.id)" class="device">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>{{ device.name }}</v-card-title>
            <v-card-text>Color: {{ device.state.xy ? device.state.xy : "None" }}</v-card-text>
            <router-link :to="{name: 'device', params: {id: device.id}}">
              <v-btn text>
                <span class="mr-2">Device Page</span>
              </v-btn>
            </router-link>
          </v-card>
        </Slide>
      </Carousel>
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
    return {
      devices: [],
      user: "",
      bridge: ""
    };
  },
  components: {
    Carousel,
    Slide
  },
  mounted: function() {
    this.user = this.getUser();
    this.bridge = this.getBridge();
    this.findDevices();
    this.devices = this.allDevices();
  },
  methods: {
    ...mapActions(["addDevices"]),
    ...mapGetters(["allDevices", "getBridge", "getUser"]),
    findDevices() {
      axios
        .get(`http://${this.bridge}/api/${this.user}/lights`)
        .then(response => {
          console.log(Object.keys(response.data));
          let devices = [];
          Object.keys(response.data).forEach(device => {
            response.data[device]["id"] = device;
            console.log(response.data[device]);
            devices.push(response.data[device]);
          });
          this.devices = devices;
          this.addDevices(this.devices);
        });
    }
  }
};
</script>
