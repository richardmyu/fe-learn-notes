<template>
	<ul>
		<learn-item v-for="(item,index) of list" :key="index" :item="item" @delete="handleDelete">
			<!-- <span slot="prefixIcon" slot-scope="props" :style="{color:props.color.checked?'red':'blue'}"> pI </span> -->
			<span slot="prefixIcon" slot-scope="props" :style="{color:props.checked?'red':'blue'}"> pI </span>
			<span slot="suffixIcon"> sI </span>
		</learn-item>
	</ul>
</template>

<script>
import Vue from "vue";
Vue.component("learn-item", {
  props: ["item"],
  data() {
    return {
      checked: false
    };
  },
  template: `
		<li>
		<input type="checkbox" v-model="checked">
		<slot name="prefixIcon" v-bind="{checked}"></slot>
		<span>{{item}}</span>
		<slot name="suffixIcon"></slot>
		<button @click="handleClick">删除</button>
		</li>
	`,
  methods: {
    handleClick() {
      this.$emit("delete", this.item);
    }
  }
});
export default {
  name: "learnCom",
  components: {},
  props: {},
  data() {
    return {
      list: ["学习VUE属性", "学习VUE事件", "学习VUE插槽"]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleDelete(item) {
      const index = this.list.findIndex(text => text === item);
      this.list.splice(index, 1);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>
