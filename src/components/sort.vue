<template>
  <v-card>
    <v-card-title>
      Sort
    </v-card-title>
    <v-card-text>
      <v-radio-group v-model="radioGroup">
        <v-radio key="1" value="1" label="Insert the Resister, Insert the LED, Insert the Power"></v-radio>
        <v-radio key="2" value="2" label="Insert the Power, Insert the Resister, Insert the LED"></v-radio>
        <v-radio key="3" value="3" label="Insert the LED, Insert the Power, Insert the Resister"></v-radio>
        <v-radio key="4" value="4" label="Insert the Resister, Insert the Power, Insert the LED"></v-radio>
      </v-radio-group>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    name: "sort",
    data: function () {
      return {
        radioGroup: 1
      }
    },
    computed: {
     
    },
    methods: {
     
    }
  }
</script>
