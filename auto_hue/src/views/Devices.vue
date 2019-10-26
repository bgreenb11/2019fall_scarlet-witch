<template>
  <v-container>
    <div class="devices">
      <h1>Lights</h1>
      <Carousel :navigationEnabled="true" :perPageCustom="[[480, 2], [768, 3]]">
        <Slide v-for="device in devices" :key="device.id" class="device">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>{{ device.name }}</v-card-title>
            <v-card-text>Color: {{ device.state.xy ? device.state.xy : "None" }}</v-card-text>
            <router-link :to="{name: 'device', params: {id: device.id}}">
              <v-btn text>
                <span class="mr-2">Light Page</span>
              </v-btn>
            </router-link>
          </v-card>
        </Slide>
      </Carousel>
      <h1>Groups</h1>
      <Carousel :navigationEnabled="true" :perPageCustom="[[480, 2], [768, 3]]">
        <Slide v-for="group in groups" :key="group.id" class="device">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>{{ group.name }}</v-card-title>
            <v-card-text>Color: {{ group.action.xy ? group.action.xy : "None" }}</v-card-text>
            <router-link :to="{name: 'group', params: {id: group.id}}">
              <v-btn text>
                <span class="mr-2">Group Page</span>
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
      groups: [],
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
    this.groups = this.allGroups();
  },
  methods: {
    ...mapActions(["addDevices", "addGroups"]),
    ...mapGetters(["allDevices", "getBridge", "getUser", "allGroups"]),
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
          this.addDevices(devices);
        });
      axios
        .get(`http://${this.bridge}/api/${this.user}/groups`)
        .then(response => {
          console.log(Object.keys(response.data));
          let groups = [];
          Object.keys(response.data).forEach(group => {
            response.data[group]["id"] = group;
            console.log(response.data[group]);
            groups.push(response.data[group]);
          });
          this.addGroups(groups);
        });
    }
  }
};
</script>
