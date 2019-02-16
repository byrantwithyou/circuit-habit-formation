<template>
  <v-app>
    <v-content>
      <v-container>
        <v-flex>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              {{review}}
            </v-card-title>
            <v-card-text>
              {{behavior}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" icon @click="dialog = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
        disable: false,
        dialog: false,
        review: "",
        behavior: ""
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
    },
    sockets: {
      reviewResult: function(data) {
        let reviewResult = data[0];
        this.behavior = data[1];
        this.dialog = true;
        if (reviewResult === 1) {
          this.review = "Success!";
          this.disable = false;
        }
        else {
          this.review = "Failure!";
        }
      },
    }
  }
</script>
