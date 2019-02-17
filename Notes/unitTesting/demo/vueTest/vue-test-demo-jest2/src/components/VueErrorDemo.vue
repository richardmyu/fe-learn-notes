<template>
  <div class="container">
    <div class="message">{{message}}</div>Enter your username:
    <input v-model.trim="username" type="text">
    <div v-if="error" class="error">Please enter a username with at least seven letters.</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "VueErrorDemo",
  data() {
    return {
      message: 'Welcome to the Vue.js cookbook',
      username: ''
    }
  },
  props: '',
  components: {},
  computed: {
    error() {
      return this.username.length < 7
    }
  },
  watch: {},
  methods: {},
  beforeCreated() { },
  created() { },
  mounted() { },
}
</script>

<style></style>
<style scoped></style>
