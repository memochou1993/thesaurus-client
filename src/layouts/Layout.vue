<template>
  <q-layout>
    <q-page-container>
      <div
        class="row window-height justify-center items-center"
      >
        <div
          class="col-md-6 col-sm-8 col-xs-10 q-py-xl"
        >
          <div
            class="q-mb-lg text-center text-h5 cursor-pointer"
            @click="refresh()"
          >
            Art & Architecture Thesaurus
          </div>
          <TheSearchBox
            class="q-mb-lg"
          />
          <router-view
            class="q-mb-lg"
          />
        </div>
      </div>
      <AppPageScroller />
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  mapMutations,
} from 'vuex';
import TheSearchBox from '../components/TheSearchBox';
import AppPageScroller from '../components/AppPageScroller';

export default {
  name: 'Layout',
  components: {
    TheSearchBox,
    AppPageScroller,
  },
  beforeRouteUpdate(to, from, next) {
    this.setFetched(false);
    this.$q.loadingBar.start();
    this.$q.loadingBar.stop();
    next();
  },
  methods: {
    ...mapMutations([
      'setFetched',
    ]),
    refresh() {
      window.location.href = '/';
    },
  },
};
</script>
