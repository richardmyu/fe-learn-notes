[toc]

# React笔记-1

@(框架学习)[react]


### JSX

JSX 用来声明 React 当中的元素。

`const element = <h1>Hello, world!</h1>;`

这种看起来可能有些奇怪的标签语法既不是字符串也不是HTML。它被称为 JSX, 一种 JavaScript 的语法扩展，即JavaScript+XML 。我们推荐在 React 中使用 JSX 来描述用户界面。JSX乍看起来可能比较像是模版语言，但事实上它完全是在 JavaScript 内部实现的。由于并不是JS引擎原生支持的，所以要想在浏览器里执行，需要先转成ES5代码React元素。

```
React.createElement('h1',{id:'msg'},'hello');
参数：元素类型，属性对象，子元素
createElement方法执行完成后返回一个虚拟的DOM对象
```

`render()`把一个虚拟DOM变成真实DOM并插入容器内部

##### JSX表达式

在 JSX 中你可以任意使用 JavaScript 表达式，只需要用一个大括号把表达式括起来。每一个 React 元素事实上都一个 JavaScript 对象，你可以在你的应用中把它当保存在变量中或者作为参数传递。

在JSX里可以嵌套表达式；表达式是一些变量和操作符的集合，一定要返回一个值。

在编译之后，JSX 其实会被转化为普通的 JavaScript 对象。这也就意味着，你其实可以在 if 或者 for 语句里使用 JSX，将它赋值给变量，当作参数传入，作为返回值都可以：
```
function getGreeting(user) {
if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
}
    return <h1>Hello, Stranger.</h1>;
}
```

> 1.如果需要换行的话，需要把JSX放在小括号里
> 2.如果想在JSX显示JS变量，则需要放入大括号,里面可以放入JS表达式
> 3.表达式里不能放对象,可以放字符串、数字等,还可以放函数的调用
> 4.JSX 会将引号当中的内容识别为字符串而不是表达式。

##### JSX 嵌套

如果 JSX 标签是闭合式的，那么你需要在结尾处用 `/>`, 就好像 XML/HTML 一样：
```
const element = <img src={user.avatarUrl} />;
//JSX 标签同样可以相互嵌套：
const element = (
    <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
    </div>
);
```

> 因为 JSX 的特性更接近 JavaScript 而不是 HTML ,所以 React DOM 使用 camelCase 小驼峰命名来定义属性的名称，而不是使用 HTML 的属性名称。

##### JSX 防注入攻击

你可以放心地在 JSX 当中使用用户输入：
```
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```
React DOM 在渲染之前默认会 '过滤' 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本)攻击。

##### JSX 代表 Objects

Babel 转译器会把 JSX 转换成一个名为 `React.createElement()` 的方法调用。

下面两种代码的作用是完全相同的：
```
const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);

const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);
```

`React.createElement()` 这个方法首先会进行一些避免bug的检查，之后会返回一个类似下面例子的对象：
```
// 注意: 以下示例是简化过的（不代表在 React 源码中是这样）
const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world'
    }
};
```
这样的对象被称为 `React 元素`。它代表所有你在屏幕上看到的东西。React 通过读取这些对象来构建 DOM 并保持数据内容一致。

##### JSX React元素的属性

1. 普通属性
2. 特殊属性:class=className、for=htmlFor
3. 如果属性名是多个单词的话，一定用驼峰命名法:z-index=> tabIndex
4. React元素有一个非常重要的属性: children

> 元素具有不变性，一旦创建就不能修改

### 元素渲染

##### ReactDOM渲染过程

1.把JSX元素转成React.createElement方法的调用
2.createElement会返回一个虚拟的DOM对象
3.render方法把虚拟的DOM对象转成真实DOM对象插入容器内部

React 元素都是immutable 不可变的。当元素被创建之后，你是无法改变其内容或属性的。一个元素就好像是动画里的一帧，它代表应用界面在某一时间点的样子。

根据我们现阶段了解的有关 React 知识，更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法。

> React 只会更新必要的部分
> React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。

### 组件

组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素。

当React遇到的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件,这个对象称之为“props”。

无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。

##### 纯函数

来看这个sum函数：
```
function sum(a, b) {
    return a + b;
}
```
类似于上面的这种函数称为“纯函数”，它没有改变它自己的输入值，当传入的值相同时，总是会返回相同的结果。

##### 渲染组件的过程

1.初始化属性对象，然后调用类的构造函数，并把属性对象传进去,得到组件类的实例；
2.会调用实例的render方法，得到React元素；
3.render方法把此React元素转成真实的DOM元素，并挂载到容器内部；

##### 组件

1.把一个页面划分若干独立的组件
2.组件就像一个纯函数，接收任意参数，返回一个仅且一个React元素
3.声明组件有两种方式：函数式、类定义

> 1.组件的名称首字符大写
> 因为组件和元素使用方式完全相同，但渲染方式不同。元素是直接渲染，而组件是渲染返回值，那么只能通过首字符大小写来区分组件和元素
> 2.组件函数要返回并且只能返回一个顶级React元素
> 3.函数组件没有实例，也没有this;类组件是有实例的，也有this,所以要通过this来调用属性
> 4.使用类来定义组件，必须继承自React.Component

##### 组件组合

组件可以在它的输出中引用其它组件，这就可以让我们用同一组件来抽象出任意层次的细节。在React应用中，按钮、表单、对话框、整个屏幕的内容等，这些通常都被表示为组件。

```
class Bed extends Component{
   render(){
       return (
           <div>
               this is a bed.
           </div>
       )
   }
}
class Cat extends Component{
    render(){
        return (
            <div>
                this is a cat.
            </div>
        )
    }
}
class Room extends Component{
    render(){
        return (
            <div>
                <Bed/>
                <Cat className="小红"/>
            </div>
        )
    }
}
class Home extends Component{
    render(){
        return (
            <div>
                <Cat/>
                <Room/>
                <Room/>
            </div>
        )
    }
}
```

> 我们可以直接在父级组件中使用子级组件，就像使用一个普通标签一样。React.js会在子级组件所在的地方把子级组件的render方法表示的JSX内容渲染出来。这样使得代码具有非常强的复用性，我们只需将复用的代码封装好，然后在所需地方引用即可。

React是非常灵活的，但它也有一个严格的规则：
所有的React组件必须像纯函数那样使用它们的props。

当然，应用的界面是随时间动态变化的，我们将在下一节介绍一种称为“state”的新概念，State可以在不违反上述规则的情况下，根据用户操作、网络响应、或者其他状态变化，使组件动态的响应并改变组件的输出。

##### state

组件的状态用来描述组件内部可以变化的数据；组件的状态是类组件特有的；当类实例化的时候，会自动调用构造函数，可以在构造函数内部里初始化状态对象；

> setState的注意事项
> 1.用来修改状态，传入一个增量对象，会覆盖同名属性或新增属性，而不是删除旧对象
> 2.除了构造函数，永远不要直接操作this.state

##### 属性和状态

1.组件属性的值由父组件传入，状态的值是内部初始化的；
2.组件的属性不能修改，状态的值可以修改；
3.组件的值自身不能修改，但父组件可以修改；组件的状态是内部初始化，只能在内部修改
4.组件的属性和状态都是当前组件的数据源；
5.组件是属性可以自上而下流动--单项数据流动（只能父传子）；

### 生命周期

将生命周期方法添加到类中在具有许多组件的应用程序中，在销毁时释放组件所占用的资源非常重要。

每当Clock组件第一次加载到DOM中的时候，我们都想生成定时器，这在React中被称为挂载。

同样，每当Clock生成的这个DOM被移除的时候，我们也会想要清除定时器，这在React中被称为卸载。

##### 数据自顶向下流动

父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。

这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问。

### 事件处理

React 元素的事件处理和 DOM元素的很相似。但是有一点语法上的不同:
React事件绑定属性的命名采用驼峰式写法，而不是小写。

如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)
