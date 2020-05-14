<template>
  <!-- <v-card outlined>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">{{ emote.name }}</v-card-title>

        <v-card-subtitle>{{ emote.owner.display_name }}</v-card-subtitle>
        <v-card-text>
          <p>Usage: {{ emote.usage_count }}</p></v-card-text
        >
      </div>

      <v-avatar class="ma-3" size="75" tile>
        <v-img :src="emote.urls[2]"> </v-img>
      </v-avatar>
    </div>
  </v-card> -->
  <v-lazy
    :options="{
      threshold: 0.5
    }"
    transition="fade-transition"
  >
    <v-card class="mx-auto" max-width="344" outlined @click="navigateTo()">
      <v-list-item three-line>
        <v-list-item-content>
          <div
            v-if="emote.owner.display_name"
            class="overline mb-1 grey--text font-weight-black"
          >
            {{ emote.owner.display_name }}
          </div>
          <v-list-item-title class="headline mb-1">{{
            emote.name
          }}</v-list-item-title>
          <!-- <v-list-item-subtitle
            >Usage: {{ emote.usage_count }}</v-list-item-subtitle
          > -->
        </v-list-item-content>

        <v-list-item-avatar tile size="55">
          <img :src="emote.urls[4] || emote.urls[2] || emote.urls[1]" />
        </v-list-item-avatar>
      </v-list-item>
      <!-- 
      <v-card-actions>
        <v-btn text color="primary">
          <v-icon>mdi-plus</v-icon>
          Add</v-btn
        >
      </v-card-actions> -->
    </v-card>
  </v-lazy>
</template>

<script>
export default {
  props: {
    emote: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    navigateTo() {
      this.$router.push({ name: 'emote', params: { id: this.emote.id } });
    }
  }
};
</script>

<style></style>
