<template>
  <div>Salam</div>
  <Button :text="'Play'" :theme="buttonType.BRAND_DARK" @click="onClick" />
</template>
<script setup lang="ts">
import Button from "../../components/Button/Button.vue";
import buttonType from "../../../_old/src/types/buttonType";
import buttonTheme from "../../../_old/src/types/buttonTheme";

const onClick = () => {
  alert("boo boo");
};
</script>
