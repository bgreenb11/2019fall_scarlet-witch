<template>
  <div class="device_make">
    <v-row justify="space-around">
      <v-col cols="8">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step
              key="1_step"
              :step="1"
              :complete="step > 1"
              :editable="step > 1"
            >
              Begin Group Creation
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                key="2_step"
                :step="2"
                :complete="step > 2"
                :editable="step > 2"
            >
              Choose Lights
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                key="3_step"
                :step="3"
                :complete="step > 3"
                :editable="step > 3"
            >
              Finish Setup
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content :key="`1_content`" :step="1" align="center">
              <v-text-field
                  label="Room Name"
                  placeholder="New Group"
                  v-model="name"
                  :style="{ width: '300px' }"
              ></v-text-field>
<!--              <v-switch v-model="is_room" label="Is this group a room group?"></v-switch>-->
<!--              <v-autocomplete-->
<!--                  label="Group Class"-->
<!--                  :items="group_classes"-->
<!--                  v-model="group_class"-->
<!--                  :style="{ width: '300px' }"-->
<!--                  v-if="is_room"-->
<!--              ></v-autocomplete>-->
              <v-divider class="my-2"></v-divider>
              <v-btn
                  color="primary"
                  @click="nextStep()"
              >
                Continue
              </v-btn>
            </v-stepper-content>
            <v-stepper-content :key="`2_content`" :step="2" align="center">
              <v-row justify="space-around">
                <v-col cols="6">
                  <v-row v-for="row in Math.ceil(lights.length)" :key="`${row}_row`">
                    <v-card
                        class="mx-auto"
                        outlined
                        v-for="(light, i) in lights.slice((row-1)*2, row*2)"
                        :style="{width: 100, height: 100}"
                        :key="`${i}_light`"
                    >
                      <v-card-title>{{ light.name }}</v-card-title>
                      <v-card-text>Color: {{ light.state.xy ? light.state.xy : "None" }}</v-card-text>
                      <img
                          :src="require(`../assets/${light.productname === 'Hue white lamp' ? 'white': 'gradient'}_single.png`)"
                          alt="light"
                          width="75"
                      >
                      <v-btn
                          color="success"
                          @click="addToGroup(light, i)"
                      >
                        Add
                      </v-btn>
                    </v-card>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row v-for="row in Math.ceil(chosen_lights.length)" :key="`${row}_chosen_row`">
                    <v-card
                        class="mx-auto"
                        outlined
                        :style="{width: 100, height: 100}"
                        v-for="(light, i) in chosen_lights.slice((row-1)*2, row*2)"
                        :key="`${i}_chosen_light`"
                    >
                      <v-card-title>{{ light.name }}</v-card-title>
                      <img
                          :src="require(`../assets/${light.productname === 'Hue white lamp' ? 'white': 'gradient'}_single.png`)"
                          alt="light"
                          width="75"
                      >
                      <v-btn
                          color="red darken-2"
                          @click="removeFromGroup(light, i)"
                      >
                        Remove
                      </v-btn>
                    </v-card>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider class="my-2"></v-divider>
              <v-btn
                  color="primary"
                  @click="nextStep()"
              >
                Continue
              </v-btn>
            </v-stepper-content>
            <v-stepper-content :key="`3_content`" :step="3" align="center">
              <router-link :to="{name: 'devices'}">
                <v-btn
                    class="mx-2"
                    raised
                    tile
                    color="red darken-2"
                    @click="createGroup()"
                >
                  Create Group
                </v-btn>
              </router-link>
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
        name: "group_make",
        data: () => ({
            bridge: "",
            user: "",
            step: 1,
            lights: [],
            chosen_lights: [],
            name: "",
            is_room: false,
            group_classes: [
                "Living room", "Kitchen", "Dining", "Bedroom", "Kids bedroom", "Bathroom",
                "Nursery", "Recreation", "Office", "Gym", "Hallway", "Toilet", "Front Door",
                "Garage", "Terrace", "Garden", "Driveway", "Carport", "Other", "Home", "Downstairs",
                "Upstairs", "Top floor", "Attic", "Guest room", "Staircase", "Lounge", "Man Cave",
                "Computer", "Studio", "Music", "TV", "Reading", "Closet", "Storage", "Laundry room",
                "Balcony", "Porch", "Barbecue", "Pool"
            ],
            group_class: "",
            group_id: -1,
        }),
        mounted: function() {
            this.lights = this.allDevices();
            this.bridge = this.getBridge();
            this.user = this.getUser();
            this.is_room = false;
        },
        watch: {
          is_room(){
              (this.is_room) ? this.filterLights() : this.lights = this.allDevices();
          }
        },
        methods: {
            ...mapGetters(["allDevices", "allGroups", "getBridge", "getUser"]),
            ...mapActions(["addGroups"]),
            nextStep() {
                this.step++;
            },
            addToGroup(light, index) {
                this.chosen_lights.push(light);
                this.lights.splice(index, 1);
            },
            removeFromGroup(light, index){
                this.lights.push(light);
                this.chosen_lights.splice(index, 1);
            },
            createGroup(){
                let group = {
                    name: this.name,
                    // ...(this.is_room && {type: "Room", class: this.group_class}),
                    lights: this.chosen_lights.map(light => light.id)
                };
                axios.post(`http://${this.bridge}/api/${this.user}/groups`, group).then(
                    response => {
                        console.log(response);
                        if(response.success !== undefined) {
                            this.group_id = response.success.id;
                        }
                    }
                );

                axios.get(`http://${this.bridge}/api/${this.user}/groups/${this.group_id}`).then(
                    response => {
                        if(response.data){
                            this.addGroups(response.data)
                        }
                    }
                );
            },
            filterLights() {
                let room_lights = this.allGroups().filter(group => group.type === "Room").map(group => group.lights).flat();
                this.lights = this.lights.filter(light => room_lights.find(room_light => room_light != light.id))
            }
        }
    }
</script>