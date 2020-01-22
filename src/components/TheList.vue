<template>
  <div
    v-if="$route.query.term"
  >
    <div
      v-if="fetched"
    >
      <q-infinite-scroll
        v-if="subjects.length"
        :debounce="250"
        :offset="500"
        @load="loadSubjects"
      >
        <q-list
          bordered
          class="rounded-borders"
        >
          <div
            v-for="(subject, index) in subjects"
            :key="index"
          >
            <q-item
              :to="`${subject.subjectId}`"
            >
              <q-item-section>
                <q-item-label
                  overline
                >
                  <div
                    v-html="o(a(subject.term.preferredTerms)[0]).termText"
                  />
                </q-item-label>
                <q-item-label
                  caption
                  lines="5"
                  class="text-justify"
                >
                  {{ o(a(subject.descriptiveNote.descriptiveNotes)[0]).noteText }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator
              v-if="index < subjects.length - 1"
            />
          </div>
        </q-list>
        <template
          v-slot:loading
        >
          <AppSpinner />
        </template>
      </q-infinite-scroll>
      <div
        v-else
      >
        <div
          class="text-center text-caption"
        >

        </div>
        <AppMessage
          :text="`No results found for <b>${$route.query.term}</b>.`"
        />
      </div>
    </div>
    <div
      v-else
    >
      <AppSpinner />
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

export default {
  name: 'TheList',
  components: {
    AppMessage,
    AppSpinner,
  },
  mixins: [
    parser,
  ],
  computed: {
    ...mapState([
      'completed',
      'fetched',
      'page',
      'subjects',
    ]),
  },
  methods: {
    ...mapMutations([
      'setPage',
      'setSubjects',
    ]),
    ...mapActions([
      'fetchSubjects',
    ]),
    loadSubjects(index, done) {
      if (this.completed) {
        done();
        return;
      }
      this.setPage(this.page + 1);
      this.fetchSubjects({
        params: {
          page: this.page,
          term: this.$route.query.term,
        },
      })
        .then(({ data }) => {
          this.setSubjects([...this.subjects, ...data]);
          done();
        });
    },
  },
};
</script>
