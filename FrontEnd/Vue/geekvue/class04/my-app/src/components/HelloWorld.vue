<template>
  <div class="hello">
    <div>
      <input type="number" v-model="info" />
      <button @click="handleClick">add</button>
    </div>
    <ul>
      <todo-item
        v-for="(item,index) of list"
        :key="index"
        :item="item"
      >
      <!-- 2.5-- 语法 -->
      <!-- <span slot="item" slot-scope="itemProps" style="font-size:20px" :style="{color:itemProps.checked?'yellow':'green'}">{{item}}</span> -->
      <span slot="item" slot-scope="{checked}" style="font-size:20px" :style="{color:checked?'yellow':'green'}">{{item}}</span>
      <!-- 2.6 语法 -->
      <!-- <template v-slot:item="itemProps">
        <span style="font-size:20px" :style="{color:itemProps.checked?'yellow':'green'}">{{item}}</span>
      </template> -->
      </todo-item>
    </ul>
  </div>
</template>

<script>
import LearnItem from "./LearnItem";
export default {
  name: "HelloWorld",
  props: {},
  components: {
    "todo-item": LearnItem
  },
  data() {
    return {
      msg: "Hellw World",
      info: "",
      list: []
    };
  },
  methods: {
    handleClick() {
    //   console.log(this.info);
      this.list.push(this.info);
      this.info = "";
    }
  }
};
</script>

<style scoped></style>
