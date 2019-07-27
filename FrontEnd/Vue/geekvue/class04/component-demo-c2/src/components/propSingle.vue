<template>
	<div class="">
		<props-single :name="name" :type="success"></props-single>
	</div>
</template>

<script>
import Vue from "vue";
Vue.component("props-single", {
  props: {
    name: null,
    type: {
      validator: function(value) {
        return ["success", "warning", "danger"].includes(value);
      }
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleClick() {
      this.$nextTick(() => {
        this.name.name = "mark";
      });
      // console.log(this.name);
      // this.type = "warning";
      console.log(this.onChange);
      this.onChange(this.type === "success" ? "warning" : "success");
    }
  },
  template: `
	<div>
	<span>{{name.name?name.name:name}}</span>
	<span>{{type}}</span>
	<button @click="handleClick">change type</button>
	</div>
	`
});
export default {
  name: "propSingle",
  components: {
  },
  props: {},
  data() {
    return {
      success: "success",
      name: { name: "jack" }
    };
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
