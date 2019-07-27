<template>
  <div id="app">
    <learn-no-com></learn-no-com>
    <learn-com></learn-com>
  </div>
</template>

<script>
import learnNoCom from "./components/learnNoCom";
import learnCom from "./components/learnCom";

export default {
  name: "app",
  components: {
    "learn-no-com": learnNoCom,
    "learn-com": learnCom
  }
};
</script>

<style>
</style>
