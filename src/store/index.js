import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    page: 1,
    pageSize: 10,
    term: '',
    subjects: [],
    subject: null,
    fetched: false,
    exhausted: false,
  },
  mutations: {
    setPage(state, page) {
      state.page = page;
    },
    setTerm(state, term) {
      state.term = term;
    },
    setSubjects(state, subjects) {
      state.subjects = subjects;
    },
    setSubject(state, subject) {
      state.subject = subject;
    },
    setFetched(state, fetched) {
      state.fetched = fetched;
    },
    setExhausted(state, exhausted) {
      state.exhausted = exhausted;
    },
  },
  actions: {
    fetchSubjects({
      state,
      commit,
    }, {
      params = {},
      args = {},
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: 'subjects',
          params,
        })
          .then(({ data }) => {
            commit('setSubjects', args.push ? [...state.subjects, ...data.data] : data.data);
            commit('setExhausted', !data.data.length || (data.data.length < state.pageSize));
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            commit('setFetched', true);
          });
      });
    },
  },
});
