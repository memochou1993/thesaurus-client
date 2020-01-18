<template>
  <div>
    <div
      class="row justify-center q-my-lg"
    >
      <div
        class="col-6"
      >
        <TheSearchBox />
      </div>
      <div
        class="row justify-center q-my-lg"
      >
        <div
          class="col-6"
        >
          <SubjectList />
        </div>
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
};
</script>
