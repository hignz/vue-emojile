<template>
  <v-container>
    <v-card
      height="100%"
      class="py-2 px-4 mb-12"
      outlined
      style="background: transparent"
    >
      <p class="font-weight-bold title grey--text">Browse Collections</p>
      <v-row justify="space-between" align="center">
        <v-col sm="12" md="2">
          <v-select label="Sort" outlined dense />
        </v-col>
        <v-col sm="12" md="4"> </v-col>
        <v-col sm="12" md="4">
          <v-text-field label="Search..." outlined dense></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-card
      height="100%"
      class="py-2 px-4"
      outlined
      style="background: transparent"
    >
      <v-row justify="start" align="center">
        <v-col
          v-for="collection in collections"
          :key="collection.Id"
          md="3"
          class="text-center"
        >
          <v-card
            outlined
            :to="{ name: 'collection', params: { id: collection.Id } }"
          >
            <v-card-text>
              <p class="overline font-weight-bold grey--text">
                By: {{ collection.UserId }}
              </p>
              <p class="title">
                {{ collection.Name }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    collections: []
  }),
  created() {
    this.fetchCollections().then(res => {
      console.log(res);
      this.collections = res;
    });
  },
  methods: {
    ...mapActions(['fetchCollections'])
  }
};
</script>

<style></style>
