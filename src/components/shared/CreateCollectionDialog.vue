<template>
  <v-dialog v-model="dialog" max-width="500" @input="v => v || close()">
    <template v-slot:activator="{ on }">
      <v-btn icon class="mb-1" color="primary" v-on="on">
        <v-icon large>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
        <v-card-title class="mb-4">Create Collection</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Name"
            :rules="requiredRules"
            prepend-icon="mdi-pencil"
            clearable
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close()">Close</v-btn>
          <v-btn color="success" :disabled="!valid" type="submit">Create</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import validationRules from '@/mixins/validationRules';
import { mapActions } from 'vuex';

export default {
  mixins: [validationRules],
  data() {
    return {
      valid: false,
      name: '',
      dialog: false
    };
  },
  methods: {
    ...mapActions(['postCollection']),
    onSubmit() {
      // checks if form is valid, tries to post new collection and then emit the resposne back to parent
      if (this.$refs.form.validate()) {
        this.postCollection({ name: this.name })
          .then(res => {
            this.$toast.success('Collection created!', {
              timeout: 2000,
              position: 'bottom-center'
            });

            this.$emit('created', res);
            this.dialog = false;
          })
          .catch(err => console.log(err));
      }
    },
    close() {
      this.$refs.form.reset();
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style></style>
