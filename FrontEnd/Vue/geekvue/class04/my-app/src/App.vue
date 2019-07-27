<template>
  <div id="app">
    <HelloWorld></HelloWorld>
    <PropCom></PropCom>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import PropCom from "./components/PropCom";

export default {
  name: "app",
  components: {
    HelloWorld,
    PropCom
  }
};
</script>

<style></style>
