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
  },
  actions: {
    fetch({
      commit,
    }, {
      params,
    }) {
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
