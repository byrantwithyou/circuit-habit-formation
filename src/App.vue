<template>
  <v-app>
    <v-content>
      <v-container>
        <v-flex>
          <v-card>
            <v-card-title primary-title>
              Tutorial
            </v-card-title>
            <v-card-media min-height="300">
              <video  style="display: none" width="200" height="120" autoplay ref="video"></video>
              <canvas style="display: none" ref="canvas"  width="200" height="120"></canvas>
            </v-card-media>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="disable" @click="next">{{btnWord}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const btnWords = ["Snapshot", "Next", "", "Submit"];
export default {
    mounted: function() {
      let that = this;
      navigator.mediaDevices.getUserMedia({video: true})
      .then(function(stream) {
        that.$refs.video.srcObject = stream;
      })
    },
    data: function () {
      return {
        state: 3,
        disable: false
      }
    },
    computed: {
      btnWord: function() {
        return btnWords[this.state];
      }
    },
    methods: {
      next: function() {
        if (this.btnWord == "Snapshot") {
          this.snapshot();
        }
        this.state = this.state + 1;
        this.state = this.state % 2;

      },
      snapshot: function() {
        let context = this.$refs.canvas.getContext("2d");
        let video = this.$refs.video;
        context.drawImage(video, 0, 0, 200, 120);
        this.disable = true;
        this.$socket.emit("photo", this.$refs.canvas.toDataURL(), "resistor");
      }
    }
  }
</script>
