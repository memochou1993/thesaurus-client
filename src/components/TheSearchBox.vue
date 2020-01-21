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
    $route(to) {
      const { term } = to.query;
      if (!term) {
        return;
      }
      this.setTerm(term);
      this.searchSubjects();
    },
  },
  mounted() {
    const { term } = this.$route.query;
    if (!term) {
      return;
    }
    this.setTerm(term);
    this.searchSubjects();
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
    submit() {
      if (!this.term) {
        return;
      }
      if (this.term === this.$route.query.term) {
        return;
      }
      this.locate();
    },
    locate() {
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
