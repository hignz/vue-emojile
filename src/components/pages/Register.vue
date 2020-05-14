<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col sm="6" class="text-center my-12">
        <v-toolbar-title class="display-1 primary--text"
          >Registration</v-toolbar-title
        >
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col sm="6" md="4" lg="3">
        <v-card outlined>
          <v-form
            ref="registerForm"
            v-model="valid"
            @submit.prevent="register()"
          >
            <v-card-text>
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                validate-on-blur
                prepend-inner-icon="mdi-account"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="hidePassword ? 'password' : 'text'"
                :rules="passwordRules"
                required
                counter
                @click:append="() => (hidePassword = !hidePassword)"
              >
              </v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                prepend-inner-icon="mdi-lock"
                :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="hidePassword ? 'password' : 'text'"
                :rules="passwordRules"
                required
                counter
                @click:append="() => (hidePassword = !hidePassword)"
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="primary black--text"
                primary
                :disabled="!valid || isRegistering"
                type="submit"
                block=""
                :loading="isRegistering"
                >Register</v-btn
              >
            </v-card-actions>
            <div class="text-center my-2">
              <v-btn text x-small color="primary" :to="{ path: 'login' }"
                >Already have an account? Login here!</v-btn
              >
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import validationRules from '@/mixins/validationRules';

export default {
  mixins: [validationRules],
  data: () => ({
    valid: false,
    email: '',
    password: '',
    confirmPassword: '',
    hidePassword: true,
    isRegistering: false,
    passwordRules: [
      v => !!v || 'Password is required',
      v => v === this.password || 'Passwords must match',
      v => v.length > 7 || 'Password must be at least 8 characters'
    ]
  }),
  methods: {
    ...mapActions(['doRegister']),
    register() {
      this.isRegistering = true;

      this.doRegister({
        email: this.email,
        password: this.password,
        confirmpassword: this.confirmPassword
      })
        .then(() => {
          this.$router.push({ name: 'login' });
        })
        .catch()
        .finall(() => (this.isRegistering = false));
    }
  }
};
</script>

<style></style>
