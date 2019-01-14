<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}

.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 60px;
}

ul,
li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #999999;
}

.ql-editor {
  height: 500px;
}
</style>
