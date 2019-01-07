# react 笔记-2

### 事件处理

React 元素的事件处理和 DOM 元素的很相似。但是有一点语法上的不同:

1.React事件绑定属性的命名采用小驼峰式写法，而不是小写;

2.如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法);

```javascript
// 例如，传统的 HTML：
<button onclick="activateLasers()">
  Activate Lasers
</button>

// React 中稍稍有点不同：
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

3.在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用preventDefault。

```javascript
// 传统的 HTML 中阻止链接默认打开一个新页面
<a href="#" onclick="return false">
  Click me
</a>;

// 在 React，应该这样来写：
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

在这里，e 是一个合成事件。React 根据 W3C spec 来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。

使用 React 的时候通常你不需要使用 addEventListener 为一个已创建的 DOM 元素添加监听器。你仅仅需要在这个元素初始渲染的时候提供一个监听器。

当你使用 ES6 class 语法来定义一个组件的时候，事件处理器会成为类的一个方法。

你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定`this.handleClick` 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是undefined。

这并不是 React 的特殊行为；它是函数如何在 JavaScript 中运行的一部分。通常情况下，如果你没有在方法后面添加 () ，例如 `onClick={this.handleClick}`，你应该为这个方法绑定this。

除了使用 bind 改变 this 的指向，还可以使用属性初始化器语法(实验性的)，这个语法在 Create React App 中默认开启。

```javascript
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.

  handleClick = () => {
    console.log("this is:", this);
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

也可以在回调函数中箭头函数；不过使用这种语法有个问题，就是每次组件渲染的时候都会创建一个不同的回调函数。

```javascript
class LoggingButton extends React.Component {
  handleClick() {
    console.log("this is:", this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return <button onClick={e => this.handleClick(e)}>Click me</button>;
  }
}
```

在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。

##### 向事件处理程序传递参数

通常我们会为事件处理程序传递额外的参数。例如，若是 id 是一个内联 id，以下两种方式都可以向事件处理程序传递参数：

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上述两种方式是等价的，分别通过 arrow functions 和 `Function.prototype.bind` 来为特定事件类型添加事件处理程序。

上面两个例子中，参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面。

### 条件渲染

在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后还可以根据应用的状态变化只渲染其中的一部分。

React 中的条件渲染和 JavaScript 中的一致，使用 JavaScript 操作符 if 或条件运算符来创建表示当前状态的元素，然后让 React 根据它们来更新 UI。

##### 元素变量

你可以使用变量来储存元素。它可以帮助你有条件的渲染组件的一部分，而输出的其他部分不会更改。可以使用逻辑与和三元运算符进行条件渲染。

##### 阻止组件渲染

在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。让 render 方法返回 null 而不是它的渲染结果即可实现。

组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用。

### 列表 & Keys

##### Keys

Keys 可以在 DOM 中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串;然而，它们不需要是全局唯一的。通常，我们使用来自数据的 id 作为元素的 key，当元素没有确定的 id 时，你可以使用他的序列号索引 index 作为 key。如果列表可以重新排序，我们不建议使用索引来进行排序，因为这会导致渲染变得很慢。

##### 用 keys 提取组件

元素的 key 只有在它和它的兄弟节点对比时才有意义。

比方说，如果你提取出一个 ListItem 组件，你应该把 key 保存在数组中的这个`<ListItem/>`元素上，而不是放在 ListItem 组件中的`<li>`元素上。

当你在 map()方法的内部调用元素时，你最好随时记得为每一个元素加上一个独一无二的 key。

key 会作为给 React 的提示，但不会传递给你的组件。如果您的组件中需要使用和 key 相同的值，请将其作为属性传递：

```javascript
const content = posts.map(post => (
  <Post key={post.id} id={post.id} title={post.title} />
));
```

上面例子中，Post 组件可以读出 props.id，但是不能读出 props.key

### 表单

HTML 表单元素与 React 中的其他 DOM 元素有所不同,因为表单元素生来就保留一些内部状态。例如，下面这个表单只接受一个唯一的 name。

```javascript
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

当用户提交表单时，HTML 的默认行为会使这个表单跳转到一个新页面。在 React 中亦是如此。

但大多数情况下，我们都会构造一个处理提交表单并可访问用户输入表单数据的函数。实现这一点的标准方法是使用一种称为“受控组件”的技术。

##### 受控组件

在 HTML 当中，像`<input>`,`<textarea>`, 和 `<select>`这类表单元素会维持自身状态，并根据用户输入进行更新。但在 React 中，可变的状态通常保存在组件的状态属性中，并且只能用`setState()`方法进行更新。

我们通过使 react 变成一种单一数据源的状态来结合二者。React 负责渲染表单的组件仍然控制用户后续输入时所发生的变化。相应的，其值由 React 控制的输入表单元素称为**“受控组件”**。（受控组件是一类表单元素，其值由 react 控制输入）

例如，我们想要使上个例子中在提交表单时输出 name,我们可以写成“受控组件”的形式:

由于 value 属性是在我们的表单元素上设置的，因此显示的值将始终为 React数据源上this.state.value 的值。由于每次按键都会触发 handleChange 来更新当前React的state，所展示的值也会随着不同用户的输入而更新。

使用”受控组件”,每个状态的改变都有一个与之相关的处理函数。这样就可以直接修改或验证用户输入。例如，我们如果想限制输入全部是大写字母，我们可以将 handleChange 写为如下：

```javascript
handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
}
```

##### textarea 标签

在 HTML 当中，`<textarea>` 元素通过子节点来定义它的文本内容

```javascript
<textarea>Hello there, this is some text in a text area</textarea>
```

在 React 中，`<textarea>`会用 value 属性来代替。这样的话，表单中的`<textarea>` 非常类似于使用单行输入的表单。

    注意this.state.value是在构造函数中初始化，这样文本区域就能获取到其中的文本。

##### select 标签

在 HTML 当中，`<select>`会创建一个下拉列表。例如这个 HTML 就创建了一个下拉列表的原型。

```javascript
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">
    Coconut
  </option>
  <option value="mango">Mango</option>
</select>
```

请注意，Coconut选项最初由于selected属性是被选中的。在React中，会在根select标签上而不是在当前的selected属性上使用value属性。

总之，`<input type="text">`, `<textarea>`, 和 `<select>` 都十分类似 - 他们都通过传入一个 value 属性来实现对组件的控制。

##### 多个输入的解决方法

当你有处理多个受控的 input 元素时，你可以通过给每个元素添加一个 name 属性，来让处理函数根据 `event.target.name`的值来选择做什么。

注意我们如何使用 ES6 当中的计算属性名语法来更新与给定输入名称相对应的状态键：

```javascript
this.setState({
  [name]: value
});
```

相当于如下 ES5 语法

```javascript
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

同样由于 `setState()` 自动将部分状态合并到当前状态，因此我们只需要使用发生变化的部分调用它。

##### 受控组件的替代方法

有时使用受控组件可能很繁琐，因为要为数据可能发生变化的每一种方式都编写一个事件处理程序，并通过一个组件来管理全部的状态。当将预先存在的代码库转换为 React 或将 React 应用程序与非 React 库集成时，这可能变得特别烦人。在以上情况下，你或许应该看看非受控组件，这是一种表单的替代技术。

##### this.props 失效

用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取。

```javascript
var Input = React.createClass({
  getInitialState: function() {
    return { value: "Hello!" };
  },
  handleChange: function(event) {
    this.setState({ value: event.target.value });
  },
  render: function() {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});

ReactDOM.render(<Input />, document.body);
```

上面代码中，文本输入框的值，不能用 `this.props.value` 读取，而要定义一个 onChange 事件的回调函数，通过`event.target.value` 读取用户输入的值。textarea 元素、select元素、radio元素都属于这种情况。

### 组件的生命周期

组件的生命周期分成三个状态：

```javascript
Mounting; //已插入真实 DOM
Updating; //正在被重新渲染
Unmounting; //已移出真实 DOM
```

React 为每个状态都提供了两种处理函数，`will` 函数在进入状态之前调用，`did` 函数在进入状态之后调用，三种状态共计五种处理函数。

```javascript
componentWillMount()
componentDidMount()
componentWillUpdate(object nextProps, object nextState)
componentDidUpdate(object prevProps, object prevState)
componentWillUnmount()
```

此外，React 还提供两种特殊状态的处理函数。

```javascript
componentWillReceiveProps(object nextProps)
//已加载组件收到新的参数时调用
shouldComponentUpdate(object nextProps, object nextState)
//组件判断是否重新渲染时调用
```

另外，组件的 style 属性的设置方式也值得注意，不能写成
`style="opacity:{this.state.opacity};"`

而要写成
`style={{opacity: this.state.opacity}}`

这是因为 React 组件样式是一个对象，所以第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。

##### Ajax

组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI 。

### 状态提升

使用 react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。

在 React 中，状态分享是通过将 state 数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。

##### 经验教训

在 React 应用中，对应任何可变数据理应只有一个单一“数据源”。通常，状态都是首先添加在需要渲染数据的组件中。此时，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的父组件中。你应该在应用中保持 自上而下的数据流，而不是尝试在不同组件中同步状态。

状态提升比双向绑定方式要写更多的“模版代码”，但带来的好处是，你也可以更快地寻找和定位bug的工作。因为哪个组件保有状态数据，也只有它自己能够操作这些数据，发生bug的范围就被大大地减小了。此外，你也可以使用自定义逻辑来拒绝或者更改用户的输入。

如果某些数据可以由 props 或者 state 提供，那么它很有可能不应该在 state 中出现。

当你在开发 UI 界面遇到问题时，你可以使用 React 开发者工具来检查 props 属性，并且可以点击查看组件树，直到你找到负责目前状态更新的组件。这能让你到追踪到产生 bug 的源头。

### Redux 介绍

随着 JavaScript 单页应用开发日趋复杂，JavaScript 需要管理比任何时候都要多的 state 。 这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。

管理不断变化的 state 非常困难。如果一个 model 的变化会引起另一个 model 变化，那么当 view 变化时，就可能引起对应 model 以及另一个 model 的变化，依次地，可能会引起另一个 view 的变化。直至你搞不清楚到底发生了什么。state 在什么时候，由于什么原因，如何变化已然不受控制。当系统变得错综复杂的时候，想重现问题或者添加新功能就会变得举步维艰。

这里的复杂性很大程度上来自于：我们总是将两个难以厘清的概念混淆在一起：**变化**和**异步**。 我称它们为曼妥思和可乐。如果把二者分开，能做的很好，但混到一起，就变得一团糟。一些库如 React 试图在视图层禁止异步和直接操作 DOM 来解决这个问题。美中不足的是，React 依旧把处理 state 中数据的问题留给了你。Redux 就是为了帮你解决这个问题。

跟随 Flux、CQRS 和 Event Sourcing 的脚步，**通过限制更新发生的时间和方式，Redux 试图让 state 的变化变得可预测**。这些限制条件反映在 Redux 的 三大原则中。

##### 核心概念

当使用普通对象来描述应的 state 时。例如，todo 应用的 state 可能长这样：

```javascript
{
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
}
```

这个对象就像 “Model”，区别是它并没有 setter（修改器方法）。因此其它的代码不能随意修复它，造成难以复现的 bug。

要想更新 state 中的数据，你需要发起一个 action。Action 就是一个普通 JavaScript 对象用来描述发生了什么。

下面是一些 action 的示例：

```javascript
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
```

强制使用 action 来描述所有变化带来的好处是可以清晰地知道应用中到底发生了什么。如果一些东西改变了，就可以知道为什么变。action 就像是描述发生了什么的面包屑。最终，为了把 action 和 state 串起来，开发一些函数，这就是 reducer。

reducer 只是一个接收 state 和 action，并返回新的 state 的函数。 对于大的应用来说，可能很难开发这样的函数，所以我们编写很多小函数来分别管理 state 的一部分。

这差不多就是 Redux 思想的全部。注意到没我们还没有使用任何 Redux 的 API。Redux 里有一些工具来简化这种模式，但是主要的想法是如何根据这些 action 对象来更新 state，而且 90% 的代码都是纯 JavaScript，没用 Redux、Redux API 和其它魔法。

##### 三大原则

- 1.单一数据源

**整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。**

这让**同构应用**开发变得非常容易。来自服务端的 state 可以在无需编写更多代码的情况下被序列化并注入到客户端中。由于是单一的 state tree ，调试也变得非常容易。在开发中，你可以把应用的 state 保存在本地，从而加快开发速度。此外，受益于单一的 state tree ，以前难以实现的如“撤销/重做”这类功能也变得轻而易举。

- 2.State 是只读的

**惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。**

这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心 race condition 的出现。 Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。

- 3.使用纯函数来执行修改

**为了描述 action 如何改变 state tree ，你需要编写 reducers。**

Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，因为 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。

### 基础

##### Action

Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。

添加新 todo 任务的 action 是这样的：

```javascript
const ADD_TODO = 'ADD_TODO'
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

`import { ADD_TODO, REMOVE_TODO } from '../actionTypes'`

除了 type 字段外，action 对象的结构完全由你自己决定。参照 Flux 标准 Action 获取关于如何构造 action 的建议。

这时，我们还需要再添加一个 action type 来表示用户完成任务的动作。因为数据是存放在数组中的，所以我们通过下标 index 来引用特定的任务。而实际项目中一般会在新建数据的时候生成唯一的 ID 作为数据的引用标识。

```javascript
{
  type: TOGGLE_TODO,
  index: 5
}
```

我们应该尽量减少在 action 中传递的数据(只传输必要的数据)。比如上面的例子，传递 index 就比把整个任务对象传过去要好。

最后，再添加一个 action type 来表示当前的任务展示选项。

```javascript
{
  type: SET_VISIBILITY_FILTER,
  filter: SHOW_COMPLETED
}
```

- Action 创建函数

Action 创建函数就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。

在 Redux 中的 action 创建函数只是简单的返回一个 action:

```javascript
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  };
}
```

这样做将使 action 创建函数更容易被移植和测试。

在传统的 Flux 实现中，当调用 action 创建函数时，一般会触发一个 dispatch，像这样：

```javascript
function addTodoWithDispatch(text) {
  const action = {
    type: ADD_TODO,
    text
  };
  dispatch(action);
}
```

不同的是，Redux 中只需把 action 创建函数的结果传给 `dispatch()` 方法即可发起一次 dispatch 过程。

```javascript
dispatch(addTodo(text));
dispatch(completeTodo(index));
```

或者创建一个被绑定的 action 创建函数来自动 dispatch：

```javascript
const boundAddTodo = text => dispatch(addTodo(text));
const boundCompleteTodo = index => dispatch(completeTodo(index));
```

然后直接调用它们：

```javascript
boundAddTodo(text);
boundCompleteTodo(index);
```

store 里能直接通过 `store.dispatch()` 调用 `dispatch()` 方法，但是多数情况下你会使用 react-redux 提供的 `connect()` 帮助器来调用。`bindActionCreators()` 可以自动把多个 action 创建函数 绑定到 `dispatch()` 方法上。

##### Reducer

Action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。

- 设计 State 结构

在 Redux 应用中，所有的 state 都被保存在一个单一对象中。建议在写代码前先想一下这个对象的结构。如何才能以最简的形式把应用的 state 用对象描述出来？

以 todo 应用为例，需要保存两种不同的数据：

- 当前选中的任务过滤条件；
- 完整的任务列表；

通常，这个 state 树还需要存放其它一些数据，以及一些 UI 相关的 state。这样做没问题，但尽量把这些数据与 UI 相关的 state 分开。

```javascript
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
```

- 处理 Reducer 关系时的注意事项

- 开发复杂的应用时，不可避免会有一些数据相互引用。建议你尽可能地把 state 范式化，不存在嵌套。把所有数据放到一个对象里，每个数据以 ID 为主键，不同实体或列表间通过 ID 相互引用数据。把应用的 state 想像成数据库。这种方法在 normalizr 文档里有详细阐述。例如，实际开发中，在 state 里同时存放 todosById: { id -> todo } 和 todos: array<id> 是比较好的方式。

- Action 处理

现在我们已经确定了 state 对象的结构，就可以开始开发 reducer。reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
`(previousState, action) => newState`

之所以称作 reducer 是因为它将被传递给 `Array.prototype.reduce(reducer, ?initialValue)`方法。保持 reducer 纯净非常重要。

- 永远不要在 reducer 里做这些操作：
- 1.修改传入参数；
- 2.执行有副作用的操作，如 API 请求和路由跳转；
- 3.调用非纯函数，如 Date.now() 或 Math.random()。

在高级篇里会介绍如何执行有副作用的操作。现在只需要谨记 reducer 一定要保持纯净。只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。

明白了这些之后，就可以开始编写 reducer，并让它来处理之前定义过的 action。

我们将以指定 state 的初始状态作为开始。Redux 首次执行时，state 为 undefined，此时我们可借机设置并返回应用的初始 state。

```javascript
import { VisibilityFilters } from "./actions";

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

function todoApp(state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }
  // 这里暂不处理任何 action，
  // 仅返回传入的 state。
  return state;
}
```

这里一个技巧是使用 ES6 参数默认值语法 来精简代码。

```javascript
function todoApp(state = initialState, action) {
  return state;
}
```

现在可以处理 `SET_VISIBILITY_FILTER`。需要做的只是改变 state 中的 visibilityFilter。

```javascript
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    default:
      return state;
  }
}
```

> 注意:

> 1.不要修改 state。 使用 Object.assign() 新建了一个副本。不能这样使用 Object.assign(state, { visibilityFilter: action.filter })，因为它会改变第一个参数的值。你必须把第一个参数设置为空对象。你也可以开启对 ES7 提案对象展开运算符的支持, 从而使用 { ...state, ...newState } 达到相同的目的。

> 2.在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。

Object.assign 须知

Object.assign() 是 ES6 特性，但多数浏览器并不支持。你要么使用 polyfill，Babel 插件，或者使用其它库如 _.assign() 提供的帮助方法。

switch 和样板代码须知

switch 语句并不是严格意义上的样板代码。Flux 中真实的样板代码是概念性的：更新必须要发送、Store 必须要注册到 Dispatcher、Store 必须是对象（开发同构应用时变得非常复杂）。为了解决这些问题，Redux 放弃了 event emitters（事件发送器），转而使用纯 reducer。

很不幸到现在为止，还有很多人存在一个误区：根据文档中是否使用 switch 来决定是否使用它。如果你不喜欢 switch，完全可以自定义一个 createReducer 函数来接收一个事件处理函数列表，参照"减少样板代码"。

- 处理多个 action

还有两个 action 需要处理。让我们先处理 ADD_TODO。

```javascript
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      });
    default:
      return state;
  }
}
```

如上，不直接修改 state 中的字段，而是返回新对象。新的 todos 对象就相当于旧的 todos 在末尾加上新建的 todo。而这个新的 todo 又是基于 action 中的数据创建的。

最后，TOGGLE_TODO 的实现也很好理解：

```javascript
case TOGGLE_TODO:
  return Object.assign({}, state, {
    todos: state.todos.map((todo, index) => {
      if (index === action.index) {
        return Object.assign({}, todo, {
          completed: !todo.completed
        })
      }
      return todo
    })
  })
```

我们需要修改数组中指定的数据项而又不希望导致突变, 因此我们的做法是在创建一个新的数组后, 将那些无需修改的项原封不动移入, 接着对需修改的项用新生成的对象替换。(译者注:Javascript 中的对象存储时均是由值和指向值的引用两个部分构成。此处突变指直接修改引用所指向的值, 而引用本身保持不变。) 如果经常需要这类的操作，可以选择使用帮助类 React-addons-update，updeep，或者使用原生支持深度更新的库 Immutable。最后，时刻谨记永远不要在克隆 state 前修改它。

- 拆分 Reducer

这里的 todos 和 visibilityFilter 的更新看起来是相互独立的。有时 state 中的字段是相互依赖的，需要认真考虑，但在这个案例中我们可以把 todos 更新的业务逻辑拆分到一个单独的函数里：

注意 todos 依旧接收 state，但它变成了一个数组！现在 todoApp 只把需要更新的一部分 state 传给 todos 函数，todos 函数自己确定如何更新这部分数据。**这就是所谓的 reducer 合成，它是开发 Redux 应用最基础的模式。**

现在我们可以开发一个函数来做为主 reducer，它调用多个子 reducer 分别处理 state 中的一部分数据，然后再把这些数据合成一个大的单一对象。主 reducer 并不需要设置初始化时完整的 state。初始时，如果传入 undefined, 子 reducer 将负责返回它们的默认值。

**注意每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。**

现在看起来好多了！随着应用的膨胀，我们还可以将拆分后的 reducer 放到不同的文件中, 以保持其独立性并用于专门处理不同的数据域。

最后，Redux 提供了 `combineReducers()` 工具类来做上面 todoApp 做的事情，这样就能消灭一些样板代码了。有了它，可以这样重构 todoApp：

```javascript
import { combineReducers } from "redux";

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;
```

注意上面的写法和下面完全等价：

```javascript
export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  };
}
```

你也可以给它们设置不同的 key，或者调用不同的函数。下面两种合成 reducer 方法完全等价：

```javascript
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
});
function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  };
}
```

`combineReducers()` 所做的只是生成一个函数，这个函数来调用你的一系列 reducer，每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理，然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象。没有任何魔法。

ES6 用户使用注意

combineReducers 接收一个对象，可以把所有顶级的 reducer 放到一个独立的文件中，通过 export 暴露出每个 reducer 函数，然后使用 import \* as reducers 得到一个以它们名字作为 key 的 object：

```javascript
import { combineReducers } from "redux";
import * as reducers from "./reducers";
const todoApp = combineReducers(reducers);
```

由于 import \* 还是比较新的语法，为了避免困惑，我们不会在本文档中使用它。但在一些社区示例中你可能会遇到它们。

##### Store

在前面的章节中，我们学会了使用 action 来描述“发生了什么”，和使用 reducers 来根据 action 更新 state 的用法。

Store 就是把它们联系到一起的对象。Store 有以下职责：

- 1.维持应用的 state；
- 2.提供 getState() 方法获取 state；
- 3.提供 dispatch(action) 方法更新 state；
- 4.通过 subscribe(listener) 注册监听器;
- 5.通过 subscribe(listener) 返回的函数注销监听器。

再次强调一下 Redux 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。

根据已有的 reducer 来创建 store 是非常容易的。在前一个章节中，我们使用 `combineReducers()` 将多个 reducer 合并成为一个。现在我们将其导入，并传递 `createStore()`。

```javascript
import { createStore } from "redux";
import todoApp from "./reducers";
let store = createStore(todoApp);
```

`createStore()` 的第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致, 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。
`let store = createStore(todoApp, window.STATE_FROM_SERVER)`

- 发起 Actions

现在我们已经创建好了 store ，让我们来验证一下！虽然还没有界面，我们已经可以测试数据处理逻辑了。

可以看到，在还没有开发界面的时候，我们就可以定义程序的行为。而且这时候已经可以写 reducer 和 action 创建函数的测试。不需要模拟任何东西，因为它们都是纯函数。只需调用一下，对返回值做断言，写测试就是这么简单。

##### 数据流

严格的单向数据流是 Redux 架构的设计核心。

这意味着应用中所有的数据都遵循相同的生命周期，这样可以让应用变得更加可预测且容易理解。同时也鼓励做数据范式化，这样可以避免使用多个且独立的无法相互引用的重复数据。

如果这些理由还不足以令你信服，读一下 动机 和 Flux 案例，这里面有更加详细的单向数据流优势分析。虽然 Redux 就不是严格意义上的 Flux，但它们有共同的设计思想。

Redux 应用中数据的生命周期遵循下面 4 个步骤：

1.**调用 store.dispatch(action)**

Action 就是一个描述“发生了什么”的普通对象。比如：

```javascript
 { type: 'LIKE_ARTICLE', articleId: 42 };
 { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } };
 { type: 'ADD_TODO', text: 'Read the Redux docs.'};
```

可以把 action 理解成新闻的摘要。如 “玛丽喜欢 42 号文章。” 或者 “任务列表里添加了'学习 Redux 文档'”。

你可以在任何地方调用 `store.dispatch(action)`，包括组件中、XHR 回调中、甚至定时器中。

2.**Redux store 调用传入的 reducer 函数**

Store 会把两个参数传入 reducer： 当前的 state 树和 action。例如，在这个 todo 应用中，根 reducer 可能接收这样的数据：

```javascript
// 当前应用的 state（todos 列表和选中的过滤器）
let previousState = {
  visibleTodoFilter: "SHOW_ALL",
  todos: [
    {
      text: "Read the docs.",
      complete: false
    }
  ]
};

// 将要执行的 action（添加一个 todo）
let action = {
  type: "ADD_TODO",
  text: "Understand the flow."
};

// render 返回处理后的应用状态
let nextState = todoApp(previousState, action);
```

注意 reducer 是纯函数。它仅仅用于计算下一个 state。它应该是完全可预测的：多次传入相同的输入必须产生相同的输出。它不应做有副作用的操作，如 API 调用或路由跳转。这些应该在 dispatch action 前发生。

3.**根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树**

根 reducer 的结构完全由你决定。Redux 原生提供`combineReducers()`辅助函数，来把根 reducer 拆分成多个函数，用于分别处理 state 树的一个分支。

下面演示 `combineReducers()` 如何使用。假如你有两个 reducer：一个是 todo 列表，另一个是当前选择的过滤器设置：

```javascript
function todos(state = [], action) {
  // 省略处理逻辑...
  return nextState;
}

function visibleTodoFilter(state = "SHOW_ALL", action) {
  // 省略处理逻辑...
  return nextState;
}

let todoApp = combineReducers({
  todos,
  visibleTodoFilter
});
```

当你触发 action 后，combineReducers 返回的 todoApp 会负责调用两个 reducer：

```javascript
let nextTodos = todos(state.todos, action);
let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action);
```

然后会把两个结果集合并成一个 state 树：

```javascript
return {
  todos: nextTodos,
  visibleTodoFilter: nextVisibleTodoFilter
};
```

虽然 `combineReducers()` 是一个很方便的辅助工具，你也可以选择不用；你可以自行实现自己的根 reducer！

4.**Redux store 保存了根 reducer 返回的完整 state 树**

这个新的树就是应用的下一个 state！所有订阅 `store.subscribe(listener)` 的监听器都将被调用；监听器里可以调用 `store.getState()` 获得当前 state。

现在，可以应用新的 state 来更新 UI。如果你使用了 React Redux 这类的绑定库，这时就应该调用 `component.setState(newState)` 来更新。

##### 搭配 React

这里需要再强调一下：Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。

尽管如此，Redux 还是和 React 和 Deku 这类框架搭配起来用最好，因为这类框架允许你以 state 函数的形式来描述界面，Redux 通过 action 的形式来发起 state 变化。

下面使用 React 来开发一个 todo 任务管理应用。

- 安装 React Redux

Redux 默认并不包含 React 绑定库，需要单独安装。
`npm install --save react-redux`

- 容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components）

Redux 的 React 绑定库包含了容器组件和展示组件相分离的开发思想。

明智的做法是只在最顶层组件（如路由操作）里使用 Redux。其余内部组件仅仅是展示性的，所有数据都通过 props 传入。

在这个 todo 应用中，只应有一个容器组件，它存在于组件的最顶层。在复杂的应用中，也有可能会有多个容器组件。虽然你也可以嵌套使用容器组件，但应该尽可能的使用传递 props 的形式。

- 设计组件层次结构

还记得当初如何 设计 state 根对象的结构 吗？现在就要定义与它匹配的界面的层次结构。其实这不是 Redux 相关的工作，React 开发思想在这方面解释的非常棒。

我们的概要设计很简单。我们想要显示一个 todo 项的列表。一个 todo 项被点击后，会增加一条删除线并标记 completed。我们会显示用户新增一个 todo 字段。在 footer 里显示一个可切换的显示全部/只显示 completed 的/只显示 incompleted 的 todos。

以下的这些组件（和它们的 props ）就是从这个设计里来的：

```javascript
AddTodo 输入字段的输入框和按钮。
onAddClick(text: string) 当按钮被点击时调用的回调函数。
TodoList 用于显示 todos 列表。
todos: Array 以 { text, completed } 形式显示的 todo 项数组。
onTodoClick(index: number) 当 todo 项被点击时调用的回调函数。
Todo 一个 todo 项。
text: string 显示的文本内容。
completed: boolean todo 项是否显示删除线。
onClick() 当 todo 项被点击时调用的回调函数。
Footer 一个允许用户改变可见 todo 过滤器的组件。
filter: string 当前的过滤器为： 'SHOW_ALL'、 'SHOW_COMPLETED' 或 'SHOW_ACTIVE'。
onFilterChange(nextFilter: string)： 当用户选择不同的过滤器时调用的回调函数。
```

这些全部都是展示组件。它们不知道数据是从哪里来的，或者数据是怎么变化的。你传入什么，它们就渲染什么。

如果你要把 Redux 迁移到别的上，你应该要保持这些组件的一致性。因为它们不依赖于 Redux。

直接写就是了！我们已经不用绑定到 Redux。你可以在开发过程中给出一些实验数据，直到它们渲染对了。

接着，我们想要通过 react-redux 提供的 `connect()` 方法将包装好的组件连接到 Redux。尽量只做一个顶层的组件，或者 route 处理。从技术上来说你可以将应用中的任何一个组件 `connect()` 到 Redux store 中，但尽量避免这么做，因为这个数据流很难追踪。

任何一个从 `connect()` 包装好的组件都可以得到一个 dispatch 方法作为组件的 props，以及得到全局 state 中所需的任何内容。 `connect()` 的唯一参数是 selector。此方法可以从 Redux store 接收到全局的 state，然后返回组件中需要的 props。最简单的情况下，可以返回一个初始的 state （例如，返回认证方法），但最好先将其进行转化。

为了使组合 selectors 更有效率，不妨看看 reselect。在这个例子中我们不会用到它，但它适合更大的应用。
