<template>
  <v-container>
    <!-- <v-tabs vertical background-color="transparent">
      <v-tab>
        <v-icon left>mdi-emoticon-tongue</v-icon>
        Emojis
      </v-tab>
      <v-tab>
        <v-icon left>mdi-folder-multiple</v-icon>
        Collections
      </v-tab>
      <v-tab>
        <v-icon left>mdi-account</v-icon>
        Users
      </v-tab>

      <v-tab-item> -->
    <v-row justify="space-between" align="center">
      <v-col md="8" offset-sm="2" class="pb-0">
        <v-row>
          <v-col md="3">
            <v-select
              :items="items"
              append-icon="mdi-filter-variant"
              label="Sort"
              outlined
              dense
            />
          </v-col>
          <v-col md="3"> </v-col>
          <v-col md="6">
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
      <v-progress-circular :indeterminate="busy" color="primary" />
    </div>
    <!-- </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Morbi nec metus. Suspendisse faucibus, nunc et pellentesque
              egestas, lacus ante convallis tellus, vitae iaculis lacus elit id
              tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam
              libero, non adipiscing dolor urna a orci. Curabitur ligula sapien,
              tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed
              turpis.
            </p>

            <p>
              Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque
              egestas, lacus ante convallis tellus, vitae iaculis lacus elit id
              tortor. Proin viverra, ligula sit amet ultrices semper, ligula
              arcu tristique sapien, a accumsan nisi mauris ac eros. In hac
              habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra
              condimentum.
            </p>

            <p>
              Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
              quis gravida magna mi a libero. Nam commodo suscipit quam. In
              consectetuer turpis ut velit. Sed cursus turpis vitae tortor.
              Aliquam eu nunc.
            </p>

            <p>
              Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt
              libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum
              odio nec arcu.
            </p>

            <p class="mb-0">
              Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In
              dui magna, posuere eget, vestibulum et, tempor auctor, justo.
              Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed,
              iaculis a, condimentum nec, nisi.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis.
              Nam eget dui. Proin viverra, ligula sit amet ultrices semper,
              ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In
              dui magna, posuere eget, vestibulum et, tempor auctor, justo.
            </p>

            <p class="mb-0">
              Cras sagittis. Phasellus nec sem in justo pellentesque facilisis.
              Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec
              quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam
              at tortor in tellus interdum sagittis.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs> -->

    <!-- <v-row justify="space-between">
      <v-col md="6" offset-md="3">
        <v-row>
          <v-col md="3">
            <v-select :items="items" append-icon="mdi-filter-variant">
            </v-select>
          </v-col>
          <v-col md="9">
            <v-text-field
              v-model="query"
              label="Search..."
              append-icon="mdi-magnify"
              :loading="isLoading"
              @keydown.enter="search()"
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
        <v-col md="8" offset-sm="2">
          <v-row v-if="recent.emoticons">
            <v-col
              v-for="emote in recent.emoticons"
              :key="emote.id"
              sm="12"
              md="3"
            >
              <EmoteCard :emote="emote" />
            </v-col>

            <v-col md="6" offset-md="3">
              <v-card v-if="!recent.emoticons.length" outlined>
                <v-card-text
                  >Search for '{{ query }}' yielded no results</v-card-text
                >
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-progress-circular :indeterminate="busy" />
    </div> -->
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
    items: ['Created', 'A-Z'],
    isLoading: false,
    axios,
    searched: false
  }),
  created() {
    this.fetchEmotes()
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
    loadMore() {
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
            console.log(res);
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
