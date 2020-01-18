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
        this.$store.commit('setTerm', value);
      },
    },
    isSubmitted() {
      return this.term === this.$route.query.term;
    },
    isEmpty() {
      return Object.values(this.params).every(param => !param);
    },
    isFrozen() {
      return this.isSubmitted || this.isEmpty;
    },
    params() {
      return {
        term: this.term,
      };
    },
  },
  methods: {
    ...mapActions([
      'fetch',
    ]),
    submit() {
      if (this.isFrozen) {
        return;
      }
      this.search();
      this.locate();
    },
    search() {
      this.fetch({
        params: this.params,
      });
    },
    locate() {
      this.$router.replace({
        query: this.params,
      });
    },
  },
};
</script>
