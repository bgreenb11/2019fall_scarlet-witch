<template>
  <div class="device">
    <v-row>
      <v-col>
        <img id="bulb" src="../assets/clear_bulb.png" width="300" v-bind:style="{backgroundColor: color}">
      </v-col>
      <v-col>
        <v-color-picker
          v-model="color"
          :disabled="!toggle"
        ></v-color-picker>
        <v-slider
            :disabled="!toggle"
          ></v-slider>
        <v-switch
          v-model="toggle"
        ></v-switch>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  data: () => ({
      color: '#000000',
      toggle:'false'
  }),

  name: 'Device',
  props: {
  },
  components: {
  },
};
</script>
