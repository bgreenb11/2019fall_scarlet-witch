<template>
  <div class="device">
      <v-img
      src="../assets/clear_bulb.png"
      aspect-ratio="1"
      class="yellow"
    ></v-img>
      <v-color-picker></v-color-picker>
      <v-slider></v-slider>
      <v-switch></v-switch>
  </div>
</template>

<script>

export default {
  name: 'Device',
  props: {
  },
  components: {
  },
};
</script>
