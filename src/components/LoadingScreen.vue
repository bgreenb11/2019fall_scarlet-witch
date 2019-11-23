<template>
    <div style="position:absolute; width: 100%; height:100%; top:0; left:0; z-index:10000; background-color:white">
        <div style="margin-left: auto; margin-right: auto">
            <v-progress-circular
              :size="70"
              :width="7"
              color="red"
              indeterminate
            ></v-progress-circular>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoadingScreen"
    }
</script>