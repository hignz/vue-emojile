<template>
  <v-container>
    <p class="display-1">
      My Collections <CreateCollectionDialog @created="addCollection" />
    </p>

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
import CreateCollectionDialog from '@/components/shared/CreateCollectionDialog';

export default {
  components: {
    CreateCollectionDialog
  },
  data: () => ({
    name: '',
    collections: [],
    formatDistanceToNow
  }),
  computed: {
    // sorts collections via date, uses computed property to ensure reactivity
    sortedCollections() {
      return this.collections
        .slice()
        .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
    }
  },
  created() {
    // fetches logged in users collections
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
    // handles the emit from the dialog componenet
    addCollection(item) {
      this.collections.push(item);
    },
    // uses vue router to open collection and pass collection id
    navigateTo(collection) {
      this.$router.push({ name: 'collection', params: { id: collection.Id } });
    }
  }
};
</script>

<style></style>
