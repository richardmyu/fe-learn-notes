<template>
	<div class="">
		<blog-post post-title="hello!"></blog-post>
	</div>
</template>

<script>
import Vue from "vue";
Vue.component("blog-post", {
  props: ["propTitle"],
  template: `<h3>{{postTitle}}</h3>`
});
export default {
  name: "PropCom",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
</style>
