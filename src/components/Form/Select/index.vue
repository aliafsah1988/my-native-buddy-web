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

<script>
// Style
import "./style.styl";

export default {
  name: "Select",
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    showClose: {
      type: Boolean,
      default: true
    },
    error: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showOptions: false
    };
  },
  methods: {
    onSelect(option) {
      this.$emit("select", option);
    },
    onOpen() {
      this.showOptions = true;
    },
    onBlur() {
      setTimeout(() => {
        this.showOptions = false;
      }, 200);
    }
  }
};
</script>
