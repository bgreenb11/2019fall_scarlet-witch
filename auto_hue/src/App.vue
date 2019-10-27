<template>
  <div id="app">
    <v-app>
      <v-app-bar app>
        <v-toolbar-title class="headline text-uppercase">
          <span>Auto-Hue</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/">
          <v-btn text>
            <span class="mr-2">Home</span>
          </v-btn>
        </router-link>
        <router-link to="/devices">
          <v-btn text>
            <span class="mr-2">Devices and Groups</span>
          </v-btn>
        </router-link>
        <router-link to="/non-auto-light-task">
          <v-btn text>
            <span class="mr-2">NAL TASK</span>
          </v-btn>
        </router-link>
        <!-- <router-link to="/device">
        <v-btn text> <span class="mr-2">Device Page</span> </v-btn>
        </router-link>-->
      <!-- <router-link to="/group">
        <v-btn text> <span class="mr-2">Group Page</span> </v-btn>
      </router-link> -->
      </v-app-bar>
      <v-content>
        <router-view />
      </v-content>
    </v-app>
    <LoadingScreen v-if="loading" />
  </div>
</template>

<script>
import LoadingScreen from "./components/LoadingScreen";

export default {
  name: "App",
  components: {
    LoadingScreen
  },
  data: () => ({
    loading: true
  }),
  mounted() {
    // Will end the loading animation after 10 seconds
    setTimeout(() => {
      this.loading = false;
    }, 10000);
    console.log(this.$hue.data().app_name);
  }
};
</script>
