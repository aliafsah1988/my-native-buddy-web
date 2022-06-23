<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/practice">Practice</router-link> |
    <router-link to="/word">My Words</router-link> |
    <router-link to="/word/add">Add new word</router-link> |
    <router-link to="/group">My Groups</router-link> |
    <router-link to="/group/add">Add new group</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
