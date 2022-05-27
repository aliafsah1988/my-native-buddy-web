<template>
  <div class="g-form-input" :class="{ error: hasError }">
    <input
      v-if="numeric"
      v-model="value"
      @keypress="isNumber($event)"
      :placeholder="placeholder"
      :spellcheck="spellcheck"
      @change="onChange"
      @input="onInput"
    />
    <input
      v-else
      v-model="value"
      :placeholder="placeholder"
      :spellcheck="spellcheck"
      @change="onChange"
      @input="onInput"
      :disabled="disabled"
    />
    <span v-if="suffix" class="g-form-input__suffix">{{ suffix }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue";
// import Label from "../Label/Label.vue";
import "./style.scss";

const props = defineProps({
  suffix: {
    type: String,
    default: "",
  },
  numeric: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  initValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  spellcheck: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const value = ref<string>(props.initValue);
const hasError = computed(() => {
  return props.error && props.error.length > 0;
});
const emit = defineEmits(["change", "input"]);

const onChange = (e) => {
  emit("change", e.target.value);
};
const onInput = (e) => {
  emit("input", e.target.value);
};
const isNumber = (evt) => {
  evt = evt ? evt : window.event;
  const charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
};
</script>
