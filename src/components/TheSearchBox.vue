<template>
  <div>
    <q-form
      @submit="submit()"
    >
      <q-input
        v-model="term"
        autocomplete="off"
        autofocus
        outlined
        spellcheck="false"
      />
    </q-form>
  </div>
</template>

<script>
import {
  mapMutations,
  mapActions,
} from 'vuex';

export default {
  name: 'TheSearchBox',
  computed: {
    term: {
      get() {
        return this.$store.state.term;
      },
      set(value) {
        this.setTerm(value);
      },
    },
    query() {
      return this.$route.query;
    },
    params() {
      return {
        term: this.term,
      };
    },
    isSubmitted() {
      return JSON.stringify(this.query) === JSON.stringify(this.params);
    },
    isEmpty() {
      return Object.values(this.params).every(param => !param);
    },
    isFrozen() {
      return this.isSubmitted || this.isEmpty;
    },
  },
  watch: {
    $route(to) {
      if (!to.query.term) {
        return;
      }
      this.restore();
      this.search();
    },
  },
  mounted() {
    this.restore();
    if (!this.isEmpty) {
      this.search();
    }
  },
  methods: {
    ...mapMutations([
      'setPage',
      'setTerm',
    ]),
    ...mapActions([
      'fetchSubjects',
    ]),
    restore() {
      this.setTerm(this.query.term || '');
    },
    submit() {
      if (this.isFrozen) {
        return;
      }
      this.locate();
    },
    search() {
      this.setPage(1);
      this.fetchSubjects({
        params: this.params,
      });
    },
    locate() {
      this.$router.push({
        name: 'index',
        query: this.params,
      });
    },
  },
};
</script>
