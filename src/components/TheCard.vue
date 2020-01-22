<template>
  <div>
    <div
      v-if="subject"
    >
      <q-card
        v-if="fetched"
        bordered
        flat
        class="q-py-lg text-justify"
      >
        <q-card-section
          class="q-py-xs"
        >
          <div
            v-html="o(a(subject.term.preferredTerms)[0]).termText"
            class="text-center text-h6 text-weight-regular"
          />
        </q-card-section>
        <q-card-section
          class="q-py-xs"
        >
          <div
            class="q-py-sm text-subtitle1"
          >
            ID:
          </div>
          <div
            class="q-px-md"
          >
            {{ subject.subjectId }}
          </div>
        </q-card-section>
        <TheSectionNote
          class="q-py-xs"
        />
        <TheSectionTerm
          class="q-py-xs"
        />
        <TheSectionRelatedSubject
          class="q-py-xs"
        />
        <TheSectionParentSubject
          class="q-py-xs"
        />
      </q-card>
      <AppSpinner
        v-else
      />
    </div>
    <div
      v-else
    >
      <AppMessage
        :text="`No results found for <b>${$route.params.subjectId}</b>.`"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';
import parser from '../mixins/parser';
import AppMessage from '../components/AppMessage';
import AppSpinner from '../components/AppSpinner';
import TheSectionNote from '../components/TheSectionNote';
import TheSectionParentSubject from '../components/TheSectionParentSubject';
import TheSectionRelatedSubject from '../components/TheSectionRelatedSubject';
import TheSectionTerm from '../components/TheSectionTerm';

export default {
  name: 'TheCard',
  components: {
    AppMessage,
    AppSpinner,
    TheSectionNote,
    TheSectionParentSubject,
    TheSectionRelatedSubject,
    TheSectionTerm,
  },
  mixins: [
    parser,
  ],
  computed: {
    ...mapState([
      'fetched',
      'subjects',
      'subject',
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
      'setSubject',
    ]),
    ...mapActions([
      'fetchSubject',
    ]),
    initialize() {
      this.setFetched(false);
      this.findSubjects();
    },
    findSubjects() {
      const { subjectId } = this.$route.params;
      if (this.subjects.length) {
        this.setSubject(this.subjects.find(subject => subject.subjectId === subjectId) || null);
      }
      if (this.o(this.subject).subjectId === subjectId) {
        this.setFetched(true);
        return;
      }
      this.fetchSubject({
        props: {
          subjectId,
        },
      })
        .then(({ data }) => {
          this.setSubject(data);
        })
        .catch(() => {
          this.setSubject(null);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.indent {
  text-indent: 1em;
}

.outdent {
  text-indent: -1em;
  margin-left: 2em;
}
</style>
