<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field v-model="name" label="Name" dense=""> </v-text-field>
      </v-col>
      <v-col>
        <v-btn text @click="createCollection()">Create</v-btn>
      </v-col>
    </v-row>

    <p class="display-1">My Collections</p>
    <v-row>
      <v-col
        v-for="c in sortedCollections"
        :key="c.Id"
        cols="12"
        sm="12"
        md="3"
      >
        <v-card outlined @click="navigateTo(c)">
          <v-card-title>
            {{ c.Name }}
          </v-card-title>
          <v-card-text>
            Created:
            {{
              formatDistanceToNow(new Date(c.CreatedAt), {
                addSuffix: true
              })
            }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { formatDistanceToNow } from 'date-fns';

export default {
  data: () => ({
    name: '',
    collections: [],
    formatDistanceToNow
  }),
  computed: {
    sortedCollections() {
      return this.collections
        .slice()
        .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
    }
  },
  created() {
    this.fetchMyCollections()
      .then(res => {
        this.collections = res.sort(
          (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
        );
      })
      .catch(err => console.log(err));
  },
  methods: {
    ...mapActions(['postCollection', 'fetchMyCollections']),
    createCollection() {
      this.postCollection({ name: this.name })
        .then(res => {
          this.$toast.success('Collection created!', {
            timeout: 2000,
            position: 'bottom-center'
          });

          this.collections.push(res);
        })
        .catch(err => console.log(err));
    },
    navigateTo(collection) {
      this.$router.push({ name: 'collection', params: { id: collection.Id } });
    }
  }
};
</script>

<style></style>
