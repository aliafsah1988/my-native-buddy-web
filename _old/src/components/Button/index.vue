<template>
  <fragment>
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
  </fragment>
</template>

<script>
import buttonType from "../../types/buttonType";
import buttonTheme from "../../types/buttonTheme";
import buttonSize from "../../types/buttonSize";

// Style
import "./style.styl";

export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: buttonType.BUTTON
    },
    theme: {
      type: String,
      default: buttonTheme.BRAND
    },
    size: {
      type: String,
      default: buttonSize.SMALL
    },
    className: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    linkAs: {
      type: String,
      default: ""
    },
    href: {
      type: String,
      default: ""
    }
  },
  computed: {
    classNames: function() {
      const theme = `g-button--${this.theme}`;
      const size = `g-button--${this.size}`;
      const className = this.className;

      const result = {
        "g-button": true,
        "g-button--loading": this.loading,
        block: this.block,
        "g-button--disabled": this.disabled
      };

      result[theme] = true;
      result[size] = true;
      result[className] = true;

      return result;
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>
