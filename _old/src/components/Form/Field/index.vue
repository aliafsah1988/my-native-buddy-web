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

<script>
// Style
import "./style.styl";
import Label from "../Label";

export default {
  name: "Field",
  components: {
    Label
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      default: ""
    }
  }
};
</script>
