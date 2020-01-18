import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = process.env.PROD
  ? 'http://api.thesaurus.epoch.tw'
  : 'http://localhost:8080';

Vue.prototype.$axios = axios;
