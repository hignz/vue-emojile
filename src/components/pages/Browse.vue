<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <v-col md="8" offset-sm="2" class="pb-0">
        <p class="font-weight-bold title grey--text">Browse Emotes</p>
        <v-row>
          <v-col cols="12" sm="12" md="3">
            <v-select
              v-model="selectedSort"
              :items="items"
              append-icon="mdi-filter-variant"
              label="Sort"
              outlined
              dense
            />
          </v-col>
          <v-col sm="12" md="3"> </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              v-model="query"
              label="Search..."
              append-icon="mdi-magnify"
              :loading="isLoading"
              outlined
              dense
              clearable
              @input="search()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div
      v-infinite-scroll="loadMore"
      class="text-center"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <v-row>
        <v-col
          v-if="recent.emoticons && recent.emoticons.length"
          md="8"
          offset-sm="2"
        >
          <v-row>
            <v-col
              v-for="emote in recent.emoticons"
              :key="emote.id"
              sm="2"
              md="3"
            >
              <EmoteCard :emote="emote" />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          v-if="recent.emoticons && !recent.emoticons.length && searched"
          md="6"
          offset-md="3"
        >
          <v-icon x-large class="grey--text mb-4" style="font-size: 100px">
            mdi-incognito
          </v-icon>
          <p class="title grey--text">
            Search for '{{ query }}' yielded no results
          </p>
        </v-col>
      </v-row>
      <v-progress-circular v-if="busy" :indeterminate="busy" color="primary" />
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import EmoteCard from '@/components/shared/EmoteCard';
import axios from 'axios';

export default {
  components: {
    EmoteCard
  },
  data: () => ({
    recent: {},
    query: '',
    busy: false,
    items: ['Name', 'Owner', 'Count', 'Updated', 'Created'],
    isLoading: false,
    axios,
    searched: false,
    selectedSort: 'Created'
  }),
  created() {
    // fetch recent emotes
    this.fetchEmotes('lul')
      .then(res => {
        this.recent = res;
      })
      .catch(err => console.log(err));
  },
  methods: {
    ...mapActions(['fetchEmotes']),
    search() {
      clearTimeout(this._timerId);

      // debounce - delay new calls by 500ms
      this._timerId = setTimeout(() => {
        this.isLoading = true;

        this.fetchEmotes(this.query)
          .then(res => {
            this.recent = res;
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.isLoading = false;
            this.searched = true;
          });
      }, 500);
    },
    // called when scroll point is hit, creates infinite scroll effect
    loadMore() {
      // make sure there is a next page
      if (!this.recent._links || !this.recent._links.next || this.busy) {
        this.busy = false;
        return;
      }

      this.busy = true;
      setTimeout(() => {
        this.axios
          .get(
            this.query
              ? this.recent._links.next + `&q=${this.query}`
              : this.recent._links.next
          )
          .then(res => {
            this.recent._links = res.data._links;
            this.recent.emoticons.push(...res.data.emoticons);
          });
        this.busy = false;
      }, 1000);
    }
  }
};
</script>

<style>
.theme--dark.v-tabs-items {
  background-color: transparent !important;
}
</style>
