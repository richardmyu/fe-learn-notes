<template>
	<div class="">
		<prop-single :initC="initC"></prop-single>
		<button @click="handleClick">P-add</button>
		<hr>
		<prop-single-gs :initCGs="initCGs"></prop-single-gs>
		<button @click="handleClickGs">P-add</button>
	</div>
</template>

<script>
import Vue from "vue";
Vue.component("prop-single", {
  props: ["initC"],
  data() {
    return {
      init: 0
    };
  },
  computed: {
    counter() {
      return Number(this.initC) + Number(this.init);
    }
  },
  methods: {
    handleClick() {
      this.init = Number(this.init) + 2;
      // console.log(this.counter);
    }
  },
  template: `<div>
	<p>{{counter}}</p>
	<button @click="handleClick">c-add</button>
	</div>`
});
Vue.component("prop-single-gs", {
  props: ["initCGs"],
  data() {
    return {
      init: this.initCGs
    };
  },
  methods: {
    handleClick() {
      this.init = this.init + 2;
      // console.log(this.init);
    }
  },
  template: `<div>
	<p>{{init}}</p>
	<button @click="handleClick">c-add</button>
	</div>`
});
export default {
  name: "PropStreamCom",
  components: {},
  props: {},
  data() {
    return {
      initC: 0,
      initCGs: 0
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClick() {
      // console.log("p", this.initC);
      this.initC = Number(this.initC) + 1;
    },
    handleClickGs() {
      // console.log("p", this.initCGs);
      this.initCGs = Number(this.initCGs) + 1;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>
