<template>
	<div class="">
		<a-tabs>
			<a-tab-pane key="props" tab="属性">
				<Props
				  name="Hello Vue!"
					:type="type"
					:is-visible="false"
					:on-change="handlePropChange"
					title="属性Demo"
					class="test1"
					:class="['test2']"
					:style="{marginTop:'20px'}"
					style="margin-top:10px;"
					@changeType='handleTypeChange'
				></Props>
			</a-tab-pane>
			<a-tab-pane key="event" tab="事件">
				<Event :name="name" @change="handleEventChange"></Event>
			</a-tab-pane>
			<a-tab-pane key="slot" tab="插槽">
				<h2>2.6新语法</h2>
				<SlotDemo>
					<p>Default slot</p>
					<template v-slot:title>
						<p>title slot1</p>
						<p>title slot2</p>
					</template>
					<template v-slot:item="props">
						<p>item slot-scope {{props}}</p>
					</template>
				</SlotDemo>
				<br>
				<h2>老语法</h2>
				<SlotDemo>
					<p>Default slot</p>
					<p slot="title">title slot1</p>
					<p slot="title">title slot2</p>
					<p slot="item" slot-scope="props">title slot-scope {{props}}</p>
				</SlotDemo>
			</a-tab-pane>
			<a-tab-pane key="bigProps" tab="大属性">
				<BigProps
				  :name="bigPropsName"
					:on-change="handleBigPropsChange"
					:slot-default="getDefault()"
					:slot-title="getTitle()"
					:slot-scope-item="getItem"
				></BigProps>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
import Props from "./DemoProps";
import Event from "./DemoEvent";
import SlotDemo from "./DemoSlot";
import BigProps from "./DemoBigProps";
export default {
  name: "DemoIndex",
  components: {
    Props,
    Event,
    SlotDemo,
    BigProps
  },
  props: {},
  data() {
    return {
      name: "event",
      type: "success",
      bigPropsName: "Hello world!"
    };
  },
  watch: {},
  computed: {},
  methods: {
		// slot -- handleClick
    handlePropChange(val) {
      // console.log("type-value-change", val);
      this.type = val;
		},
		// emit
    handleTypeChange(val) {
			// console.log("type-value-typeChange",val);
      this.type = val;
    },
    handleEventChange(val) {
			// console.log('event-parent',val);
      this.name = val;
    },
    handleBigPropsChange(val) {
      this.bigPropsName = val;
    },
    getDefault() {
      return [this.$createElement("p", "default slot")];
    },
    getTitle() {
      return [
        this.$createElement("p", "title slot1"),
        this.$createElement("p", "title slot2")
      ];
    },
    getItem(props) {
			console.log(props);
      return [
        this.$createElement("p", `item slot-scope ${JSON.stringify(props)}`)
      ];
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>
