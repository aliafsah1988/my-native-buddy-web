<template>
  <div class="g-form-select">
    <div class="g-form-select__text">
      <input
        class="g-form-select--input"
        type="text"
        :value="value"
        @click="onOpen"
        @blur="onBlur"
      />
      <div class="g-autocomplete__icon g-form-select__text--indicator medium">
        <i class="icon-search" />
      </div>
      <div class="g-autocomplete__icon g-form-select__text--loading medium">
        <i class="icon-light  " />
      </div>
      <div
        v-if="showClose && value"
        class="g-autocomplete__icon g-form-select__text--close medium"
        @click="onClose"
      >
        <i class="icon-close" />
      </div>
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
    onClose() {
      this.$emit("close");
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
