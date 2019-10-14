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
      <h1>Groups</h1>
      <Carousel :navigationEnabled="true" :perPageCustom="[[480, 2], [768, 3]]">
        <Slide v-for="device in allDevices" :key="device.id" class="device">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title>{{ device.name }}</v-card-title>
            <v-card-text>Color: {{ device.color ? device.color[0].toUpperCase() + device.color.slice(1) : "None" }}</v-card-text>
          </v-card>
        </Slide>
      </Carousel>
    </div>
  </v-container>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { mapGetters } from "vuex";

export default {
  name: "Devices",
  components: {
    Carousel,
    Slide
  },
  computed: mapGetters(["allDevices"])
};
</script>
