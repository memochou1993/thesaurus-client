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
  data() {
    return {
      term: '',
    };
  },
  computed: {
    isSubmitted() {
      return this.term === this.$route.query.term;
    },
    query() {
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
      this.locate();
      this.fetch({
        param: this.query,
      });
    },
    locate() {
      if (this.isSubmitted) {
        return;
      }
      this.$router.replace({
        query: this.query,
      });
    },
  },
};
</script>
