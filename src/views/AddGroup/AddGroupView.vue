<template>
  <div class="add-group-container">
    <Group @change="onChange" :type="'add'" :group="editGroup" />
    <Button
      :text="'Save'"
      @click="save"
      :loading="loading"
      :theme="buttonTheme.BRAND_DARK"
    />
    <Button
      :text="'Cancel'"
      @click="onCancel"
      :theme="buttonTheme.BRAND_DARK"
    />
  </div>
</template>

<script setup lang="ts">
// import Group from "../../components/Form/";
import Button from "../../components/Button/Button.vue";
import ButtonTheme from "../../types/ButtonTheme";
</script>
<style lang="scss" scoped>
@import "./AddWord.scss";
</style>
