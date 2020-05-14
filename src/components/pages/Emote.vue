<template>
  <v-container>
    <v-row v-if="isLoaded">
      <v-col md="6" offset-md="3">
        <v-card outlined class="text-center">
          <v-card-title>
            {{ emote.name }}
          </v-card-title>

          <v-avatar v-if="emote.urls[1]" tile size="100" class="mr-2">
            <img :src="emote.urls[1]" />
          </v-avatar>
          <v-avatar v-if="emote.urls[2]" tile size="100" class="mr-2">
            <img :src="emote.urls[2]" />
          </v-avatar>
          <v-avatar v-if="emote.urls[4]" tile size="100" class="">
            <img :src="emote.urls[4]" />
          </v-avatar>

          <v-card-text>
            <v-card-subtitle>
              By: {{ emote.owner.display_name }}
            </v-card-subtitle>
            <p class="text-center">
              Used in
              <span class="font-weight-black primary--text">{{
                emote.usage_count
              }}</span>
              channels
            </p>
          </v-card-text>

          <v-card-actions>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  dark
                  text
                  :loading="isLoadingCollections"
                  :disabled="isLoadingCollections"
                  v-on="on"
                  @click="populateCollections()"
                >
                  Add to collection
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(c, index) in collections"
                  :key="index"
                  @click="addToCollection(c)"
                >
                  <v-list-item-title>{{ c.Name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col class="text-start" md="6">
        <p class="grey--text">Similar</p>
        <v-row justify="start" align="center">
          <v-col
            v-for="emote in similar"
            :key="emote.id"
            cols="12"
            sm="12"
            md="4"
            class="text-center"
          >
            <EmoteCard :emote="emote" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import EmoteCard from '../shared/EmoteCard';

export default {
  components: {
    EmoteCard
  },
  data: () => ({
    emote: null,
    isLoaded: false,
    collections: [],
    isLoadingCollections: false,
    similar: []
  }),
  created() {
    this.fetchEmote(this.$route.params.id)
      .then(res => {
        this.emote = res.emote;
        this.isLoaded = true;

        this.fetchEmotes(this.emote.name.substr(0, 3))
          .then(res => {
            this.similar.push(...res.emoticons);
            console.log(this.similar);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },
  methods: {
    ...mapActions([
      'fetchEmote',
      'fetchMyCollections',
      'postEmote',
      'fetchEmotes'
    ]),
    populateCollections() {
      this.isLoadingCollections = true;

      this.fetchMyCollections()
        .then(res => {
          this.collections = res;
        })
        .catch(err => console.log(err))
        .finally(() => (this.isLoadingCollections = false));
    },
    addToCollection(c) {
      this.postEmote({
        name: this.emote.name,
        url: this.emote.urls[4] || this.emote.urls[2] || this.emote.urls[1],
        collectionId: c.Id,
        owner: this.emote.owner.name,
        ownerId: this.emote.owner._id,
        usageCount: this.emote.usageCount
      })
        .then(() => {
          this.$toast.success(`Emoji added to ${c.Name}`, {
            timeout: 2000,
            position: 'bottom-center'
          });
        })
        .catch(() => {
          this.$toast.error('We were unable to add to this collection', {
            timeout: 2000,
            position: 'bottom-center'
          });
        });
    }
  }
};
</script>

<style></style>
