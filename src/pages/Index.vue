<template>
  <div>
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
        <SubjectList
          v-if="!loading"
          class="q-mb-lg"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
} from 'vuex';
import TheSearchBox from '../components/TheSearchBox';
import SubjectList from '../components/SubjectList';

export default {
  name: 'Index',
  components: {
    TheSearchBox,
    SubjectList,
  },
  computed: {
    ...mapState([
      'loading',
    ]),
  },
  methods: {
    refresh() {
      window.location.href = '/';
    },
  },
};
</script>
