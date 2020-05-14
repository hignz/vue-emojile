import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

if (!localStorage.getItem('accentColor')) {
  localStorage.setItem('accentColor', '#696969');
}

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    dark: true,
    themes: {
      light: {
        primary: '#82b1ff',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#44b787',
        warning: '#FFC107'
      },
      dark: {
        background: '#21252b',
        primary: '#82b1ff',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#44b787',
        warning: '#FFC107'
      }
    }
  }
});
