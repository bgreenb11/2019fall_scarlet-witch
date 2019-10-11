<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Auto-Hue</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-btn text> <span class="mr-2">Home</span> </v-btn>
      </router-link>
      <router-link to="/devices">
        <v-btn text> <span class="mr-2">Devices and Groups</span> </v-btn>
      </router-link>
    </v-app-bar>
    <v-content>
      <router-view/>   
    </v-content>
  </v-app>
</template>

<script>
import LoadingScreen from './components/LoadingScreen';

export default {
  name: 'App',
  components: {
    LoadingScreen
  },
  data: () => ({
    loading: true
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 3000);
  }
};
</script>
