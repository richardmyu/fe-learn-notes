<template>
	<div class="">
		<slot></slot>
		<slot name="title"></slot>
		<slot name="item" v-bind="{value:'vue'}"></slot>
	</div>
</template>

<script>
export default {
  name: "DemoSlot",
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
<style scoped>
</style>
