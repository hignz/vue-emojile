<template>
  <v-container>
    <v-row v-if="collection" justify="center">
      <v-col sm="12" md="8">
        <v-card outlined style="background: transparent">
          <v-card-text>
            <p class="title">
              {{ collection.Name }}
              <span class="grey--text caption">({{ emotes.length }})</span>
            </p>
            <p class="grey--text">
              Made
              {{
                formatDistanceToNow(new Date(collection.CreatedAt), {
                  addSuffix: true
                })
              }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="error" @click="deleteCollection()">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="8">
        <v-row v-if="emotes.length" justify="start" align="stretch">
          <v-col v-for="e in emotes" :key="e.id" cols="12" sm="12" md="3">
            <v-card class="mx-auto text-center" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div
                    v-if="e.Name"
                    class="overline mb-1 grey--text font-weight-black"
                  >
                    {{ e.Owner }}
                  </div>
                  <v-list-item-title class="headline mb-1">{{
                    e.Name
                  }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar tile size="55">
                  <img :src="e.URL" />
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="error"
                  icon
                  small
                  @click="showEmoteDeleteDialog(e)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else justify="center" align="stretch">
          <v-col
            v-if="isLoaded && !emotes.length && collection"
            sm="12"
            md="12"
          >
            <v-card outlined style="background: transparent">
              <v-card-text class="text-center">
                <p>
                  <v-icon x-large class="grey--text" style="font-size: 100px"
                    >mdi-emoticon-sad</v-icon
                  >
                </p>
                <p class="subtitle-1">
                  This collection does not contain any emojis
                </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  class="ml-4"
                  :to="{ path: '/browse' }"
                  color="primary"
                  text
                  >Browse</v-btn
                >
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>
          Are you sure?
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete {{ selectedEmote.Name }}? This action
          will permanently remove it from your collection.
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="error" @click="deleteEmoji(selectedEmote)">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { formatDistanceToNow } from 'date-fns';

export default {
  data: () => ({
    name: '',
    collection: null,
    emotes: [],
    formatDistanceToNow,
    isDeleting: false,
    isLoaded: false,
    dialog: false,
    selectedEmote: {}
  }),
  created() {
    // gets id from url
    const collectionId = this.$route.params.id;

    // gets data from web api for current collection
    this.fetchCollection(collectionId)
      .then(res => {
        this.collection = res;
      })
      .catch(err => console.log(err))
      .finally(() => (this.isLoaded = true));

    // fetchs all the emotes in current collection
    this.fetchEmotesByCollection(collectionId)
      .then(res => {
        this.emotes = res.sort(
          (a, b) => new Date(b.AddedAt) - new Date(a.AddedAt)
        );
      })
      .catch(err => console.log(err))
      .finally(() => (this.isLoaded = true));
  },
  methods: {
    ...mapActions([
      'fetchEmotesByCollection',
      'fetchCollection',
      'doDeleteEmoji',
      'doDeleteCollection'
    ]),
    // calls delete endpoint for passed in emote
    deleteEmoji(e) {
      this.isDeleting = true;

      this.doDeleteEmoji(e.Id)
        .then(() => {
          this.emotes = this.emotes.filter(el => el.Id !== e.Id);
          this.$toast.success('Emote successfully deleted', {
            timeout: 2000,
            position: 'bottom-center'
          });
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.isDeleting = true;
          this.dialog = false;
        });
    },
    // calls delete endpoint for collection id from url
    deleteCollection() {
      this.doDeleteCollection(this.$route.params.id)
        .then(() => {
          this.$toast.success('Collection successfully deleted', {
            timeout: 2000,
            position: 'bottom-center'
          });
          this.$router.push({ name: 'mycollections' });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // shows confirmation delete dialog
    showEmoteDeleteDialog(e) {
      this.selectedEmote = e;
      this.dialog = true;
    }
  }
};
</script>

<style></style>
