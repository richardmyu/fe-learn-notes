# setState

### React 中 setState 什么时候是同步的，什么时候是异步的？

react 会表现出同步和异步的现象，但本质上是同步的，是其批处理机制造成了一种异步的假象。（其实完全可以在开发过程中，在合成事件和生命周期函数里，完全可以将其视为异步）

> [第 18 题：React 中 setState 什么时候是同步的，什么时候是异步的？ #17](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17)

### React setState 笔试题，下面的代码输出什么？

```jsx
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }

  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```

第一次和第二次会合并：都是 `val(= 0) + 1` 操作。

> [第 19 题：React setState 笔试题，下面的代码输出什么？ #18](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/18)
