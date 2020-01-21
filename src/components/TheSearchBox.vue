<template>
  <div>
    <q-form
      @submit="submit()"
    >
      <q-input
        v-model="term"
        autocomplete="off"
        autofocus
        dense
        outlined
        spellcheck="false"
      >
        <template v-slot:append>
          <q-icon
            name="search"
            class="cursor-pointer"
            @click="submit()"
          />
        </template>
      </q-input>
    </q-form>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';

export default {
  name: 'TheSearchBox',
  computed: {
    ...mapState([
      'fetched',
    ]),
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
        term: this.term.trim(),
      };
    },
  },
  watch: {
    $route() {
      this.initialize();
    },
  },
  mounted() {
    this.initialize();
  },
  methods: {
    ...mapMutations([
      'setPage',
      'setSubjects',
      'setTerm',
    ]),
    ...mapActions([
      'fetchSubjects',
    ]),
    initialize() {
      const { term } = this.$route.query;
      if (!term) {
        return;
      }
      this.setTerm(term);
      this.searchSubjects();
    },
    submit() {
      if (!this.term) {
        return;
      }
      this.locate();
    },
    locate() {
      const { term } = this.$route.query;
      if (term === this.term) {
        return;
      }
      this.$router.push({
        name: 'index',
        query: this.query,
      });
    },
    searchSubjects() {
      this.setPage(1);
      this.fetchSubjects({
        params: this.query,
      })
        .then(({ data }) => {
          this.setSubjects(data);
        });
    },
  },
};
</script>
