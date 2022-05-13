<template>
  <textarea
    :placeholder="placeholder"
    class="g-form-textarea"
    :class="{ error: hasError }"
    @change="onChange"
    v-model="value"
  />
</template>

<script>
// Style
import "./style.styl";

export default {
  name: "Textarea",
  props: {
    error: {
      type: String,
      default: ""
    },
    initValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.value = this.initValue;
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onChange(e) {
      this.$emit("change", e.target.value);
    }
  },
  computed: {
    hasError: function() {
      return this.error && this.error.length > 0;
    }
  }
};
</script>

<style></style>
