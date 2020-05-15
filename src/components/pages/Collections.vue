<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12" md="8">
        <p class="font-weight-bold title grey--text">Browse Collections</p>
        <v-row justify="space-between" align="center">
          <v-col sm="12" md="2">
            <v-select
              v-model="selectedSort"
              label="Sort"
              outlined
              dense
              :items="['Name', 'Created']"
            />
          </v-col>
          <v-col sm="12" md="4"> </v-col>
          <v-col sm="12" md="4">
            <v-text-field label="Search..." outlined dense></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="collections && collections.length" justify="center">
      <v-col sm="12" md="8">
        <v-row justify="start" align="center">
          <v-col
            v-for="collection in collections"
            :key="collection.Id"
            cols="12"
            sm="12"
            md="4"
            class="text-center"
          >
            <v-card
              outlined
              :to="{ name: 'collection', params: { id: collection.Id } }"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-1 grey--text font-weight-black">
                    {{
                      formatDistanceToNow(new Date(collection.CreatedAt), {
                        addSuffix: true
                      })
                    }}
                  </div>
                  <v-list-item-title class="headline mb-1">
                    {{ collection.Name }}</v-list-item-title
                  >
                </v-list-item-content>

                <v-list-item-avatar tile size="55">
                  <v-icon x-large>
                    mdi-view-grid-outline
                  </v-icon>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { formatDistanceToNow } from 'date-fns';

export default {
  data: () => ({
    collections: [],
    formatDistanceToNow,
    selectedSort: 'Created'
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
