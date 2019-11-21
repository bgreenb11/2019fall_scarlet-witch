<template>
  <v-container>
    <div class="devices">
      <h1>Lights</h1>
      <Carousel :navigationEnabled="true" :perPageCustom="[[480, 2], [768, 3]]">
        <Slide v-for="device in devices" :key="device.id" class="device">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>{{ device.name }}</v-card-title>
            <v-card-text>Color: {{ device.state.xy ? device.state.xy : "None" }}</v-card-text>
            <img :src="require(`../assets/${device.productname === 'Hue white lamp' ? 'white': 'gradient'}_single.png`)" width="172">
            <router-link :to="{name: 'device', params: {id: device.id}}">
              <v-btn text>
                <span class="mr-2">Light Page</span>
              </v-btn>
            </router-link>
          </v-card>
        </Slide>
      </Carousel>
      <h1>
        Groups
        <router-link :to="{name: 'group_make'}">
          <v-btn text>
            <span class="mr-2">Create Group</span>
          </v-btn>
        </router-link>
      </h1>
      <Carousel :navigationEnabled="true" :perPageCustom="[[480, 2], [768, 3]]">
        <Slide v-for="group in groups" :key="group.id" class="group">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>{{ group.name }}</v-card-title>
            <v-card-text>Color: {{ group.action.xy ? group.action.xy : "None" }}</v-card-text>
            <img src="../assets/gradient_group.png" width="172">
            <router-link :to="{name: 'group', params: {id: group.id}}">
              <v-btn text>
                <span class="mr-2">Group Page</span>
              </v-btn>
            </router-link>
          </v-card>
        </Slide>
      </Carousel>
      <h1>
        Schedules
        <router-link :to="{name: 'schedule'}">
          <v-btn text>
            <span class="mr-2">Create Schedule</span>
          </v-btn>
        </router-link>
      </h1>
      <Carousel :navigationEnabled="true" :perPageCustom="[[480, 2], [768, 3]]">
        <Slide v-for="schedule in schedules" :key="schedule.id" class="schedule">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>{{ schedule.name }}</v-card-title>
            <v-card-text>Description: {{ schedule.description }}</v-card-text>
            <router-link :to="{name: 'schedule', params: {id: schedule.id}}">
              <v-btn text>
                <span class="mr-2">Schedule Page</span>
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
      schedules: [],
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
    this.schedules = this.allSchedules();
  },
  methods: {
    ...mapActions(["addDevices", "addGroups", "addSchedules"]),
    ...mapGetters([
      "allDevices",
      "getBridge",
      "getUser",
      "allGroups",
      "allSchedules"
    ]),
    findDevices() {
      axios
        .get(`http://${this.bridge}/api/${this.user}/lights`)
        .then(response => {
          let devices = [];
          Object.keys(response.data).forEach(device => {
            response.data[device]["id"] = device;
            devices.push(response.data[device]);
          });
          this.addDevices(devices);
        });
      axios
        .get(`http://${this.bridge}/api/${this.user}/groups`)
        .then(response => {
          let groups = [];
          Object.keys(response.data).forEach(group => {
            response.data[group]["id"] = group;
            groups.push(response.data[group]);
          });
          this.addGroups(groups);
        });
      axios
        .get(`http://${this.bridge}/api/${this.user}/schedules`)
        .then(response => {
          let schedules = [];
          Object.keys(response.data).forEach(schedule => {
            response.data[schedule]["id"] = schedule;
            schedules.push(response.data[schedule]);
          });
          this.addSchedules(schedules);
        });
    }
  }
};
</script>
