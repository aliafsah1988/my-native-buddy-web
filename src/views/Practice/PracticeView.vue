<template>
  <div>Salam</div>
  <buttonn :text="'Play'" :theme="buttonType.BRAND_DARK" />
</template>
<script setup lang="ts">
import buttonn from "../../components/Button/Button.vue";
import buttonType from "../../../_old/src/types/buttonType";
import buttonTheme from "../../../_old/src/types/buttonTheme";
</script>
