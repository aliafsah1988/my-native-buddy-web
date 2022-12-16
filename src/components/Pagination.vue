<template>
  <div class="pagination-container">
    <button v-for="index in count" :key="index" @click="emit('page', index)">
      {{ index }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits(["page"]);

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    default: 10,
  },
});

const count = computed(() => Math.ceil(props.total / props.limit));
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
