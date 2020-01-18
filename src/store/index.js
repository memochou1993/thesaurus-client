import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    term: '',
    subjects: [],
    subject: null,
    loading: false,
  },
  mutations: {
    setTerm(state, term) {
      state.term = term;
    },
    setSubjects(state, subjects) {
      state.subjects = subjects;
    },
    setSubject(state, subject) {
      state.subject = subject;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    fetch({
      commit,
    }, {
      params,
    }) {
      commit('setLoading', true);
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: 'subjects',
          params,
        })
          .then(({ data }) => {
            commit('setSubjects', data.data);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            commit('setLoading', false);
          });
      });
    },
    resetState({
      commit,
    }) {
      commit('setTerm', '');
      commit('setSubjects', []);
      commit('setSubject', null);
    },
  },
});
