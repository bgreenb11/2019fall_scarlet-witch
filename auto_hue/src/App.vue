<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-btn text> <span class="mr-2">Home</span> </v-btn>
      </router-link>
      <router-link to="/devices">
        <v-btn text> <span class="mr-2">Devices and Groups</span> </v-btn>
      </router-link>
      <router-link to="/device">
        <v-btn text> <span class="mr-2">Device Page</span> </v-btn>
      </router-link>
    </v-app-bar>
    <v-content>
      <router-view/>   
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    connectedStatus: false
  }),
};
</script>
