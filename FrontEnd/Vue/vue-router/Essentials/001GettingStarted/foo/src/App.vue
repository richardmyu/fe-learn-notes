<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <router-link to="/foo">go to foo</router-link>
    <br/>
    <br/>
    <router-link to="/bar">go to bar</router-link>
    <br/>
    <br/>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  }
};
</script>
