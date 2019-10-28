<template>
  <div class="schedule">
    <v-row>
      <v-col>
        <v-text-field
          label="Schedule Name"
          placeholder="New Schedule"
          v-model="config.name"
          :style="{ width: color_picker_width }"
        ></v-text-field>
        <v-textarea
          v-model="config.desc"
          auto-grow
          filled
          color="orange darken-2"
          label="Description"
          rows="2"
          :style="{ width: color_picker_width }"
        ></v-textarea>
        <v-time-picker
          v-model="config.time"
          color="orange darken-2"
          scrollable
          use-seconds
          :style="{ width: color_picker_width }"
        ></v-time-picker>
        <v-select
          v-model="config.group_id"
          :items="groups"
          item-text="name"
          item-value="id"
          label="Choose Group"
          :style="{ width: color_picker_width }"
        ></v-select>
        <v-btn text @click="createSchedule">
          <span class="mr-2">Create Schedule</span>
        </v-btn>
      </v-col>
      <v-col>
        <v-color-picker
          id="color-picker"
          v-model="color"
          :disabled="!config.toggle || config.colorloop"
        ></v-color-picker>
        <v-slider
          v-model="config.slider"
          max="254"
          min="1"
          :disabled="!config.toggle"
          :style="{ width: color_picker_width}"
        ></v-slider>
        <v-switch v-model="config.colorloop" label="ColorLoop"></v-switch>
        <v-switch v-model="config.toggle" label="Power On/Off"></v-switch>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Device",
  props: ["id"],

  data: () => ({
    color: "#000000",
    color_picker_width: "300px",
    groups: [],
    bridge: "",
    user: "",
    config: {
      name: "",
      desc: "",
      time: "00:00:00",
      colorloop: false,
      group_id: 0,
      toggle: false,
      slider: 0
    }
  }),
  mounted: function() {
    this.color_picker_width =
      document.getElementById("color-picker").clientWidth + "px";
    this.bridge = this.getBridge();
    this.user = this.getUser();
    this.groups = this.allGroups();
  },
  watch: {},
  methods: {
    color_correction(r, g, b) {
      const gamma_colors = [
        this._gammaCorrection(r / 255),
        this._gammaCorrection(g / 255),
        this._gammaCorrection(b / 255)
      ];

      const { X, Y, Z } = this._D65Correction(...gamma_colors);

      const x = (X / (X + Y + Z)).toFixed(4);
      const y = (Y / (X + Y + Z)).toFixed(4);

      return [isNaN(x) ? 0 : +x, isNaN(y) ? 0 : +y];
    },

    _gammaCorrection(color) {
      return color > 0.04045
        ? Math.pow((color + 0.055) / 1.055, 2.4)
        : color / 12.92;
    },

    _D65Correction(r, g, b) {
      const X = r * 0.664511 + g * 0.154324 + b * 0.162028;
      const Y = r * 0.283881 + g * 0.668433 + b * 0.047685;
      const Z = r * 0.000088 + g * 0.07231 + b * 0.986039;

      return {
        X,
        Y,
        Z
      };
    },
    ...mapGetters(["getBridge", "getUser", "allGroups"]),
    // Code borrowed from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    hexToRgb() {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.color);
      return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
          ]
        : null;
    },
    createSchedule() {
      let command = {
        address: `/api/${this.user}/groups/${this.config.group_id}/action`,
        method: "PUT",
        body: {
          on: this.config.toggle,
          ...(this.color != "#000000" &&
            !this.config.colorloop && {
              xy: this.color_correction(...this.hexToRgb())
            }),
          bri: this.config.slider,
          ...(this.config.colorloop && { effect: "colorloop" })
        }
      };
      let schedule = {
        name: this.config.name,
        description: this.config.desc,
        command: command,
        localtime: `W127/T${this.config.time}`
      };

      axios
        .post(`http://${this.bridge}/api/${this.user}/schedules`, schedule)
        .then(response => console.log(response));
      console.log(schedule);
    }
  }
};
</script>
