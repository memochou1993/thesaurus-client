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
        <template
          v-slot:append
        >
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
  data() {
    return {
      term: '',
    };
  },
  computed: {
    ...mapState([
      'fetched',
    ]),
  },
  watch: {
    $route() {
      this.initialize();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapMutations([
      'setFetched',
      'setPage',
      'setSubjects',
    ]),
    ...mapActions([
      'fetchSubjects',
    ]),
    setTerm(term) {
      this.term = term;
    },
    initialize() {
      const { term } = this.$route.query;
      if (!term) {
        return;
      }
      this.setFetched(false);
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
        query: {
          term: this.term.trim(),
        },
      });
    },
    searchSubjects() {
      this.setPage(1);
      this.fetchSubjects({
        params: {
          term: this.term.trim(),
        },
      })
        .then(({ data }) => {
          this.setSubjects(data);
        });
    },
  },
};
</script>
