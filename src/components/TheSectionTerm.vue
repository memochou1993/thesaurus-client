<template>
  <div>
    <q-card-section
      v-if="terms.length"
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
};
</script>
