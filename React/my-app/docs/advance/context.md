# Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

## 何时使用 Context

> [demo (my-app/src/learn-demo/context/index.js)](../../../my-app/src/learn-demo/context/index.js)

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。举个例子，在下面的代码中，我们通过一个 “theme” 属性手动调整一个按钮组件的样式：

```jsx
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />
  }
}

function Toolbar(props) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  )
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />
  }
}
```

使用 context, 我们可以避免通过中间元素传递 props：

```jsx
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light')
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext
  render() {
    return <Button theme={this.context} />
  }
}
```

## 使用 Context 之前的考虑

Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。

如果你只是想避免层层传递一些属性，**组件组合**（component composition）有时候是一个比 context 更好的解决方案。

比如，考虑这样一个 `Page` 组件，它层层向下传递 `user` 和 `avatarSize` 属性，从而深度嵌套的 `Link` 和 `Avatar` 组件可以读取到这些属性：

```jsx
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

如果在最后只有 `Avatar` 组件真的需要 `user` 和 `avatarSize`，那么层层传递这两个 props 就显得非常冗余。而且一旦 `Avatar` 组件需要更多从来自顶层组件的 `props`，你还得在中间层级一个一个加上去，这将会变得非常麻烦。

一种无需 context 的解决方案是将 `Avatar` 组件自身传递下去，因而中间组件无需知道 `user` 或者 `avatarSize` 等 props：

```jsx
function Page(props) {
  const user = props.user
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  )
  return <PageLayout userLink={userLink} />
}

// 现在，我们有这样的组件：
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout userLink={...} />
// ... 渲染出 ...
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}
```

这种变化下，只有最顶部的 `Page` 组件需要知道 `Link` 和 `Avatar` 组件是如何使用 `user` 和 `avatarSize` 的。

> [demo (my-app/src/learn-demo/context/component-composition.js)](../../../my-app/src/learn-demo/context/component-composition.js)

这种对组件的控制反转减少了在你的应用中要传递的 props 数量，这在很多场景下会使得你的代码更加干净，使你对根组件有更多的把控。但是，这并不适用于每一个场景：这种将逻辑提升到组件树的更高层次来处理，会使得这些高层组件变得更复杂，并且会强行将低层组件适应这样的形式，这可能不会是你想要的。

而且你的组件并不限制于接收单个子组件。你可能会传递多个子组件，甚至会为这些子组件（children）封装多个单独的“接口（slots）”，正如这里的文档所列举的（见组合与继承章节）

```jsx
function Page(props) {
  const user = props.user
  const content = <Feed user={user} />
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  )
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  )
}
```

这种模式足够覆盖很多场景了，在这些场景下你需要将子组件和直接关联的父组件解耦。如果子组件需要在渲染前和父组件进行一些交流，你可以进一步使用 【render props】(见 render props 章节)。

但是，有的时候在组件树中很多不同层级的组件需要访问同样的一批数据。Context 能让你将这些数据向组件树下所有的组件进行“广播”，所有的组件都能访问到这些数据，也能访问到后续的数据更新。使用 context 的通用的场景包括管理当前的 locale，theme，或者一些缓存数据，这比替代方案要简单的多。

## API

- **React.createContext**

```jsx
const MyContext = React.createContext(defaultValue)
```

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 context 值。

只有当组件所处的树中没有匹配到 `Provider` 时，其 `defaultValue` 参数才会生效。这有助于在不使用 `Provider` 包装组件的情况下对组件进行测试。注意：将 `undefined` 传递给 `Provider` 的 `value` 时，**消费组件**（consumer component）的 `defaultValue` 不会生效。

- **Context.Provider**

```jsx
<MyContext.Provider value={/* 某个值 */}>
```

> [demo (my-app/src/learn-demo/context/provider.js)](../../../my-app/src/learn-demo/context/provider.js)

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

`Provider` 接收一个 `value` 属性，传递给消费组件。

一个 `Provider` 可以和多个消费组件有对应关系。

```jsx
class AppContextContainer extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={['blue']}>
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

class Toolbar extends React.Component {
  static contextType = ThemeContext /* blue*/
  render(){
    return (<>
      <ThemedButton />
      <p style={{ 'color': this.context }}>哈哈哈</p>
    </>)
  }
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext
  render() {
    return <Button theme={this.context} /> // blue
  }
}
```

多个 `Provider` 也可以嵌套使用，里层的会覆盖外层的数据。

```jsx
class AppContextContainer extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={['blue']}>
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

function Toolbar() {
  return (
    <ThemeContext.Provider value={['yellow']}>
      <ThemedButton />
    </ThemeContext.Provider>
  )
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext
  render() {
    return <Button theme={this.context} /> // yellow
  }
}
```

当 `Provider` 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。(注：注意是 `value` 值发生变化，除了直接修改 `value` 外，让当前组件重新渲染，使得 `value` 重新赋值，也是可以的)

`Provider` 及其内部消费组件都不受制于 `shouldComponentUpdate` 函数，因此当消费组件在其祖先组件退出更新的情况下也能更新。(注：)

通过新旧值检测来确定变化，使用了与 [Object.is](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 相同的算法。

> 注意
> 当传递对象给 `value` 时，检测变化的方式会导致一些问题：详见【注意事项】。

- **Class.contextType**

```jsx
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
MyClass.contextType = MyContext;
```

挂载在 class 上的 `contextType` 属性会被重赋值为一个由 `React.createContext()` 创建的 Context 对象。这能让你使用 `this.context` 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

> 注意：
> 你只通过该 API 订阅单一 `context`。如果你想订阅多个，阅读使用【多个 Context】
> 如果你正在使用实验性的 public class fields 语法，你可以使用 `static` 这个类属性来初始化你的 `contextType`。

```jsx
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}
```
