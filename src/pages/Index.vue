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
          class="q-mb-lg"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TheSearchBox from '../components/TheSearchBox';
import SubjectList from '../components/SubjectList';

export default {
  name: 'Index',
  components: {
    TheSearchBox,
    SubjectList,
  },
  methods: {
    refresh() {
      window.location.href = '/';
    },
  },
};
</script>
