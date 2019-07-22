### 按键修饰符

记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名。全部的按键别名：

- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left
- .right

可以通过全局 `config.keyCodes` 对象自定义按键修饰符别名：

```
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

也可直接将 `KeyboardEvent.key` 暴露的任意有效按键名转换为 kebab-case 来作为修饰符：

`<input @keyup.page-down="onPageDown">`

在上面的例子中，处理函数仅在 `$event.key === 'PageDown'` 时被调用。

### 系统修饰符

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

- .ctrl
- .alt
- .shift
- .meta

请注意系统修饰键与常规按键不同，在和 keyup 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 ctrl 的情况下释放其它按键，才能触发 `keyup.ctrl`。而单单释放 ctrl 也不会触发事件。如果你想要这样的行为，请为 ctrl 换用 `keyCode：keyup.17`。

### .exact 修饰符

`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。

```
<!-- ctrl + [任意键] + click-->
<button @click.ctrl="onClick">click</button>

<!-- 有且只有 ctrl 按下才会触发 -->
<button @click.ctrl.exact="onClick">click</button>

<!-- 没有任何系统修饰符（其他可以）被按下才会触发 -->
<button @click.exact="onClick">click</button>
```

### 鼠标按钮修饰符

- .left
- .right
- .middle

这些修饰符会限制处理函数仅响应特定的鼠标按钮。