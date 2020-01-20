<template>
  <div>
    <q-card
      v-if="subject"
      bordered
      flat
      class="text-justify"
    >
      <q-card-section
        class="q-pb-none"
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
        class="q-py-xs"
      >
        <div
          class="q-py-sm text-subtitle1"
        >
          Note:
        </div>
        <div
          class="indent1"
        >
          {{ o(a(subject.descriptiveNote.descriptiveNotes)[0]).noteText }}
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
          Additional Notes:
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
              class="q-py-sm indent1"
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
    </q-card>
    <AppSpinner
      v-else
    />
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';
import common from '../mixins/common';
import AppSpinner from '../components/AppSpinner';

export default {
  name: 'TheCard',
  components: {
    AppSpinner,
  },
  mixins: [
    common,
  ],
  computed: {
    ...mapState([
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
  },
  created() {
    this.find();
  },
  methods: {
    ...mapMutations([
      'setSubject',
      'setFetched',
    ]),
    ...mapActions([
      'fetchSubject',
    ]),
    find() {
      this.setFetched(false);
      const { subjectId } = this.$route.params;
      if (this.subjects.length) {
        this.setSubject(this.subjects.find(subject => subject.subjectId === subjectId) || null);
      }
      if (this.o(this.subject).subjectId === subjectId) {
        return;
      }
      this.fetchSubject({
        props: {
          subjectId,
        },
      })
        .catch(() => {
          this.$router.replace({
            name: 'index',
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.indent1 {
  text-indent: 1em;
}
.indent2 {
  text-indent: 2em;
}

.outdent1 {
  text-indent: -1em;
  margin-left: 2em;
}
.outdent2 {
  text-indent: -1em;
  margin-left: 3em;
}
</style>
