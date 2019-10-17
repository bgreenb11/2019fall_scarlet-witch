<template>
    <div class="home">
        <HelloWorld />
        <HueHelper />
        <BridgeSelector />
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
