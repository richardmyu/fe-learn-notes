# React 学习笔记

## tic-tac-toe

### 组件

```javascript
class User extends React.Component {
  render() {
    return (
      <div className="user-info">
        <p>{this.props.name}</p>
        ...
      </div>
    );
  }
}
```

这里的 `User` 是一种 React 组件类。一个组件会接受名为 `props` 的参数，并通过 `render` 方法返回一个嵌套结构的视图，即对渲染内容的描述。`render` 返回的是一个 React 元素，是一种对渲染内容的描述。大多数时候会采用 JSX 语法来书写。

在 JSX 中可以任意使用 JavaScript 对象，只需要用一个大括号把表达式括起来。每一个 React 元素事实上都是一个 JavaScript 对象，在应用中可以把它保存在变量中或者作为参数传递。

#### 1 props 传递数据

```javascript
class Board extends React.Component {
  renderSquares(i) {
    return <Square value={i} />;
  }
}

class Square extends React.Component {
  render() {
    return <button className="square">{this.props.valeu}</button>;
  }
}
```

在组件调用时，通过在调用过程中给组件增加属性来存值，而子组件通过 `this.props.属性名` 就可以获取父组件的数据。

```javascript
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => alert("click")}>
        {this.props.value}
      </button>
    );
  }
}
```

注意：`onClick={()=>alert("click")}` 和 `onClick={alert("click")}` 不同。前者是给 `onClick` 属性传递一个函数方法，后者是一个值。即前者只在点击触发时，才会执行这个函数方法，而后者在页面渲染时要获取值放到页面，会在页面渲染时就执行 `alert("click")`。

> 子组件在父组件中调用时，父组件给子组件定义的属性和子组件标签对之间的（children 属性）构成子组件的 props,只有标签对之间没有空格时，`props.children` 才不存在。其他情况都有，任何定义的属性除了 ref 和 key 均可以在 props 中拿到。children 属性有字符串和数组模式。

#### 2 state 传递数据

在组件的构造方法 `constructor` 中，可以通过 `this.state` 为该组件设置自身的状态数据。

```javascript
class Square extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({ value: "X" })}>
        {this.state.value}
      </button>
    );
  }
}
```

在使用 JavaScript classes 时，必须调用 `super();` 方法才能在继承父类的子类中正确获取到类型的 this。每当 `this.setState` 方法被触发时，组件都会准备更新。 React 通过比计较状态的变化来更新组件中跟随数据改变的内容。

#### 3 状态提升

当遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况下，把子组件的 state 数据提升至其共同的父组件中保存。之后父组件可以通过 props 将状态数据传递到子组件中。这样应用当中的状态数据就能够方便地交流共享了。像这种提升组件状态的情形在重构 React 组件时经常遇到。

```javascript
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  handleClick(i) {
    // 浅拷贝
    const squares = this.state.squares.slice();
    squares[i] = "X";
    this.setState({ squares: squares });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status"> {status} </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        ...
      </div>
    );
  }
}
```

每次点击格子时就会触发传入的 `onClick` 方法：

1.添加 `onClick` 属性到内置的 DOM 元素 `<button>` 中，让 React 开启了对点击事件的监听；

2.当棋盘格子被点击时，React 会调用 Square 组件的 `render()` 方法中的 `onClick` 事件处理函数(即绑定在 `<button>` 上的 `onClick` 方法)；

3.事件处理函数触发了传入其中的 `this.props.onClick()` 方法；

4.Board 传递了 `onClick={()=>this.handleClick(i)}` 给 Square，所以当 Square 中的事件处理函数（`this.props.onClick()`）触发时，等价于触发 Board 中的 `onClick` 方法， 然后会触发 `this.handleClick(i)` 方法；

#### 4 不可变性

子组件不再拥有自身的状态数据，而是从父组件接受数据，并且在自身变化触发父组件改变数状态数据，这类组件被称为**受控组件**。在上面通过 `.slice()` 方法对已有的数组数据进行了浅拷贝，以此来防止对已有数据的改变。改变数据的方式一般分两种。第一种直接修改已有的变量的值，第二种则将已有的变量替换为一个新的变量。结果一样，但第二种方式可以获得额外的好处：

1.很轻松地实现 撤销/重做 以及时间旅行

> 运用不可变性原则可以让我妈很容易实现一些复杂的功能。比如不改变已有的数据内容可以在需要的时候随时切换到历史数据，

2.记录变化

> 想要判断一个对象的改变，必选拿当前的对象和改变之前的对象相互比较，而遍历对象树的操作很复杂。而运用不可变性原则就很简单了。因为每次返回一个新的对象，只要判断这个对象是否被替换，就可以知道数据是否被改变。

3.在 React 中判定何时重新渲染

> 运用不可变性原则给 React 带来最大的好处是，可以很好的决定何时根据数据的改变重新渲染组件。尤其是在编写**纯组件（pure componnets）**时。

#### 5 函数定义组件

React 专门为像 Square 组件这种只有 `render` 方法的组件提供了一种更简洁的组件定义方法：函数定义组件。只需要写一个以 `props` 为参数的函数，返回 JSX 元素就可以了。

```javascript
function Squares(props) {
  return (
    <button className="square" onClick={props.onClock}>
      {props.value}
    </button>
  );
}
```

#### 6 key

key 是 React 中使用的一种特殊的属性（此外还有 ref 属性）。当元素被创建时，React 会将元素的 key 值和对应的元素绑定存储起来。尽管 key 看起来像是 props 的一部分，可事实上无法通过 `this.props.key` 获取到 key 的值。React 会自动的在判断元素更新时使用 key,而组件自身是无法获取到 key 的。

当一个列表被重新渲染时，React 会根据较新的元素内容依据相应的 key 值来匹配之前的元素内容。当一个新的 key 值添加到列表当中时，表示有一个组件被创建；被删除时表示有一个组件被销毁。Key 值可以让 React 明确标识每个组件，这样它才能在每次重新渲染时保有对应的状态数据。假如你去改变某个组件的 key 值的话，它会在下次渲染时被销毁并当作新的组件重新渲染进来。

强烈建议你在渲染列表项时添加 keys 值。 假如你没有现成可以作为唯一 key 值的数据使用的话，你可能需要考虑重新组织设计你的数据了。

假如你不提供任何 key 值，React 会提示警告，并且默认使用数组的索引作为默认的 key ，但只要你想在列表中对项目进行重新排列、添加或删除的话，这都不是一个好选择（因为对应的键值都会改变，也就会出现我们上面提到的组件 key 值被改变就会被当作新创建的组件处理那种情况）。手动添加列表索引值 key={i} 可以消除警告，但也会存在相同的问题，因此在大多数情况下都不推荐这种做法。

组件的 keys 值并不需要在全局都保证唯一，只需要在当前的节点里保证唯一即可。

## 主要概念

### 1 JSX 简介

`const element=<h1>Hello World!</h1>` 这种看起来的语法，既不是字符串也不是 HTML，被称为 JSX，一种 JavaScript 的语法扩展。JSX 用来声明 React 当中的元素。

#### 1.1 在 JSX 中使用表达式

可以任意地在 JSX 当中使用 JavaScript 表达式，在 JSX 当中的表达式要包含在大括号里。

> 注意：在 JSX 代码的外面扩上一个小括号，这样可以防止分号自动插入的 bug。

#### 1.2 JSX 本身也是表达式

在编译以后，JSX 也会被转化为普通的 JavaScript 对象。这意味着可以在 if 或者 for 语句中使用 JSX，将它赋值给变量，作参数传入或者作为返回值。

#### 1.3 JSX 属性

使用引号定义以字符串为值的属性；使用大括号定义以 JavaScript 表达式为值的属性。

```javascript
const element = <div tabIndex="0" />;
const element = <img src={user.avatarUrl} />;
```

#### 1.4 JSX 嵌套

如果 JSX 标签是闭合式的，那么你需要在结尾处用 `/>`, 就好像 XML/HTML 一样：

`const element = <img src={user.avatarUrl} />;`

JSX 标签同样可以相互嵌套。

> 注意：因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase （小驼峰命名）来定义属性的名称，而不是使用 HTML 的属性名称。

#### 1.5 JSX 防注入攻击

React DOM 在渲染之前默认会过滤所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击。

#### 1.6 JSX 代表 Objects

Babel 转译器会把 JSX 转换成一个名为 `React.createElement()` 的方法调用。

下面两种代码的作用是完全相同的：

```javascript
const element = <h1 className="greeting">Hello, world!</h1>;

const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);
```

`React.createElement()` 这个方法首先会进行一些避免 bug 的检查，之后会返回一个类似下面例子的对象：

```JavaScript
// 注意: 以下示例是简化过的（不代表在 React 源码中是这样）
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```

这样的对象被称为 “**React 元素**”。它代表所有你在屏幕上看到的东西。React 通过读取这些对象来构建 DOM 并保持数据内容一致。

### 2 元素渲染

元素是构成 React 应用的最小单位。元素用来描述屏幕上的内容。与浏览器的 DOM 元素不同，React 当中的元素事实上是普通的对象，React DOM 可以确保 浏览器 DOM 的数据内容与 React 元素保持一致。

#### 2.1 将元素渲染到 DOM 中

首先我们在一个 HTML 页面中添加一个 `id="root"` 的 `<div>`:

`<div id="root"></div>`

在此 div 中的所有内容都将由 React DOM 来管理，所以我们将其称之为 “根” DOM 节点。

我们用 React 开发应用时一般只会定义一个根节点。但如果你是在一个已有的项目当中引入 React 的话，你可能会需要在不同的部分单独定义 React 根节点。

要将 React 元素渲染到根 DOM 节点中，我们通过把它们都传递给 `ReactDOM.render()` 的方法来将其渲染到页面上。

#### 2.2 更新元素渲染

**React 元素都是 immutable 不可变的**。

当元素被创建之后，你是无法改变其内容或属性的。一个元素就好像是动画里的一帧，它代表应用界面在某一时间点的样子。

> 在实际生产开发中，大多数 React 应用只会调用一次 `ReactDOM.render()` 。

#### 2.3 React 只会更新必要的部分

React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。

> 根据我们以往的经验，将界面视为一个个特定时刻的固定内容（就像一帧一帧的动画），而不是随时处于变化之中（而不是处于变化中的一整段动画），将会有利于我们理清开发思路，减少各种 bug。

### 3 组件 & Props

组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的 React 元素。

#### 3.1 函数定义/类定义组件

定义一个组件最简单的方式是使用 JavaScript 函数：

```JavaScript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

该函数是一个有效的 React 组件，它接收一个单一的 “props” 对象并返回了一个 React 元素。我们之所以称这种类型的组件为**函数定义组件**，是因为从字面上来看，它就是一个 JavaScript 函数。

你也可以使用 ES6 class 来定义一个组件,这种类型的组件称为**类定义组件**:

```JavaScript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

上面两个组件在 React 中是相同的。

> 类具有一些额外特性。
> 组件名称必须以大写字母开头。

#### 3.2 组件渲染

React 元素都只是 DOM 标签，也可以是用户自定义的组件。当 React 遇到的元素是用户自定义的组件，它会将 JSX 属性作为单个对象传递给该组件，这个对象称之为 “**props**”。

```JavaScript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

#### 3.3 组合组件

组件可以在它的输出中引用其它组件，这就可以让我们用同一组件来抽象出任意层次的细节。

```JavaScript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

> 组件的返回值只能有一个根元素。这也是我们要用一个 `<div>` 来包裹所有 `<Welcome />` 元素的原因。

#### 3.4 Props 的只读性

无论是使用函数或是类来声明一个组件，它决不能修改它自己的 props。React 是非常灵活的，但它也有一个严格的规则：

**所有的 React 组件必须像纯函数那样使用它们的 props。**

当然，应用的界面是随时间动态变化的。State 可以在不违反上述规则的情况下，根据用户操作、网络响应、或者其他状态变化，使组件动态的响应并改变组件的输出。

### 4 State & 生命周期

状态与属性十分相似，但是状态是私有的，完全受控于当前组件。之前提到过，定义为类的组件有一些特性。局部状态就是如此：一个功能只适用于类。

#### 4.1 将函数转换为类

通过 5 个步骤将函数组件转换为类：

1.创建一个名称扩展为 `React.Component` 的 ES6 类;

2.创建一个叫做 `render()` 的空方法;

3.将函数体移动到 `render()` 方法中;

4.在 `render()` 方法中，使用 `this.props` 替换 `props`;

5.删除剩余的空函数声明;

> 使用类就允许我们使用其它特性，例如局部状态、生命周期钩子。

#### 4.2 为一个类添加局部状态

通过 3 个步骤将 date 从属性移动到状态中：

1.在 `render()` 方法中使用 `this.state.date` 替代 `this.props.date`

```JavaScript
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
```

2.添加一个类构造函数来初始化状态 `this.state`

```JavaScript
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

3.从元素中移除 date 属性

#### 4.3 将生命周期方法添加到类中

每当 Clock 组件第一次加载到 DOM 中的时候，我们都想生成定时器，这在 React 中被称为**挂载**。同样，每当 Clock 生成的这个 DOM 被移除的时候，我们也会想要清除定时器，这在 React 中被称为**卸载**。

可以在组件类上声明特殊的方法，这些方法被称作生命周期钩子：

```JavaScript
  componentDidMount() {
   this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

注意如何在 this 中保存定时器 ID。虽然 `this.props` 由 React 本身设置以及 `this.state` 具有特殊的含义，但如果需要存储不用于视觉输出的东西，则可以手动向类中添加其他字段。

> 如果不在 `render()` 中使用某些东西，它就不应该在状态中。

#### 4.4 正确地使用状态

关于 `setState()` 这里有三件事情需要知道

1.**不要直接更新状态**

例如，此代码不会重新渲染组件：

```JavaScript
// Wrong
this.state.comment = 'Hello';
应当使用 setState():

// Correct
this.setState({comment: 'Hello'});
```

> 构造函数是唯一能够初始化 `this.state` 的地方。

2.**状态更新可能是异步的**

React 可以将多个 `setState()` 调用合并成一个调用来提高性能。

因为 `this.props` 和 `this.state` 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

例如，此代码可能无法更新计数器：

```JavaScript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要修复它，请使用第二种形式的 `setState()` 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```JavaScript
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

3.**状态更新合并**

当你调用 `setState()` 时，React 将你提供的对象合并到当前状态。

例如，你的状态可能包含一些独立的变量：

```JavaScript
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

你可以调用 `setState()` 独立地更新它们：

```JavaScript
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

这里的合并是浅合并，也就是说 `this.setState({comments})` 完整保留了 `this.state.posts`，但完全替换了 `this.state.comments`。

#### 4.5 数据自顶向下流动

父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。

这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问。

组件可以选择将其状态作为属性传递给其子组件（这也适用于自定义组件）：

`<h2>It is {this.state.date.toLocaleTimeString()}.</h2>`

FormattedDate 组件将在其属性中接收到 date 值，并且不知道它是来自 Clock 状态、还是来自 Clock 的属性、亦或手工输入：

```JavaScript
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

这通常被称为自顶向下或**单向数据流**。

任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。

在 React 应用程序中，组件是有状态还是无状态被认为是可能随时间而变化的组件的实现细节。 可以在有状态组件中使用无状态组件，反之亦然。

### 5 事件处理

React 元素的事件处理和 DOM 元素的很相似。但是有一点语法上的不同:

- React 事件绑定属性的命名采用驼峰式写法，而不是小写
- 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM 元素的写法)

```JavaScript
//传统的 HTML：
<button onclick="activateLasers()">
  Activate Lasers
</button>

//React
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

- 在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault。

```JavaScript
//HTML
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>

//React
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

> 在这里，e 是一个合成事件。React 根据 W3C spec 来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。查看 SyntheticEvent 参考指南来了解更多。

使用 React 的时候通常你不需要使用 addEventListener 为一个已创建的 DOM 元素添加监听器。你仅仅需要在这个元素初始渲染的时候提供一个监听器。

当你使用 ES6 class 语法来定义一个组件的时候，事件处理器会成为类的一个方法。例如，下面的 Toggle 组件渲染一个让用户切换开关状态的按钮：

```JavaScript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定 `this.handleClick` 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。

这并不是 React 的特殊行为。通常情况下，如果你没有在方法后面添加 `()` ，例如 `onClick={this.handleClick}`，你应该为这个方法绑定 this。

如果使用 bind 让你很烦，这里有两种方式可以解决。如果你正在使用实验性的属性初始化器语法，你可以使用属性初始化器来正确的绑定回调函数：

```JavaScript
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

> 这个语法在 Create React App 中默认开启。

如果你没有使用属性初始化器语法，你可以在回调函数中使用箭头函数：

```JavaScript
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

> 使用这个语法有个问题就是每次 LoggingButton 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。

#### 5.1 向事件处理程序传递参数

通常我们会为事件处理程序传递额外的参数。例如，若是 id 是你要删除那一行的 id，以下两种方式都可以向事件处理程序传递参数：

```JavaScript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上述两种方式是等价的，分别通过 arrow functions 和 Function.prototype.bind 来为事件处理函数传递参数。

上面两个例子中，参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面，例如:

```JavaScript
class Popper extends React.Component{
    constructor(){
        super();
        this.state = {name:'Hello world!'};
    }

    preventPop(name, e){    //事件对象e要放在最后
        e.preventDefault();
        alert(name);
    }

    render(){
        return (
            <div>
                <p>hello</p>
                {/* Pass params via bind() method. */}
                <a href="https://reactjs.org" onClick={this.preventPop.bind(this,this.state.name)}>Click</a>
            </div>
        );
    }
}
```

### 6 条件渲染

在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后还可以根据应用的状态变化只渲染其中的一部分。

React 中的条件渲染和 JavaScript 中的一致，使用 JavaScript 操作符 if 或条件运算符来创建表示当前状态的元素，然后让 React 根据它们来更新 UI。

#### 6.1 元素变量

你可以使用变量来储存元素。它可以帮助你有条件的渲染组件的一部分，而输出的其他部分不会更改。

```JavaScript
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    //元素变量
    const isLoggedIn = this.state.isLoggedIn;
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
```

#### 6.2 与运算符 &&

JavaScript 的逻辑与 `&&`，它可以方便地条件渲染一个元素。如果条件是 true，`&&` 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。

#### 6.3 三目运算符

条件渲染的另一种方法是使用 JavaScript 的条件运算符 `condition ? true : false`。

#### 6.4 阻止组件渲染

在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。让 render 方法返回 null 而不是它的渲染结果即可实现。

```JavaScript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}
```

> 组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用。

### 7 列表 & Keys

#### 7.1 渲染多个组件

通过使用 `{}` 在 JSX 内构建一个元素集合。

```JavaScript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

#### 7.2 基础列表组件

```JavaScript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

> 运行这段代码，将会看到一个警告 `Warning: Each child in an array or iterator should have a unique "key" prop.` ，意思是创建一个元素时，必须包括一个特殊的 `key` 属性。

#### 7.3 Keys

Keys 可以在 DOM 中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。

> 如果列表可以重新排序，我们不建议使用索引来进行排序，因为这会导致渲染变得很慢。

#### 7.4 用 keys 提取组件

元素的 key 只有在它和它的兄弟节点对比时才有意义。

```JavaScript
function ListItem(props) {
  const value = props.value;
  return (
    // 错啦！你不需要在这里指定key:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    //错啦！元素的key应该在这里指定：
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

> 当你在 `map()` 方法的内部调用元素时，你最好随时记得为每一个元素加上一个独一无二的 key。

#### 7.5 元素的 key 在他的兄弟元素之间应该唯一

数组元素中使用的 key 在其兄弟之间应该是独一无二的。然而，它们不需要是全局唯一的。

key 会作为给 React 的提示，但不会传递给你的组件。如果您的组件中需要使用和 key 相同的值，请将其作为属性传递：

```JavaScript
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

上面例子中，Post 组件可以读出 `props.id`，但是不能读出 `props.key`。

#### 7.6 在 jsx 中嵌入 map()

JSX 允许在大括号中嵌入任何表达式，所以我们可以在 `map()` 中这样使用：

```JavaScript
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}
```

> 如果一个 `map()` 嵌套了太多层级，那可能就是你提取出组件的一个好时机。

### 8 表单

HTML 表单元素与 React 中的其他 DOM 元素有所不同,因为表单元素生来就保留一些内部状态。例如，下面这个表单只接受一个唯一的 name。

```JavaScript
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

当用户提交表单时，HTML 的默认行为会使这个表单跳转到一个新页面。在 React 中亦是如此。但大多数情况下，我们都会构造一个处理提交表单并可访问用户输入表单数据的函数。实现这一点的标准方法是使用一种称为“受控组件”的技术。

#### 8.1 受控组件

在 HTML 当中，像 `<input>`,`<textarea>` 和 `<select>` 这类表单元素会维持自身状态，并根据用户输入进行更新。但在 React 中，可变的状态通常保存在组件的状态属性中，并且只能用 `setState()` 方法进行更新。

我们通过使 React 变成一种单一数据源的状态来结合二者。React 负责渲染表单的组件仍然控制用户后续输入时所发生的变化。相应的，其值由 React 控制的输入表单元素称为“**受控组件**”。

例如，我们想要使上个例子中在提交表单时输出 name,我们可以写成“受控组件”的形式:

```JavaScript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //监听输入
    //每次输入触发，通过 event.target.value 获取输入的值，将其赋给 input 的 value
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

由于 value 属性是在我们的表单元素上设置的，因此显示的值将始终为 React 数据源上 this.state.value 的值。由于每次按键都会触发 `handleChange` 来更新当前 React 的 state，所展示的值也会随着不同用户的输入而更新。

使用”受控组件”,每个状态的改变都有一个与之相关的处理函数。这样就可以直接修改或验证用户输入。例如，我们如果想限制输入全部是大写字母，我们可以将 handleChange 写为如下：

```JavaScript
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

#### 8.2 textarea 标签

在 HTML 当中，`<textarea>` 元素通过子节点来定义它的文本内容

```JavaScript
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

在 React 中，`<textarea>` 会用 value 属性来代替。这样的话，表单中的 `<textarea>` 非常类似于使用单行输入的表单：

```JavaScript
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

> 注意 `this.state.value` 是在构造函数中初始化，这样文本区域就能获取到其中的文本。

#### 8.3 select 标签

在 HTML 当中，`<select>` 会创建一个下拉列表。例如这个 HTML 就创建了一个下拉列表的原型。

```JavaScript
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

请注意，Coconut 选项最初由于 selected 属性是被选中的。在 React 中，并不使用之前的 selected 属性，而在根 select 标签上用 value 属性来表示选中项。

这在受控组件中更为方便，因为你只需要在一个地方来更新组件。例如：

```JavaScript
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

总之，`<input type="text">`, `<textarea>` 和 `<select>` 都十分类似 - 他们都通过传入一个 value 属性来实现对组件的控制。

#### 8.4 file input 标签

在 HTML 当中，`<input type="file">` 允许用户从他们的存储设备中选择一个或多个文件以提交表单的方式上传到服务器上, 或者通过 Javascript 的 File API 对文件进行操作 。

`<input type="file" />`

由于该标签的 value 属性是只读的， 所以它是 React 中的一个非受控组件。

#### 8.5 多个输入的解决方法

当你有处理多个受控的 input 元素时，你可以通过给每个元素添加一个 name 属性，来让处理函数根据 `event.target.name` 的值来选择做什么。

```JavaScript
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    //type checkbox -- target.checked
    //type input -- target.value
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    //name
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

注意我们如何使用 ES6 当中的计算属性名语法来更新与给定输入名称相对应的状态键：

```JavaScript
this.setState({
  [name]: value
});
```

相当于如下 ES5 语法

```JavaScript
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

同样由于 `setState()` 自动将部分状态合并到当前状态，因此我们只需要使用发生变化的部分调用它。

#### 8.6 受控组件的替代方法

有时使用受控组件可能很繁琐，因为您要为数据可能发生变化的每一种方式都编写一个事件处理程序，并通过一个组件来管理全部的状态。当您将预先存在的代码库转换为 React 或将 React 应用程序与非 React 库集成时，这可能变得特别烦人。在以上情况下，你或许应该看看非受控组件，这是一种表单的替代技术。

### 9 状态提升

使用 React 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。这就是所谓的**状态提升**。

```JavaScript
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p> 水会烧开 </p>;
  }
  return <p> 水不会烧开 </p>;
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const scaleNames = {
  c:"Celsius",
  f:"Fahrenheit"
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      temperature: ''
    };
  }

  handleChange(e) {
    // this.setState({
    //   temperature:e.target.value
    // })
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    // const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend> Enter temperature in {scaleNames[scale]}: </legend>
        <input value = {temperature} onChange = {this.handleChange}/>
      </fieldset>
    );
  }
}

class Calculator extends Component {
  constructor(props){
    super(props);
    this.handleCelsiusChange=this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange=this.handleFahrenheitChange.bind(this);
    this.state={temperature:'',scale:'C'};
  }

  handleCelsiusChange(temperature){
    this.setState({scale:"c",temperature});
  }

  handleFahrenheitChange(temperature){
    this.setState({scale:"f",temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature=this.state.temperature;
    const celsius=scale==="f"?tryConvert(temperature,toCelsius):temperature;
    const fahrenheit=scale==="c"?tryConvert(temperature,toFahrenheit):temperature;
    return (
      <div>
        <TemperatureInput
          scale = "c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
          />
        <TemperatureInput
          scale = "f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
          />
          <BoilingVerdict celsius={parseFloat(celsius)}/>
      </div>
    );
  }
}
```

我们首先知道 props 是只读的这么一个事实。而之前 temperature 变量是被保存在其自身的 state 中的，TemperatureInput 组件只需要调用 `this.setState()` 就能改变它。但现在，temperature 是作为 prop 从父组件传递下来的，TemperatureInput 组件是没有控制权的。

在 React 中，这个问题通常是通过让组件“受控”来解决。就像 `<input>` 能够接受 value 和 onChange 这两个 prop 属性值，自定义组件 TemperatureInput 也能接受来自 Calculator 父组件的 temperature 变量和 onTemperatureChange 方法作为 props 属性值。

onTemperatureChange 和 temperature 两个 props 属性均由父组件 Calculator 提供。父组件可以通过自身的方法来响应状态数据的改变，从而使用新的值来重新渲染两个输入框组件。

在 React 应用中，对应任何可变数据理应只有一个单一“数据源”。通常，状态都是首先添加在需要渲染数据的组件中。此时，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的父组件中。你应该在应用中保持自上而下的数据流，而不是尝试在不同组件中同步状态。

状态提升比双向绑定方式要写更多的“模版代码”，但带来的好处是，你也可以更快地寻找和定位 bug 的工作。因为哪个组件保有状态数据，也只有它自己能够操作这些数据，发生 bug 的范围就被大大地减小了。此外，你也可以使用自定义逻辑来拒绝或者更改用户的输入。

如果某些数据可以由 props 或者 state 提供，那么它很有可能不应该在 state 中出现。举个例子，我们仅仅保存最新的编辑过的 temperature 和 scale 值，而不是同时保存 celsiusValue 和 fahrenheitValue 。另一个输入框中的值总是可以在 `render()` 函数中由这些保存的数据计算出来。这样我们可以根据同一个用户输入精准计算出两个需要使用的数据。

当你在开发 UI 界面遇到问题时，你可以使用 React 开发者工具来检查 props 属性，并且可以点击查看组件树，直到你找到负责目前状态更新的组件。这能让你到追踪到产生 bug 的源头。

### 10 组合 vs 继承

React 具有强大的组合模型，我们建议使用组合而不是继承来复用组件之间的代码。

#### 10.1 包含关系

一些组件不能提前知道它们的子组件是什么。这对于 Sidebar 或 Dialog 这类通用容器尤其常见。

我们建议这些组件使用 children 属性将子元素直接传递到输出。

```JavaScript
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

这样做还允许其他组件通过嵌套 JSX 来传递子组件。

```JavaScript
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

> `<FancyBorder>` JSX 标签内的任何内容都将通过 children 属性传入 FancyBorder。由于 FancyBorder 在一个 `<div>` 内渲染了 `{props.children}`，所以被传递的所有元素都会出现在最终输出中。

虽然不太常见，但有时你可能需要在组件中有多个入口，这种情况下你可以使用自己约定的属性而不是 children:

```JavaScript
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

> 类似 `<Contacts />` 和 `<Chat />` 这样的 React 元素都是对象，所以你可以像任何其他元素一样传递它们。

#### 10.2 特殊实例

有时我们认为组件是其他组件的特殊实例。在 React 中，这也是通过组合来实现的，通过配置属性用较特殊的组件来渲染较通用的组件。

```JavaScript
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

组合对于定义为类的组件同样适用。

#### 10.3 继承

属性和组合为你提供了以清晰和安全的方式自定义组件的样式和行为所需的所有灵活性。请记住，组件可以接受任意元素，包括基本数据类型、React 元素或函数。

如果要在组件之间复用 UI 无关的功能，我们建议将其提取到单独的 JavaScript 模块中。这样可以在不对组件进行扩展的前提下导入并使用该函数、对象或类。

### 11 React 理念

**第一步：把 UI 划分出组件层级**

第一件你要做的事情是用方框划分出每一个组件(和子组件)并给他们命名。

但你如何知道哪一部分应该成为一个组件？想想在编写代码时你在什么情况下需要新建一个函数或对象，思考方式是一样的。例如 单一功能原则，在理想状况下，一个组件应该只做一件事情。如果这个组件功能不断丰富，它应该被分成更小的组件。

既然你经常向用户展示 JSON 数据模型，你会发现，如果你的模型构建正确，你的 UI (以及你的组件结构)会被很好的映射。这是因为 UI 和数据模型往往遵循着相同的信息架构，这意味着将 UI 划分成组件的工作往往是很容易的。只要把它划分成能准确表示你数据模型的一部分的组件就可以。

**第二步：用 React 创建一个静态版本**

现在有了组件层级，是时候去实现你的应用了。最简单的方式是先创建一个静态版本：传入数据模型，渲染 UI 但没有任何交互。最好把这些过程解耦，因为创建一个静态版本更多需要的是码代码，不太需要逻辑思考，而添加交互则更多需要的是逻辑思考，不是码代码。

要构建一个用于呈现数据模型的静态版本的应用程序，你需要创建能够复用其他组件的组件，并通过 props 来传递数据。props 是一种从父级向子级传递数据的方法。如果你熟悉 state 的概念， 在创建静态版本的时候不要使用 state。State 只在交互的时候使用，即随时间变化的数据。由于这是静态版本的应用，你不需要使用它。

你可以自顶向下或者自底向上构建应用。也就是，你可以从层级最高的组件开始构建或层级最低的组件开始构建。在较为简单的例子中，通常自顶向下更容易，而在较大的项目中，自底向上会更容易并且在你构建的时候有利于编写测试。

在这步的最后，你会拥有一个用于呈现数据模型的可重用组件库。这些组件只会有 `render()` 方法，因为这只是你的应用的静态版本。层级最高的组件会把数据模型作为 prop 传入。如果你改变你的基础数据模型并且再次调用 `ReactDOM.render()`，UI 会更新。很容易看到你的 UI 是如何更新的，哪里进行了更新。因为没有什么复杂的事情发生。React 的单向数据流(也叫作单向绑定)保证了一切是模块化并且是快速的。

**第三步：定义 UI 状态的最小(但完整)表示**

为了使你的 UI 交互，你需要能够触发对底层数据模型的更改。React 使用 state，让这变的更容易。

为了正确构建你的应用，首先你需要考虑你的应用所需要的最小可变状态集。要点是 DRY：不要重复(Don’t Repeat Yourself)。找出应用程序的绝对最小表示并计算你所需要的其他任何请求。例如，如果你正在创建一个 TODO 列表，只要保存一个包含 TODO 事项的数组；不要为计数保留一个单独的状态变量。相反，当你想要渲染 TODO 计数时，只需要使用 TODO 数组的长度就可以了。

想想我们的实例应用中所有数据。让我们来看看每一条，找出哪一个是 state。每个数据只要考虑三个问题：

1.它是通过 props 从父级传来的吗？如果是，他可能不是 state。

2.它随着时间推移不变吗？如果是，它可能不是 state。

3.你能够根据组件中任何其他的 state 或 props 把它计算出来吗？如果是，它不是 state。

**第四步：确定你的 State 应该位于哪里**

好的，现在我们确定了应用 state 的最小集合。接下来，我们需要确定哪个组件会改变，或拥有这个 state。

> 记住：React 中的数据流是单向的，并在组件层次结构中向下传递。一开始我们可能不是很清楚哪个组件应该拥有哪个 state。在新手理解上这通常是最富有挑战性的部分，所以按照下面的步骤来辨别：

---

对你应用的每一个 state：

1.确定每一个需要这个 state 来渲染的组件。

2.找到一个公共所有者组件(一个在层级上高于所有其他需要这个 state 的组件的组件)

3.这个公共所有者组件或另一个层级更高的组件应该拥有这个 state。

4.如果你没有找到可以拥有这个 state 的组件，创建一个仅用来保存状态的组件并把它加入比这个公共所有者组件层级更高的地方。

---

**第五步：添加反向数据流**

到目前为止，我们已经创建了一个可以正确渲染的应用程序，它的数据在层级中通过函数的 props 和 state 向下流动。现在是时候支持其他方式的数据流了。

React 的数据流很明显，让你可以很轻松的了解你的程序是如何运行的，但相较于传统的双向绑定，它的代码量会稍微多一点。
