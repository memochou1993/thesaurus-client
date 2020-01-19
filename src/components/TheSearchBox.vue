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
      return {
        term: this.term,
      };
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
    if (!this.$route.query.term) {
      return;
    }
    this.restore();
    this.search();
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
      this.setTerm(this.$route.query.term || '');
    },
    submit() {
      if (!this.term) {
        return;
      }
      if (this.term === this.$route.query.term) {
        return;
      }
      this.locate();
    },
    search() {
      this.setPage(1);
      this.fetchSubjects({
        params: this.query,
      });
    },
    locate() {
      this.$router.push({
        name: 'index',
        query: this.query,
      });
    },
  },
};
</script>
