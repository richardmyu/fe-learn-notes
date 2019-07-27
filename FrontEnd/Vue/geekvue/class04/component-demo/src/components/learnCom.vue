<template>
	<div class="container">
		<ul>
			<learn-item v-for="(item,index) of lists" :key="index" :name="item" @delete="handleDelete">
				<span slot="prefixIcon" slot-scope="props" :style="{color:props.color.checked?'red':'blue'}">{{props.color.checked+'o'}}前缀Icon [</span>
				<span slot="suffixIcon">] 后缀Icon</span>
			</learn-item>
		</ul>
	</div>
</template>

<script>
import Vue from "vue";
Vue.component("learn-item", {
  props: ["name"],
  data() {
    return {
      checked: false
    };
  },
  methods: {
    handleClick() {
      this.$emit("delete", this.name);
    },
    handleChange() {
      console.log(this.checked);
      this.checked = !this.checked;
    }
  },
  render(h) {
    // console.log(this.name);
    let self = this;
    let dT = h("li", [
      h("input", {
        attrs: { type: "checkbox", value: self.checked },
        on: {
          change: self.handleChange
        }
      }),
      self.$scopedSlots.prefixIcon({
        color: self.checked
			}),
      h("span", { domProps: { innerHTML: self.name } }),
      self.$slots.suffixIcon,
      h("button", {
        domProps: { innerHTML: "删除" },
        on: { click: self.handleClick }
      })
    ]);
    console.log(dT);
    return dT;
  }
});
export default {
  name: "learnCom",
  components: {},
  data() {
    return {
      // item: "",
      lists: ["学习VUE属性", "学习VUE事件", "学习VUE插槽"]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleDelete(item) {
      console.log("de: ", item);
      const index = this.lists.findIndex(text => text === item);
      this.lists.splice(index, 1);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
</style>
