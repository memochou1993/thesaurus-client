<template>
  <div
    class="q-pa-md"
  >
    <div
      class="row justify-center"
    >
      <div
        class="col-6 q-my-lg"
      >
        <q-form
          @submit="submit()"
        >
          <q-input
            autocomplete="off"
            autofocus
            outlined
            spellcheck="false"
            v-model="term"
          />
        </q-form>
      </div>
    </div>
    <div
      v-if="subjects.length"
      class="row justify-center"
    >
      <div
        class="col-6 q-my-lg"
      >
        <q-list
          bordered
          class="rounded-borders"
        >
          <div
            v-for="(subject, index) in subjects"
            :key="index"
          >
            <q-item>
              <q-item-section>
                <q-item-label>
                  {{
                    ((subject.term.preferredTerms || [])[0] || {}).termText
                  }}
                </q-item-label>
                <q-item-label
                  caption
                  lines="5"
                >
                  {{
                    ((subject.descriptiveNote.descriptiveNotes || [])[0] || {}).noteText
                  }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator
              v-if="index < subjects.length - 1"
            />
          </div>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      term: '',
      subjects: [],
    };
  },
  methods: {
    submit() {
      this.fetch();
    },
    fetch() {
      this.$axios.get(`http://localhost:8080/subjects?term=${this.term}`)
        .then(({ data }) => {
          this.subjects = data.data;
        });
    },
  },
};
</script>
