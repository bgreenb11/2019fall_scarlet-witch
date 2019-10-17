<template>
    <v-list-item-content>
        <v-list-item-title v-text=bridge.name />
        <v-list-item-subtitle v-text=bridge.ipaddress />
    </v-list-item-content>
</template>

<script>
export default {
    props: {
        bridge: Object
    }
}
</script>