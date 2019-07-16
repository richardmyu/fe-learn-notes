<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <router-link to="/foo">go to foo</router-link>
    <br/>
    <br/>
    <router-link to="/bar">go to bar</router-link>
    <br/>
    <br/>
    <router-link to="/foo11">go to foo11</router-link>
    <br/>
    <br/>
    <router-link to="/bar11">go to bar11</router-link>
    <br/>
    <br/>
    <router-view></router-view>
    <p>{{b}}</p>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  data() {
    return {
      a: 1
    };
  },
  computed: {
    b() {
      console.log(this.a);
      return this.a;
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    c() {
      for (let i = 0; i < 9; i++) {
        console.log(i, this.a);
        this.a++;
      }
    }
  },
  mounted() {
    this.c();
  }
};
</script>
