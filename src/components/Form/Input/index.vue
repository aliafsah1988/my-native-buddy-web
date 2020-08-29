<template>
  <div class="g-form-input" :class="{ error: hasError }">
    <input
      v-if="numeric"
      v-model="value"
      @keypress="isNumber($event)"
      :placeholder="placeholder"
      @change="onChange"
      @input="onInput"
    />
    <input
      v-else
      v-model="value"
      :placeholder="placeholder"
      @change="onChange"
      @input="onInput"
    />
    <span v-if="suffix" class="g-form-input__suffix">{{ suffix }}</span>
  </div>
</template>

<script>
// Style
import "./style.styl";

export default {
  name: "Input",
  props: {
    suffix: {
      type: String,
      default: ""
    },
    numeric: {
      type: Boolean,
      default: false
    },
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
  data() {
    return {
      value: ""
    };
  },
  watch: {
    initValue: function(val) {
      if (!val) return (this.value = "");
      this.value = val;
    }
  },
  methods: {
    onChange(e) {
      this.$emit("change", e.target.value);
    },
    onInput(e) {
      this.$emit("input", e.target.value);
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
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
