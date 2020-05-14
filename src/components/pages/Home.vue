<template>
  <!-- <v-row justify="center" align="center">
      <v-col>
        <v-row justify="center" align="center" class="text-center"> -->
  <!-- <v-col sm="12">
            <p>
              <v-icon class="i mr-6" large>mdi-school</v-icon>
              <span class="grey--text">
                Search through a collection of thousands of emojis
              </span>
            </p>
          </v-col>
          <v-col sm="12">
            <span class="grey--text">
              Create collections
            </span>
            <v-icon class="i mr-6" large>mdi-school</v-icon>
          </v-col>
          <v-col sm="12">
            <p>
              <v-icon class="i">mdi-school</v-icon>
              <span>
                Find other highly rated collections
              </span>
            </p>
          </v-col> -->
  <!-- <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item fill-dot icon="mdi-magnify">
              <v-card dark>
                <v-card-title class="title">Find</v-card-title>
                <v-card-text class="text--primary">
                  <p>
                    Search through a collection of thousands of emojis
                  </p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
            <v-timeline-item fill-dot icon="mdi-list">
              <v-card dark>
                <v-card-title class="title">Curate</v-card-title>
                <v-card-text class="text--primary">
                  <p>
                    Create collections
                  </p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
            <v-timeline-item fill-dot icon="mdi-magnify">
              <v-card dark>
                <v-card-title class="title">Share</v-card-title>
                <v-card-text class="text--primary">
                  <p>
                    Find other highly rated collections
                  </p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline> -->
  <!-- </v-row>
      </v-col>
    </v-row> -->

  <full-page id="fullpage" :options="options">
    <div class="section">
      <v-row class="text-center mt-48" align="center">
        <v-col sm="12" md="4" class="text-md-end">
          <v-icon class="i ml-4" large color="primary">mdi-magnify</v-icon>
        </v-col>
        <v-col cols="12" sm="12" md="8" class="text-md-start">
          <p class="grey--text display-2 px-4">
            Search through thousands of emojis
          </p>
        </v-col>
      </v-row>
    </div>
    <div class="section">
      <v-row class="text-center mt-48" align="center">
        <v-col cols="12" sm="12" md="9" class="text-md-end text-center">
          <p class="grey--text display-2 px-4">
            Create curated collections of your favourite emojis
          </p>
        </v-col>
        <v-col sm="12" md="3" class="text-md-start">
          <v-icon class="i" large color="success">mdi-sticker-emoji</v-icon>
        </v-col>
      </v-row>
    </div>
    <div class="section">
      <v-row class="text-center mt-48" align="center">
        <v-col sm="12" md="4" class="text-md-end">
          <v-icon class="i" large color="error">mdi-view-list</v-icon>
        </v-col>
        <v-col cols="12" sm="12" md="8" class="text-md-start text-center">
          <p class="grey--text display-2 px-4">
            Explore highly rated collections
          </p>
        </v-col>
      </v-row>
    </div>
  </full-page>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      options: {
        scrollOverflow: false,
        scrollBar: false,
        menu: '#menu',
        navigation: true
        // anchors: ['page1', 'page2', 'page3']
        // sectionsColor: [
        //   '#41b883',
        //   '#ff5f45',
        //   '#0798ec',
        //   '#fec401',
        //   '#1bcee6',
        //   '#ee1a59',
        //   '#2c3e4f',
        //   '#ba5be9',
        //   '#b4b8ab'
        // ]
      }
    };
  }
};
</script>

<style>
.i {
  font-size: 150px !important;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.mt-48 {
  margin-top: 260px;
}
</style>
