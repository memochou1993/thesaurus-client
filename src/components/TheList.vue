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
        @load="load"
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
                  <span
                    v-html="o(a(subject.term.preferredTerms)[0]).termText"
                  />
                </q-item-label>
                <q-item-label
                  caption
                  lines="5"
                >
                  <span
                    v-html="o(a(subject.descriptiveNote.descriptiveNotes)[0]).noteText"
                  />
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
          No results found for <b>{{ $route.query.term }}</b>.
        </div>
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
import AppSpinner from '../components/AppSpinner';

export default {
  name: 'TheList',
  components: {
    AppSpinner,
  },
  computed: {
    ...mapState([
      'page',
      'term',
      'subjects',
      'fetched',
      'exhausted',
    ]),
    query() {
      return {
        page: this.page,
        term: this.term,
      };
    },
  },
  methods: {
    ...mapMutations([
      'setPage',
    ]),
    ...mapActions([
      'fetchSubjects',
    ]),
    a(array) {
      return array || [];
    },
    o(object) {
      return object || {};
    },
    load(index, done) {
      if (this.exhausted) {
        done(true);
        return;
      }
      this.setPage(this.page + 1);
      this.fetchSubjects({
        params: this.query,
        args: {
          push: true,
        },
      })
        .then(() => {
          done();
        });
    },
  },
};
</script>
