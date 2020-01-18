<template>
  <div>
    <q-list
      v-if="subjects.length"
      bordered
      class="rounded-borders"
    >
      <div
        v-for="(subject, index) in subjects"
        :key="index"
      >
        <q-item
          :to="'/'"
        >
          <q-item-section>
            <q-item-label
              overline
            >
              <span
                v-html="o(a(subject.term.preferredTerms)[0]).termText"
              />
            </q-item-label>
            <q-item-label
              caption
              lines="5"
            >
              <span
                v-html="o(a(subject.descriptiveNote.descriptiveNotes)[0]).noteText"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator
          v-if="index < subjects.length - 1"
        />
      </div>
    </q-list>
  </div>
</template>

<script>
import {
  mapState,
} from 'vuex';

export default {
  name: 'SubjectList',
  computed: {
    ...mapState([
      'subjects',
    ]),
  },
  methods: {
    a(array) {
      return array || [];
    },
    o(object) {
      return object || {};
    },
  },
};
</script>
