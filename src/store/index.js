import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    completed: false,
    fetched: false,
    page: 1,
    pageSize: 10,
    subject: null,
    subjects: [],
    term: '',
  },
  mutations: {
    setCompleted(state, completed) {
      state.completed = completed;
    },
    setFetched(state, fetched) {
      state.fetched = fetched;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSubject(state, subject) {
      state.subject = subject;
    },
    setSubjects(state, subjects) {
      state.subjects = subjects;
    },
    setTerm(state, term) {
      state.term = term;
    },
  },
  actions: {
    fetchSubject({
      commit,
    }, {
      props,
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `subjects/${props.subjectId}`,
        })
          .then(({ data }) => {
            commit('setSubject', data.data);
            resolve(data);
          })
          .catch((error) => {
            commit('setCompleted', false);
            reject(error);
          })
          .finally(() => {
            commit('setFetched', true);
          });
      });
    },
    fetchSubjects({
      state,
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
            commit('setCompleted', !data.data.length || (data.data.length < state.pageSize));
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
