<template>
  <div>
    <q-card-section>
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
export default {
  props: {
    notes: {
      type: Array,
      required: true,
    },
  },
};
</script>
