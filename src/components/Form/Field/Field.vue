<template>
  <div class="g-form-field">
    <Label v-if="label">{{ label }}</Label>
    <div class="g-form-field__content">
      <slot :error="error" />
    </div>
    <span v-if="error && error.length > 0" class="g-form-error">{{
      error
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
// import Label from "../Label/Label.vue";
import "./style.scss";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
});
</script>
