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
          :notes="notes"
          class="q-py-xs"
        />
        <TheSectionTerm
          :terms="terms"
          class="q-py-xs"
        />
        <TheSectionRelatedSubject
          :relatedSubjects="relatedSubjects"
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
  data() {
    return {
      relatedSubjects: [],
    };
  },
  computed: {
    ...mapState([
      'fetched',
      'subjects',
      'subject',
    ]),
    notes() {
      return this.a(this.subject.descriptiveNote.descriptiveNotes);
    },
    terms() {
      const terms = [
        ...this.a(this.subject.term.preferredTerms),
        ...this.a(this.subject.term.nonPreferredTerms),
      ];
      const sort = (term) => {
        const { language } = this.o(this.a(term.termLanguage.termLanguages)[0]);
        const { preferred } = this.o(this.a(term.termLanguage.termLanguages)[0]);
        return language.split('/').pop() + (preferred === 'Preferred' ? 'a' : 'z');
      };
      return terms.sort((a, b) => (sort(a) > sort(b) ? 1 : -1));
    },
    associativeRelationships() {
      return this.a(this.subject.associativeRelationship.associativeRelationships);
    },
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
    setRelatedSubjects(relatedSubjects) {
      this.relatedSubjects = relatedSubjects;
    },
    initialize() {
      this.setFetched(false);
      this.setRelatedSubjects([]);
      this.findSubjects();
    },
    findSubjects() {
      const { subjectId } = this.$route.params;
      if (this.subjects.length) {
        this.setSubject(this.subjects.find(subject => subject.subjectId === subjectId) || null);
      }
      if (this.o(this.subject).subjectId === subjectId) {
        this.findRelatedSubjects();
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
          // TODO: enable component to find related subjects
          this.findRelatedSubjects();
        })
        .catch(() => {
          this.setSubject(null);
        });
    },
    findRelatedSubjects() {
      this.associativeRelationships.forEach((associativeRelationship) => {
        this.fetchSubject({
          props: {
            subjectId: associativeRelationship.relatedSubjectId.vpSubjectId,
          },
        })
          .then(({ data }) => {
            this.relatedSubjects = [
              ...this.relatedSubjects,
              {
                ...data,
                ...{
                  relationshipType: associativeRelationship.relationshipType,
                },
              },
            ];
          });
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
