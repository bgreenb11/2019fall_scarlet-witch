<template>
  <v-form >
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            v-model="value"
            :items="items"
            chips
            label="Lights"
            multiple
            outlined
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    name: "NonAutoLightTask",
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: ['foo', 'bar', 'fizz', 'buzz'],
    }),
  }
</script>
