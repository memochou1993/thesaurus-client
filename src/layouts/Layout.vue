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
            class="q-mb-lg"
            @click="refresh()"
          >
            <div
              class="text-center text-h5 cursor-pointer"
            >
              Art & Architecture Thesaurus
            </div>
          </div>
          <TheSearchBox
            class="q-mb-lg"
          />
          <router-view
            class="q-mb-lg"
          />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import TheSearchBox from '../components/TheSearchBox';

export default {
  name: 'Layout',
  components: {
    TheSearchBox,
  },
  methods: {
    refresh() {
      window.location.href = '/';
    },
  },
};
</script>
