<template>
  <div
    v-html="text"
    class="text-center text-caption"
  />
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
