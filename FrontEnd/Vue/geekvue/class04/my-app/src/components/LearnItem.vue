<template>
	<li :style="{color:item%2?'red':'blue'}">
		<input type="checkbox" v-model="checked">
		<slot name="item" v-bind="{checked}"></slot>
	</li>
</template>

<script>
export default {
  name: "learnItem",
  components: {},
  props: ["item"],
  data() {
    return {
      checked: false
    };
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
