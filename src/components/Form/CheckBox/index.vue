<template>
  <label class="g-form-check" :class="{ error: error }">
    <input type="checkbox" :v-model="value" @change="onChange" />
    <span class="g-form-check__icon">
      <i class="icon-check"></i>
    </span>
    <span class="g-form-check__text">
      <slot></slot>
    </span>
  </label>
</template>

<script>
// Style
import "./style.styl";

export default {
  name: "CheckBox",
  props: {
    initValue: {
      type: Boolean,
      default: false,
    },
    initError: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.value = this.initValue;
    this.error = this.initError;
  },
  data() {
    return {
      value: false,
      error: false,
    };
  },
  methods: {
    onChange(e) {
      this.value = e.target.checked;
      this.$emit("change", e.target.checked);
    },
  },
};
</script>

<style></style>
