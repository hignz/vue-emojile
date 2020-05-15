<template>
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
// uses fullpage.js to create full page scrolling effect
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
