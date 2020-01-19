<template>
  <div>
    <q-card
      v-if="subject"
      bordered
      flat
    >
      <q-card-section>
        <div
          v-html="o(a(subject.term.preferredTerms)[0]).termText"
          class="text-center text-h6 text-weight-regular"
        />
      </q-card-section>
      <q-card-section
        class="q-pt-none"
      >
        <div
          class="text-subtitle1"
        >
          ID:
        </div>
        <div
          class="indent"
        >
          {{ subject.subjectId }}
        </div>
      </q-card-section>
      <q-card-section
        class="q-pt-none"
      >
        <div
          class="text-subtitle1"
        >
          Note:
        </div>
        <div
          class="indent text-justify"
        >
          {{ o(a(subject.descriptiveNote.descriptiveNotes)[0]).noteText }}
        </div>
      </q-card-section>
      <q-card-section
        class="q-pt-none"
      >
        <div
          class="text-subtitle1"
        >
          Terms:
        </div>
        <div
          v-for="(term, index) in terms"
          :key="index"
        >
          <div class="row">
            <div class="outdent">
              {{ term.termText }}
            </div>
            <div
              v-for="(language, index) in a(term.termLanguage.termLanguages)"
              :key="index"
            >
              <q-badge
                color="blue"
                outline
                class="q-mx-xs"
              >
                {{ language.language.split('/').pop() }}, {{ language.preferred }}
              </q-badge>
            </div>
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
  name: 'Show',
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
      if (this.subject) {
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
.indent {
  text-indent: 1em;
}
.outdent {
  text-indent: -1em;
  margin-left: 2em;
}
</style>
