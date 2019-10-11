<template>
    <div class="home">
        <LoadingScreen :isLoading="isLoading"/>
        <div v-if="!isLoading">
          <HelloWorld />
          <HueHelper />
        </div>
    </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld';
import HueHelper from '../components/HueHelper';

export default {
  components: {
    HelloWorld,
    HueHelper,
  },
};
</script>
