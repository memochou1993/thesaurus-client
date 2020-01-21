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
        <q-card-section
          v-if="terms.length"
          class="q-py-xs"
        >
          <div
            class="q-py-sm text-subtitle1"
          >
            Terms:
          </div>
          <div
            class="q-px-md"
          >
            <div
              v-for="(term, index) in terms"
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
                  {{ term.termText }}
                </div>
                <div
                  class="col-8"
                >
                  <div
                    v-for="(language, index) in term.termLanguage.termLanguages"
                    :key="index"
                  >
                    <div
                      class="row"
                    >
                      <div
                        class="col-4"
                      >
                        <q-badge
                          color="green"
                          class="text-capitalize"
                        >
                          {{ language.language.split('/').pop().split(' ').shift() }}
                        </q-badge>
                      </div>
                      <div
                        class="col-4"
                      >
                        <q-badge
                          :color="`${language.preferred === 'Preferred' ? 'red' : 'orange'}`"
                          transparent
                          class="text-capitalize"
                        >
                          {{ language.preferred }}
                        </q-badge>
                      </div>
                      <div
                        class="col-4"
                      >
                        <q-badge
                          color="blue"
                          transparent
                          class="text-capitalize"
                        >
                          {{ language.partOfSpeech }}
                        </q-badge>
                      </div>
                    </div>
                    <q-separator
                      v-if="index < term.termLanguage.termLanguages.length - 1"
                      spaced
                    />
                  </div>
                </div>
              </div>
              <q-separator
                v-if="index === terms.length - 1"
                spaced
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section
          v-if="a(subject.descriptiveNote.descriptiveNotes).length"
          class="q-py-xs"
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
              v-for="(descriptiveNote, index) in subject.descriptiveNote.descriptiveNotes"
              :key="index"
            >
              <div
                class="q-pt-sm text-body2 text-weight-medium"
              >
                {{ descriptiveNote.noteLanguage }}
              </div>
              <div
                class="q-py-sm indent"
              >
                {{ descriptiveNote.noteText }}
              </div>
              <q-separator
                v-if="index < subject.descriptiveNote.descriptiveNotes.length - 1"
                spaced
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section
          v-if="relatedSubjects.length"
          class="q-py-xs"
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
      </q-card>
      <AppSpinner
        v-else
      />
    </div>
    <div
      v-else
    >
      <div
        class="text-center text-caption"
      >
        No results found for <b>{{ $route.params.subjectId }}</b>.
      </div>
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
import AppSpinner from '../components/AppSpinner';

export default {
  name: 'TheCard',
  components: {
    AppSpinner,
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
            this.relatedSubjects = [...this.relatedSubjects, {
              ...data,
              ...{
                relationshipType: associativeRelationship.relationshipType,
              },
            }];
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
