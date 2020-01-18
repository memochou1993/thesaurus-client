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
  mounted() {
    this.restore();
    if (!this.isEmpty) {
      this.search();
    }
  },
  methods: {
    ...mapMutations([
      'setTerm',
    ]),
    ...mapActions([
      'fetch',
    ]),
    restore() {
      this.setTerm(this.query.term || '');
    },
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
