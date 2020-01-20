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
        term: this.term.trim(),
      };
    },
  },
  watch: {
    $route(to) {
      if (!to.query.term) {
        return;
      }
      this.restoreTerm();
      this.searchSubjects();
    },
  },
  mounted() {
    if (!this.$route.query.term) {
      return;
    }
    this.restoreTerm();
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
    restoreTerm() {
      this.setTerm(this.$route.query.term || '');
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
