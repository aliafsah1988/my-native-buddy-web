<template>
  <a v-if="linkAs" :class="classNames" :href="href">
    <span>
      <slot />
    </span>
  </a>
  <a v-if="!linkAs && href" :href="href" :class="classNames">
    <span>
      <slot />
    </span>
  </a>
  <button
    v-if="!linkAs && !href"
    @click="onClick"
    :class="classNames"
    :type="type"
  >
    {{ text }}
    <!-- <slot /> -->
  </button>
</template>
<script setup lang="ts">
import { computed, defineProps } from "vue";
import buttonType from "../../../_old/src/types/buttonType";
import buttonTheme from "../../../_old/src/types/buttonTheme";
import buttonSize from "../../../_old/src/types/buttonSize";
import "./style.scss";

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: buttonType.BUTTON,
  },
  theme: {
    type: String,
    default: buttonTheme.BRAND,
  },
  size: {
    type: String,
    default: buttonSize.SMALL,
  },
  className: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  linkAs: {
    type: String,
    default: "",
  },
  href: {
    type: String,
    default: "",
  },
});

const classNames = computed(() => {
  const theme = `g-button--${props.theme}`;
  const size = `g-button--${props.size}`;
  const className = props.className;

  const result = {
    "g-button": true,
    "g-button--loading": props.loading,
    block: props.block,
    "g-button--disabled": props.disabled,
  };

  result[theme] = true;
  result[size] = true;
  result[className] = true;

  return result;
});
const emit = defineEmits(["click"]);

const onClick = () => {
  emit("click");
};
</script>
