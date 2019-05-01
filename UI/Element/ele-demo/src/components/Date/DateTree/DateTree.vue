<template>
  <div class="container">
    <div class="container-title">
      <h1></h1>
      <p></p>
    </div>
    <div class="container-content">

      <!-- <section class="content-item">
        <div class="item-title">
          <h3></h3>
          <p></p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
          </el-tree>
        </div>
      </section> -->

      <!-- <section class="content-item">
        <div class="item-title">
          <h3></h3>
          <p></p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
                  Append
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
                  Delete
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </section> -->

      <!-- <section class="content-item">
        <div class="item-title">
          <h3></h3>
          <p></p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText1">
          </el-input>

          <el-tree
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode1"
            ref="tree1">
          </el-tree>
        </div>
      </section> -->

      <section class="content-item">
        <div class="item-title">
          <h3></h3>
          <p></p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText2">
          </el-input>

          <el-tree
            class="filter-tree"
            :data="data"
            node-key="id"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode2"
            ref="tree2">
          </el-tree>
        </div>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      filterText1: "",
      filterText2: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                  children: [
                    {
                      id: 11,
                      label: "四级 1-1-1-1"
                    },
                    {
                      id: 12,
                      label: "四级 1-1-1-2"
                    }
                  ]
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  props: "",
  components: {},
  computed: {},
  watch: {
    filterText1(val) {
      this.$refs.tree1.filter(val);
    },
    filterText2(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },

    filterNode1(value, data, node) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    filterNode2(value, data, node) {
      let isExist = false;
      if (!value) return true;
      // 查询当前节点
      console.log("===============");
      console.log("当前查询节点：", data.id);
      isExist = data.label.indexOf(value) !== -1;

      if (!isExist) {
        // 当前节点不满足条件--检测子节点
        console.log("节点" + data.id + "不满足条件,查询子节点");
        // value 条件
        // data 当前节点数据(定义数据部分)
        // node 节点信息
        this.nodeChildren(value, data, node);
      } else {
        // 当前节点满足条件--保存
        console.log("节点" + data.id + "满足条件,结束查询");
        return true;
      }
    },

    nodeChildren(value, data, node) {
      let childExist = false;
      let length = 0;
      // 没有子节点，移除
      if (!data.children) {
        console.log("节点" + data.id + "没有子节点,移除");
        this.remove(node,data);
        return false;
      }
      console.log("节点" + data.id + "的子节点：");
      // 有子节点
      childExist = data.children.some(item => {
        console.log(item.id);
        return item.label.indexOf(value) !== -1;
      });
      console.log("子节点状态：", childExist);
      if (childExist) {
        // 子节点存在并且至少有一个满足条件
        console.log("节点" + data.id + "至少有一个子节点满足条件");
        return true;
      } else {
        // 子节点存在，但都不满足条件
        console.log(
          "节点" + data.id + "的子节点都不满足条件，进一步测试子节点的子节点"
        );
        // ??? 只能检测到奇数位的子节点，会因为删除操作，无法检测偶数位的子节点
        data.children.forEach(item => {
          console.log("子节点的子节点：", item.id);
          this.nodeChildren(value, item, this.$refs.tree2.getNode(item));
        });
        // 最大的问题，多层嵌套，无法回溯移除祖父级及以上的节点。。。
      }
    }
  },
  beforeCreated() {},
  created() {},
  mounted() {}
};
</script>

<style></style>
<style scoped lang="less"></style>
