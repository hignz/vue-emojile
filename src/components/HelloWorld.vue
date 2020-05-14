<template>
  <v-container>
    <v-row class="text-center">
      <v-col v-for="emote in d.emoticons" :key="emote.id" cols="3">
        <EmoteCard :emote="emote" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  components: {},
  data: () => ({
    d: {}
  }),
  created() {},
  methods: {}
};
</script>
