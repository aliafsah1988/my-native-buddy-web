<template>
  <div class="g-form-select">
    <div class="g-form-select__text">
      <input
        class="g-form-select--input"
        type="text"
        :value="value"
        @click="onOpen"
        @blur="onBlur"
        :disabled="disabled"
      />
    </div>
    <div v-if="showOptions" class="dropdown-options">
      <a
        v-for="(option, index) in options"
        class="dropdown-options__item"
        :key="index"
        @click="onSelect(option)"
        >{{ option.label }}</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue";
import "./style.scss";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default() {
      return [];
    },
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  error: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const showOptions = ref<boolean>(false);
const hasError = computed(() => {
  return props.error && props.error.length > 0;
});
const emit = defineEmits(["select"]);

const onSelect = (option) => {
  emit("select", option);
};

const onOpen = () => {
  showOptions.value = true;
};
const onBlur = () => {
  setTimeout(() => {
    showOptions.value = false;
  }, 200);
};
</script>
