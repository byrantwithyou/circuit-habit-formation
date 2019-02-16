<template>
  <v-app>
    <v-content>
      <v-container>
        <v-flex>
        <v-dialog persistent v-model="dialog" width="500">
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
        <v-dialog persistent v-model="reviewDialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              {{reviewBahavior}}
            </v-card-title>
            <v-card-media>
              <img :src="reviewImg" />
            </v-card-media>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="reviewRight">
                Right
              </v-btn>
              <v-btn color="primary" @click="reviewWrong">
                Wrong
              </v-btn> 
            </v-card-actions>
          </v-card>
        </v-dialog>
          <v-card>
            <v-card-title primary-title>
              Tutorial
            </v-card-title>
            <v-card-media min-height="300">
              <video width="200" height="120" autoplay ref="video"></video>
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
        behavior: "",
        reviewImg: "",
        reviewBahavior: "",
        reviewDialog: false,
        user: ""
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
        else {
          this.state = this.state + 1;
          this.state = this.state % 2;
        }
      },
      snapshot: function() {
        let context = this.$refs.canvas.getContext("2d");
        let video = this.$refs.video;
        context.drawImage(video, 0, 0, 200, 120);
        this.disable = true;
        this.$socket.emit("photo", this.$refs.canvas.toDataURL(), "resistor");
      },
      reviewRight: function() {
        this.reviewDialog = false;
        this.$socket.emit("review", 1, this.reviewImg, this.reviewBahavior, this.user);
      },
      reviewWrong: function() {
        this.reviewDialog = false;
        this.$socket.emit("review", 0, this.reviewImg, this.reviewBahavior, this.user);
      }
    },
    sockets: {
      reviewResult: function(data) {
        let reviewResult = data[0];
        this.behavior = data[1];
        this.dialog = true;
        this.disable = false;
        if (reviewResult === 1) {
          this.review = "Success!";
          this.state = this.state + 1;
          this.state = this.state % 2;
        }
        else {
          this.review = "Failure!";
        }
      },
      photoToJudge: function(data) {
        this.reviewDialog = true;
        this.reviewImg = data[0];
        this.reviewBahavior = data[1];
        this.user = data[2];
      }
    }
  }
</script>
