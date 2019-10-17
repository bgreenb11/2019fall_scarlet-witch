<template>
  <v-card max-width="500" max-height="300" class="mx-auto my-8">
    <v-toolbar dark>
      <v-toolbar-title>Please select your bridge:</v-toolbar-title>
    </v-toolbar>
    <v-list two-line class="overflow-y-auto" max-height="300">
      <v-list-item
        v-for="bridge in SAMPLE_BRIDGES"
        :key="bridge.name"
        v-on:click="chooseBridge(bridge)"
      >
        <v-list-item-content>
          <v-list-item-title v-text="bridge.name" />
          <v-list-item-subtitle v-text="bridge.ipaddress" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      SAMPLE_BRIDGES: [
        {
          name: "Philips hue 1 (192.xxx.xxx.xxx)",
          manufacturer: "Royal Philips Electronics",
          ipaddress: "192.xxx.xxx.xxx",
          model: {
            number: "BSB002",
            description: "Philips hue Personal Wireless Lighting",
            name: "Philips hue bridge 2015",
            serial: "0017xxxxxxxx"
          },
          version: {
            major: "1",
            minor: "0"
          },
          icons: [
            {
              mimetype: "image/png",
              height: "48",
              width: "48",
              depth: "24",
              url: "hue_logo_0.png"
            }
          ]
        },
        {
          name: "Philips hue 2 (192.xxx.xxx.xxx)",
          manufacturer: "Royal Philips Electronics",
          ipaddress: "192.xxx.xxx.xxx",
          model: {
            number: "BSB002",
            description: "Philips hue Personal Wireless Lighting",
            name: "Philips hue bridge 2015",
            serial: "0017xxxxxxxx"
          },
          version: {
            major: "1",
            minor: "0"
          },
          icons: [
            {
              mimetype: "image/png",
              height: "48",
              width: "48",
              depth: "24",
              url: "hue_logo_0.png"
            }
          ]
        },
        {
          name: "Philips hue 3 (192.xxx.xxx.xxx)",
          manufacturer: "Royal Philips Electronics",
          ipaddress: "192.xxx.xxx.xxx",
          model: {
            number: "BSB002",
            description: "Philips hue Personal Wireless Lighting",
            name: "Philips hue bridge 2015",
            serial: "0017xxxxxxxx"
          },
          version: {
            major: "1",
            minor: "0"
          },
          icons: [
            {
              mimetype: "image/png",
              height: "48",
              width: "48",
              depth: "24",
              url: "hue_logo_0.png"
            }
          ]
        },
        {
          name: "Philips hue 4 (192.xxx.xxx.xxx)",
          manufacturer: "Royal Philips Electronics",
          ipaddress: "192.xxx.xxx.xxx",
          model: {
            number: "BSB002",
            description: "Philips hue Personal Wireless Lighting",
            name: "Philips hue bridge 2015",
            serial: "0017xxxxxxxx"
          },
          version: {
            major: "1",
            minor: "0"
          },
          icons: [
            {
              mimetype: "image/png",
              height: "48",
              width: "48",
              depth: "24",
              url: "hue_logo_0.png"
            }
          ]
        },
        {
          name: "Philips hue 5 (192.xxx.xxx.xxx)",
          manufacturer: "Royal Philips Electronics",
          ipaddress: "192.xxx.xxx.xxx",
          model: {
            number: "BSB002",
            description: "Philips hue Personal Wireless Lighting",
            name: "Philips hue bridge 2015",
            serial: "0017xxxxxxxx"
          },
          version: {
            major: "1",
            minor: "0"
          },
          icons: [
            {
              mimetype: "image/png",
              height: "48",
              width: "48",
              depth: "24",
              url: "hue_logo_0.png"
            }
          ]
        }
      ],
      bridges: null,
      chosen_bridge: null
    };
  },
  methods: {
    chooseBridge: function(bridge) {
      this.chosen_bridge = bridge;
      console.log(this.chosen_bridge.name);
    },
    getBridge: function() {
      return this.chosen_bridge;
    },
    setBridges: function(bridges) {
        this.bridges = bridges
    }
  }
};
</script>