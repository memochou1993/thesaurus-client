<template>
  <div>
    <q-card-section>
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
export default {
  props: {
    terms: {
      type: Array,
      required: true,
    },
  },
};
</script>
