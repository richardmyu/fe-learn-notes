<template>
  <div id="app">
    <router-link to="/learncom">learncom</router-link>
    <router-link to="/learnnocom">learnnocom</router-link>
    <router-link to="/propcom">propcom</router-link>
    <router-link to="/propstreamcom">propstreamcom</router-link>
    <router-link to="/propsingle">propsingle</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>
<style>
a{
  padding: 5px 20px;
}
</style>
