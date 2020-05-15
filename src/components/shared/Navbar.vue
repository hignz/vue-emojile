<template>
  <v-app-bar app dense flat>
    <v-toolbar-title @click="goHome()">Emojile</v-toolbar-title>
    <!-- <v-btn class="ml-4" :to="{ path: '/browse' }" text>Browse</v-btn> -->
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn class="ml-4" color="primary" text v-on="on">
          Browse
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in browseItems"
          :key="index"
          :to="{ path: item.path }"
        >
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-spacer></v-spacer>
    <v-btn v-if="!accessToken" class="ml-4" :to="{ path: '/login' }" text
      >Login</v-btn
    >
    <v-btn v-if="accessToken" :to="{ path: '/mycollections' }" text
      >My Collections</v-btn
    >
    <v-btn
      v-if="accessToken"
      class="ml-4"
      text
      color="primary"
      @click="logout()"
    >
      <v-icon class="mr-2">mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    // used to loop over to create menu
    browseItems: [
      {
        text: 'Emotes',
        path: '/browse'
      },
      {
        text: 'Collections',
        path: '/collections'
      }
    ]
  }),
  computed: {
    ...mapState(['accessToken', 'user'])
  },
  methods: {
    ...mapActions(['doLogout']),
    logout() {
      this.doLogout().then(() => {
        this.$router.push({ path: '/' });
      });
    },
    goHome() {
      this.$router.push({ path: '/' });
    }
  }
};
</script>

<style></style>
