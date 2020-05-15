<template>
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
    // uses vue router to push clicked emote to /emote with current emote id as param
    navigateTo() {
      this.$router.push({ name: 'emote', params: { id: this.emote.id } });
    }
  }
};
</script>

<style></style>
