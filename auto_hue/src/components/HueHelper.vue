<template>
  <p>Hue Helper</p>
</template>

<script>
import { mapActions } from "vuex";
const v3 = require("node-hue-api").v3;
const LightState = v3.lightStates.LightState;

export default {
  data() {
    return {
      app_name: "scarlet-witch-lights-application",
      device_name: "demo-device",
      SAMPLE_TASK: {
        task_type: "LIGHT",
        targets: [2, 3],
        state: new LightState().off()
      },
      USER: null
    };
  },
  methods: {
    init: function() {
      v3.discovery
        .upnpSearch()
        .then(results => {
          console.log(results);
          const ip = results[0].ipaddress;
          // Testing with vuex
          mapActions(["addBriges"], results);
          return v3.api.create(ip);
        })
        .then(unauth => {
          return unauth.users.createUser(this.app_name, this.device_name);
        })
        .then(user => {
          console.log(`   Helper Username:        ${user.username}`);
          this.USER = user.username;
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    sendTask: function(task = this.SAMPLE_TASK) {
      v3.discovery
        .nupnpSearch()
        .then(results => {
          const ip = results[0].ipaddress;
          return v3.api.create(ip, this.USER);
        })
        .then(api => {
          if (task["task_type"] === "LIGHT") {
            // Apply light state to each targeted light
            task["targets"].map(id => {
              api.lights.setLightState(id, task["state"]);
            });
          } else if (task["task_type"] === "SCENELIGHT") {
            // Apply scene light state to each targeted light in scene
            task["targets"].map(id => {
              api.scenes.updateLightState(task["scenes"][0], id, task["state"]);
            });
          } else if (task["task_type"] === "SCENE") {
            // Apply scene state to scene
            task["scenes"].map(scene_id => {
              api.scenes.update(scene_id, task["state"]);
            });
          } else if (task["task_type"] === "GROUP") {
            // Apply group state to all groups
            task["groups"].map(group_id => {
              api.groups.setGroupState(group_id, task["state"]);
            });
          } else {
            throw Error("Invalid task type given.");
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    }
  },
  created: function() {
    this.init();
  }
};
</script>