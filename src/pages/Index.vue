<template>
  <div
    class="q-pa-md"
  >
    <div
      class="row justify-center"
    >
      <div
        class="col-10 col-md-auto"
      >
        <q-select
          v-model="keyword"
          autofocus
          fill-input
          hide-dropdown-icon
          hide-selected
          input-debounce="200"
          outlined
          use-input
          :options="options"
          @filter="filter"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      keyword: '',
      options: [],
    };
  },
  methods: {
    setOptions(options) {
      this.options = options;
    },
    setKeyword(keyword) {
      this.keyword = keyword;
    },
    fetch(keyword) {
      this.$axios.get(`http://localhost:8080/subjects?term=${keyword}`)
        .then(({ data }) => {
          if (!data.data) {
            this.setOptions([]);
            return;
          }
          const options = data.data.map((subject) => {
            return ((((subject || {}).term || {}).preferredTerms || {})[0] || {}).termText;
          });
          this.setOptions([...new Set(options)]);
        });
    },
    filter(keyword, update, abort) {
      if (!keyword) {
        abort();
        return;
      }
      update(() => {
        this.fetch(keyword);
        this.setKeyword(keyword);
      });
    },
  },
};
</script>
