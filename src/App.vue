<template>
  <v-app>
    <v-content>
      <Navbar />
      <v-progress-linear
        v-if="isLoading"
        :height="2"
        color="primary"
        :indeterminate="isLoading"
      ></v-progress-linear>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/shared/Navbar';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState(['isLoading'])
  }
};
</script>
