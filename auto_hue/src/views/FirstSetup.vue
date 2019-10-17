<template>
  <div class="setup">
    <component v-bind:is="activeComponent" v-on:bridgeChosen="selectedBridge = $event" />
    <div class="nav-div">
        <v-btn v-on:click="prevPage()">Prev</v-btn>
      <v-btn v-on:click="nextPage()">Next</v-btn>
    </div>
    <div>
        <p>{{this.step}}</p>
    </div>
  </div>
</template>

<script>
import BridgePrimer from "../components/BridgePrimer";
import BridgeSelector from "../components/BridgeSelector";

export default {
  data() {
    return {
      step: 0,
      max: 2,
      bridges: null,
      selectedBridge: null,
      myPages: [
          BridgePrimer,
          BridgeSelector
      ],
      activeComponent: BridgePrimer
    };
  },
  components: {
    BridgePrimer,
    BridgeSelector
  },
  methods: {
    nextPage: function() {
      if (this.step + 1 < this.max) this.step += 1;
      else this.done();

      this.activeComponent = this.myPages[this.step]
    },
    prevPage: function() {
      if (this.step - 1 >= 0) this.step -= 1;

      this.activeComponent = this.myPages[this.step]
    },
    done: function() {
        console.log('done')
    }
  }
};
</script>