<template>
  <div class="device">
    <v-row>
      <v-col>
        <img id="bulb" :src="require(`../assets/bulb_${toggle ? 'on': 'off'}.png`)" width="300" v-bind:style="{backgroundColor: color}">
      </v-col>
      <v-col>
        <v-color-picker
          id="color-picker"
          v-model="color"
          :disabled="!toggle"
        ></v-color-picker>
        <v-slider
          :disabled="!toggle"
          :style="{ width: color_picker_width}"
        ></v-slider>
        <v-switch
          v-model="toggle"
          v-on:change="toggleLight()"
        ></v-switch>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
      color: '#000000',
      toggle: false,
      color_picker_width: '300px'
  }),

  mounted: function() {
    this.color_picker_width = document.getElementById('color-picker').clientWidth + 'px';
  },

  methods: {
    toggleLight(){
      console.log(`Switch is ${this.toggle}`);
      var json = {
        on: this.toggle
      };
      axios.put(`http://ip_addr/api/username/lights/3/state`, json);
    }
  },

  name: 'Device',
  props: {
  },
  components: {
  },
};
</script>
