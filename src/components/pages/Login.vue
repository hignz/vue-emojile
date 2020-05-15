<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col sm="6" class="text-center my-12">
        <v-toolbar-title class="display-1 primary--text"
          >Sign in</v-toolbar-title
        >
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col sm="6" md="4" lg="3">
        <v-card outlined>
          <v-form ref="loginForm" v-model="valid" @submit.prevent="login">
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
                :rules="requiredRules"
                required
                @click:append="() => (hidePassword = !hidePassword)"
              >
              </v-text-field>
              <v-btn
                text
                small
                color="primary"
                :to="{ path: 'forgot-password' }"
                >Forgot password?</v-btn
              >
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="primary black--text"
                primary
                block
                :disabled="!valid || isLoggingIn"
                type="submit"
                :loading="isLoggingIn"
                >Sign In</v-btn
              >
            </v-card-actions>
            <div class="text-center my-2">
              <v-btn color="primary" text x-small :to="{ name: 'register' }"
                >Don't have an account? Register here!</v-btn
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
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      hidePassword: true,
      isLoggingIn: false
    };
  },
  methods: {
    ...mapActions(['doLogin']),
    login() {
      this.isLoggingIn = true;

      // tries login, on success push to collections, on error show toast
      this.doLogin({ email: this.email, password: this.password })
        .then(() => {
          this.$toast('Login successfull', {
            timeout: 2000,
            position: 'bottom-center'
          });

          this.$router.push({ name: 'mycollections' });
        })
        .catch(() => {
          this.$toast.error('Username or password is incorrect', {
            timeout: 2000,
            position: 'bottom-center'
          });
        })
        .finally(() => (this.isLoggingIn = false));
    }
  }
};
</script>

<style></style>
