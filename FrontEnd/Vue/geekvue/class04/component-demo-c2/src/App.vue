<template>
  <div id="app">
    <learn-no-com></learn-no-com>
    <hr>
    <learn-com></learn-com>
  </div>
</template>

<script>
import learnCom from "./components/learnCom";
import learnNoCom from "./components/learnNoCom";

export default {
  name: "App",
  components: {
    "learn-com": learnCom,
    "learn-no-com": learnNoCom
  }
};
</script>

<style>
</style>
