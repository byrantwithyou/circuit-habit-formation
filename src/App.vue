<template>
  <v-app>
    <v-content>
      <v-container>
        <v-flex>
          <v-card>
            <v-card-actions>
              <v-btn @click="snapshot">snapshot</v-btn>
            </v-card-actions>
            <v-card-media>
              <video width="480" height="320" autoplay ref="video"></video>
              <canvas ref="canvas" width="480" height="320"></canvas>
              <img :src="imgURL" />
            </v-card-media>
          </v-card>
        </v-flex>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
    mounted: function() {
      let that = this;
      navigator.mediaDevices.getUserMedia({video: true})
      .then(function(stream) {
        that.$refs.video.srcObject = stream;
      })
    },
    data: () => ({
      imgURL: ""
    }),
    methods: {
      snapshot: function() {
        let context = this.$refs.canvas.getContext("2d");
        let video = this.$refs.video;
        context.drawImage(video, 0, 0, 480, 320);
        this.imgURL = this.$refs.canvas.toDataURL();
      }
    }
  }
</script>
