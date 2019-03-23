### vue实例

##### 1.构造器

1.1 构造器(实例化)

```
var vm = new Vue({　
  //选项
})
```

DOM（3）
- --
el  //提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标

template  //一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发 slot

render  //字符串模板的代替方案
- --

数据（6）
- --
data  //Vue 实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化

props  //可以是数组或对象，用于接收来自父组件的数据

propsData  //创建实例时传递 props。主要作用是方便测试

computed  //计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例

methods  //methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例

watch  //一个对象，键是需要观察的表达式，值是对应回调函数
- --

生命周期钩子（10）
- --
beforeCreate

created

beforeMount

mounted

beforeUpdate

updated

activated  //keep-alive 组件激活时调用

deactivated  //keep-alive 组件停用时调用

beforeDestroy

destroyed
- --

> 有关生命周期更详细的内容看 <a href="./text2.md">text2.md</a>

资源（3）
- --
directives  //包含 Vue 实例可用指令的哈希表

filters  //包含 Vue 实例可用过滤器的哈希表

components  //包含 Vue 实例可用组件的哈希表
- --

杂项（6）
- --
parent  //指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 `this.$parent` 访问父实例，子实例被推入父实例的 `$children` 数组中

mixins  //mixins 选项接受一个混合对象的数组。Mixin 钩子按照传入顺序依次调用,并在调用组件自身的钩子之前被调用

name  //允许组件模板递归地调用自身。注意，组件在全局用 `Vue.component()` 注册时，全局 ID 自动作为组件的 name

extends  //允许声明扩展另一个组件。这主要是为了便于扩展单文件组件。这和 mixins 类似，区别在于，组件自身的选项会比要扩展的源组件具有更高的优先级

delimiters  //改变纯文本插入分隔符

functional  //使组件无状态（没有 data ）和无实例（没有 this 上下文）。他们用一个简单的 render 函数返回虚拟节点使他们更容易渲染
- --


1.2 扩展 Vue 构造器

可以扩展 Vue 构造器，从而用预定义选项创建可复用的组件构造器：

```
var MyComponent = Vue.extend({
  //...
}) 
```

##### 2.属性与方法

2.1 实例属性(10)

- --
`vm.$data`  //Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象属性的访问

`vm.$el`  //Vue 实例使用的根 DOM 元素

`vm.$options`  //用于当前 Vue 实例的初始化选项。需要在选项中包含自定义属性时会有用处

`vm.$parent`  //父实例，如果当前实例有的话

`vm.$root`  //当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自已

`vm.$children`  //当前实例的直接子组件

`vm.$slots`  //用来访问被 slot 分发的内容。每个具名 slot 有其相应的属性（例如：`slot="foo"` 中的内容将会在 `vm.$slots.foo `中被找到）。default 属性包括了所有没有被包含在具名 slot 中的节点

`vm.$scopedSlots`  //用来访问 `scoped slots`

`vm.$refs`  //一个对象，其中包含了所有拥有 ref 注册的子组件

`vm.$isServer`  //当前 Vue 实例是否运行于服务器
- --

2.2 实例方法/数据（3）

- --
`vm.$watch`  //观察 Vue 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值

`vm.$set`  //这是全局 `Vue.set` 的别名

`vm.$delete`  //这是全局 `Vue.delete` 的别名
- --

2.3 实例方法/事件（4）

- --
`vm.$on`  //监听当前实例上的自定义事件。事件可以由 `vm.$emit` 触发。回调函数会接收所有传入事件触发函数的额外参数

`vm.$once`  //监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器

`vm.$off`  //移除事件监听器

`vm.$emit`  //触发当前实例上的事件。附加参数都会传给监听器回调
- --

2.4 实例方法/生命周期（4）

- --
`vm.$mount`  //如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 `vm.$mount()` 手动地挂载一个未挂载的实例

`vm.$forceUpdate`  //迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件

`vm.$nextTick`  //将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新

`vm.$destroy`  //完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器
- --

##### 3.全局API（10）

- --
`Vue.extend`  //使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

`Vue.nextTick`  //在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

`Vue.set`  //设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。

`Vue.delete`  //删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制，但是你应该很少会使用它。

`Vue.directive`  //注册或获取全局指令。

`Vue.filter`  //注册或获取全局过滤器。

`Vue.component`  //注册或获取全局组件。注册还会自动使用给定的id设置组件的名称

`Vue.use`  //安装 Vue.js 插件。

`Vue.mixin`  //全局注册一个混合，影响注册之后所有创建的每个 Vue 实例。

`Vue.compile`  //在render函数中编译模板字符串。只在独立构建时有效
- --

##### 4.全局配置 Vue.config　（6）

- --
`Vue.config.silent = true`  //取消 Vue 所有的日志与警告。

`Vue.config.optionMergeStrategies.methods`  //自定义合并策略的选项。

`Vue.config.devtools= true`  //配置是否允许 vue-devtools 检查代码。

`Vue.config.errorHandler= functiono(err, vm){}`  //指定组件的渲染和观察期间未捕获错误的处理函数。

`Vue.config.ignoredElements = ['my-custom-web-component', 'another-web-component']`  //忽略在 Vue 之外的自定义元素。

`Vue.config.keyCodes`  //给 v-on 自定义键位别名
- --

参考：

1.[vue实例以及生命周期](https://www.cnblogs.com/xiaofenguo/p/6605091.html)