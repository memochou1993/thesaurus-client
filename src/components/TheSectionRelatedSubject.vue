<template>
  <div>
    <q-card-section
      v-if="relatedSubjects.length"
    >
      <div
        class="q-py-sm text-subtitle1"
      >
        Related Subjects:
      </div>
      <div
        class="q-px-md"
      >
        <div
          v-for="(relatedSubject, index) in relatedSubjects"
          :key="index"
        >
          <q-separator
            spaced
          />
          <div
            class="row"
          >
            <div
              class="col-4"
            >
              <q-badge
                color="purple"
                transparent
              >
                {{ relatedSubject.relationshipType }}
              </q-badge>
            </div>
            <div
              class="col-8"
            >
              <q-btn
                color="brown"
                flat
                no-caps
                size="sm"
                :to="`/${relatedSubject.subjectId}`"
              >
                <div
                  v-html="o(a(relatedSubject.term.preferredTerms)[0]).termText"
                />
              </q-btn>
            </div>
          </div>
          <q-separator
            v-if="index === relatedSubjects.length - 1"
            spaced
          />
        </div>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import parser from '../mixins/parser';

export default {
  props: {
    relatedSubjects: {
      type: Array,
      required: true,
    },
  },
  mixins: [
    parser,
  ],
};
</script>
