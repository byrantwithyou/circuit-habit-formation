<template>
  <v-card>
    <v-card-title primary-title>
      Remind
    </v-card-title>
    <v-card-text>
      Please Gauge the Resister before inserting it into the whole circuit
    </v-card-text>
    <v-card-media>
      <v-container>
        <v-layout>
          <v-flex xs5>
            <v-card>
              <v-card-title>
                Good Example
              </v-card-title>
              <v-card-media contain>
                <v-img src="step1.jpg"></v-img>
              </v-card-media>
            </v-card>
          </v-flex>
          <v-flex xs5 offset-xs1>
            <v-card>
              <v-card-title>
                Bad Consequences
              </v-card-title>
              <v-card-media contain>
                <v-img src="step2.jpg"></v-img>
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
  </v-card>
</template>

<script>
export default {
    name: "remind",
    data: function () {
      return {
      }
    },
    computed: {
     
    },
    methods: {
     
    }
  }
</script>
