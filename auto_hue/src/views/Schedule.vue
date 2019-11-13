<template>
  <div class="schedule">
    <v-row justify="space-around">
      <v-col cols="8">
        <v-stepper v-model="curr_step">
          <v-stepper-header>
            <v-stepper-step
                :key="`1_step`"
                :step="1"
                :complete="curr_step > 1"
                editable>
              Begin Schedule Setup
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                :key="`2_step`"
                :step="2"
                :complete="curr_step > 2"
                editable>
              Select Time and Days
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                :key="`3_step`"
                :step="3"
                :complete="curr_step > 3"
                editable>
              Select Color/Effect
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                :key="`4_step`"
                :step="4"
                :complete="(id === undefined) ? config.group_id !== 0 : curr_step === 4"
                editable>
              {{(id === undefined) ? "Choose Group" : "Submit Changes"}}
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content :key="`1_content`" :step="1" align="center">
              <v-text-field
                  label="Schedule Name"
                  placeholder="New Schedule"
                  v-model="config.name"
                  :style="{ width: '300px' }"
              ></v-text-field>
              <v-textarea
                  v-model="config.desc"
                  auto-grow
                  filled
                  color="orange darken-2"
                  label="Description"
                  rows="2"
                  :style="{ width: '300px' }"
              ></v-textarea>
              <v-divider class="my-2"></v-divider>
              <v-btn
                  color="primary"
                  @click="nextStep(1)"
              >
                Continue
              </v-btn>
            </v-stepper-content>
            <v-stepper-content :key="`2_content`" :step="2" align="center">
              <v-stepper vertical v-model="time_step">
                  <v-stepper-step :key="`1_time_step`" :step="1" :complete="time_option !== 0" editable>
                    Choose Time Option
                  </v-stepper-step>
                  <v-stepper-content :key="`1_time_content`" :step="1" align="center">
                    <v-btn-toggle
                      mandatory
                      rounded
                      v-model="time_option"
                    >
                      <v-btn
                          value="1"
                          @click="time_step += 1"
                      >
                        <span class="hidden-sm-and-down">Weekly</span>
                        <v-icon right>mdi-calendar-week</v-icon>
                      </v-btn>
                      <v-btn
                          value="2"
                          @click="time_step += 1"
                      >
                        <span class="hidden-sm-and-down">Timer</span>
                        <v-icon right>mdi-alarm</v-icon>
                      </v-btn>
                      <v-btn
                          value="3"
                          @click="time_step += 1"
                      >
                        <span class="hidden-sm-and-down">Future</span>
                        <v-icon right>mdi-calendar-month</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </v-stepper-content>
                  <v-stepper-step :key="`2_time_step`" :step="2" :complete="curr_step > 2">
                    Setup Time Config
                  </v-stepper-step>
                  <v-stepper-content :key="`2_time_content`" :step="2" align="center">
                    <v-row v-if="time_option == 1" justify="space-around">
                      <v-time-picker
                          v-model="time"
                          color="orange darken-2"
                          scrollable
                          use-seconds
                          :style="{ width: '300px', height: '400px'}"
                      ></v-time-picker>
                      <v-time-picker
                          v-model="end_time"
                          v-if="has_end"
                          color="orange darken-2"
                          scrollable
                          use-seconds
                          :style="{ width: '300px', height: '400px'}"
                      ></v-time-picker>
                      <v-list two-line :style="{ width: '300px' }">
                        <v-subheader justify="center">Weekdays</v-subheader>
                        <v-list-item-group multiple v-model="days_selected" color="orange darken-2">
                          <v-list-item v-for="(day, i) in days" :key="i">
                            <v-list-item-icon>
                              <v-icon>mdi-calendar</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title v-text="day"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-row>
                    <v-row v-if="time_option == 2" justify="space-around">
                      <v-time-picker
                          v-model="time"
                          color="orange darken-2"
                          scrollable
                          use-seconds
                      ></v-time-picker>
                    </v-row>
                    <v-row v-if="time_option == 3" justify="space-around">
                      <v-time-picker
                          v-model="time"
                          color="orange darken-2"
                          scrollable
                          use-seconds
                          :style="{ width: '300px', height: '400px', top: '50%'}"
                      ></v-time-picker>
                      <v-time-picker
                          v-model="end_time"
                          v-if="has_end"
                          color="orange darken-2"
                          scrollable
                          use-seconds
                          :style="{ width: '300px', height: '400px', top: '50%'}"
                      ></v-time-picker>
                      <v-date-picker v-model="date" header-color="orange darken-2" color="orange darken-3"></v-date-picker>
                    </v-row>
                    <v-switch v-if="time_option != 2" v-model="has_end" label="Specify Ending Time?"></v-switch>
                  </v-stepper-content>
              </v-stepper>
              <v-btn
                  color="primary"
                  @click="nextStep(2)"
              >
                Continue
              </v-btn>
            </v-stepper-content>
            <v-stepper-content :key="`3_content`" :step="3" align="center">
              <v-row justify="space-around">
                <v-col cols="4">
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
                      :style="{ width: '300px'}"
                  ></v-slider>
                </v-col>
                <v-col cols="4">
                  <v-switch v-model="config.colorloop" label="ColorLoop"></v-switch>
                  <v-switch v-model="config.toggle" label="Power On/Off"></v-switch>
                </v-col>
              </v-row>
              <v-divider class="my-2"></v-divider>
              <v-btn
                  color="primary"
                  @click="nextStep(3)"
              >
                Continue
              </v-btn>
            </v-stepper-content>
            <v-stepper-content :key="`4_content`" :step="4" align="center">
              <template v-if="id === undefined">
                <v-select
                    v-model="config.group_id"
                    :items="groups"
                    item-text="name"
                    item-value="id"
                    label="Choose Group"
                    :style="{ width: '300px' }"
                    v-if="id === undefined"
                ></v-select>
                <v-divider class="my-2"></v-divider>
                <router-link :to="{name: 'devices'}">
                  <v-btn
                      raised
                      tile
                      color="orange darken-2"
                      @click="createSchedule()"
                  >
                    <span class="mr-2">Create Schedule</span>
                  </v-btn>
                </router-link>
              </template>
              <template v-else>
                <router-link :to="{name: 'devices'}">
                  <v-btn
                      raised
                      tile
                      color="orange darken-2"
                      @click="editSchedule()"
                  >
                    <span class="mr-2">Edit Schedule</span>
                  </v-btn>
                </router-link>
                <router-link :to="{name: 'devices'}">
                  <v-btn
                      class="mx-2"
                      raised
                      tile
                      color="red darken-2"
                      v-if="id !== undefined"
                      @click="deleteSchedule()"
                  >
                    <span class="mr-2">Delete Schedule</span>
                  </v-btn>
                </router-link>
              </template>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    import axios from "axios";

    export default {
        name: "Device",
        props: ["id"],

        data: () => ({
            color: "#000000",
            curr_step: 1,
            time_step: 1,
            time_option: 0,
            groups: [],
            date: "",
            time: "00:00:00",
            has_end: false,
            end_time: "00:00:00",
            bridge: "",
            user: "",
            schedule: {},
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            days_selected: [],
            config: {
                address: "",
                name: "",
                desc: "",
                colorloop: false,
                group_id: 0,
                toggle: false,
                slider: 0,
                days: 0,
            }
        }),
        mounted: function () {
            this.bridge = this.getBridge();
            this.user = this.getUser();
            this.groups = this.allGroups();
            if (this.id !== undefined) {
                this.schedule = this.allSchedules().find(
                    schedule => schedule.id === this.id
                );
                this.config.name = this.schedule.name;
                this.config.desc = this.schedule.description;
                this.time = this.schedule.localtime.split("T")[1];
                this.end_time = (this.schedule.localtime.split("T")[2]) ? this.schedule.localtime.split("T")[2] : "00:00:00";
                this.config.toggle =
                    this.schedule.command.body.flag || this.schedule.command.body.on;
                this.config.slider =
                    this.schedule.command.bri === undefined
                        ? 255
                        : this.schedule.command.bri;
                this.config.address = this.schedule.command.address;
                this.config.colorloop =
                    this.schedule.command.body.effect !== undefined &&
                    this.schedule.command.body.effect === "colorloop";
            }
            else{
                let date = new Date();
                this.time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                this.date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
            }
        },
        watch: {
            days_selected() {
                this.config.days = this.days_selected.reduce((days, day) => days + 2 ** day, 0);
            },
            has_end(){
                this.end_time = (this.has_end) ? this.time : "00:00:00";
            },
            time_option(){
                if(this.time_option == 2){
                    this.time = "00:00:00";
                }
            }
        },
        methods: {
            color_correction(r, g, b) {
                const gamma_colors = [
                    this._gammaCorrection(r / 255),
                    this._gammaCorrection(g / 255),
                    this._gammaCorrection(b / 255)
                ];

                const {X, Y, Z} = this._D65Correction(...gamma_colors);

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
            ...mapGetters(["getBridge", "getUser", "allGroups", "allSchedules"]),
            ...mapActions(["addSchedules", "removeSchedule"]),
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
            timeConfig() {
                switch(this.time_option){
                    case 1: {
                        if (this.has_end) {
                            return `W${this.config.days}/T${this.time}/T${this.end_time}`
                        }
                        else {
                            return `W${this.config.days}/T${this.time}`
                        }
                    }
                    case 2: {
                        return `PT${this.time}`
                    }
                    case 3: {
                        if (this.has_end) {
                            return `${this.date}:T${this.time}/T${this.end_time}`
                        }
                        else {
                            return `${this.date}:T${this.time}`
                        }
                    }
                }
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
                        ...(this.config.colorloop && {effect: "colorloop"})
                    }
                };
                let schedule = {
                    name: this.config.name,
                    description: this.config.desc,
                    command: command,
                    localtime: this.timeConfig()
                };

                axios
                    .post(`http://${this.bridge}/api/${this.user}/schedules`, schedule)
                    .then(response => console.log(response));
                this.addSchedules([schedule]);
            },
            editSchedule() {
                let command = {
                    address: this.config.address,
                    method: "PUT",
                    body: {
                        on: this.config.toggle,
                        ...(this.color != "#000000" &&
                            !this.config.colorloop && {
                                xy: this.color_correction(...this.hexToRgb())
                            }),
                        bri: this.config.slider,
                        ...(this.config.colorloop && {effect: "colorloop"})
                    }
                };
                let schedule = {
                    name: this.config.name,
                    description: this.config.desc,
                    command: command,
                    localtime: this.timeConfig()
                };

                axios.put(
                    `http://${this.bridge}/api/${this.user}/schedules/${this.id}`,
                    schedule
                );

                axios
                    .get(`http://${this.bridge}/api/${this.user}/schedules/${this.id}`)
                    .then(response => {
                        schedule = response.data;
                        schedule.id = this.id;
                        console.log(response.data);
                    });
                this.removeSchedule(this.id);
                console.log(schedule);
                this.addSchedules([schedule]);
            },
            deleteSchedule() {
                axios.delete(
                    `http://${this.bridge}/api/${this.user}/schedules/${this.id}`
                );
                this.removeSchedule(this.id);
            },
            nextStep(n) {
                if (n === this.steps) {
                    this.curr_step = 1
                } else {
                    this.curr_step = n + 1
                }
            },
        }
    };
</script>
