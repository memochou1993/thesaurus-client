<template>
  <div>
    <q-card-section
      v-if="notes.length"
    >
      <div
        class="q-py-sm text-subtitle1"
      >
        Notes:
      </div>
      <div
        class="q-px-md"
      >
        <div
          v-for="(note, index) in notes"
          :key="index"
        >
          <div
            class="q-pt-sm text-body2 text-weight-medium"
          >
            {{ note.noteLanguage }}
          </div>
          <div
            class="q-py-sm indent"
          >
            {{ note.noteText }}
          </div>
          <q-separator
            v-if="index < notes.length - 1"
            spaced
          />
        </div>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import {
  mapState,
} from 'vuex';
import parser from '../mixins/parser';

export default {
  mixins: [
    parser,
  ],
  computed: {
    ...mapState([
      'subject',
    ]),
    notes() {
      return this.a(this.subject.descriptiveNote.descriptiveNotes);
    },
  },
};
</script>
