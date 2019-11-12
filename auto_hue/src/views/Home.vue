<template>
  <div class="home">
    <TrackList />
    <InitialSetup />
  </div>
</template>

<script>
import InitialSetup from "../components/InitialSetup.vue";
import TrackList from "../components/TrackList";

export default {
  components: {
    InitialSetup,
    TrackList,
  }
};
</script>
