# 原始数据类型

## 布尔值

布尔值是最基础的数据类型，在 TypeScript 中，使用 boolean 定义布尔值类型：

```ts
let isDone: boolean = false;
```

注意，使用构造函数 Boolean 创造的对象不是布尔值：

```ts
let createdByNewBoolean: boolean = new Boolean(1);

// error TS2322: Type 'Boolean' is not assignable to type 'boolean'.

// 'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
```

直接调用 Boolean 也可以返回一个 boolean 类型：

```ts
let createdByBoolean: boolean = Boolean(1);
```

## 数值

使用 number 定义数值类型：

```ts
let decLiteral: number = 6;
let floatingNumber: number = 0.12;

// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
// ES6 中的十六进制表示法
let hexLiteral: number = 0xf00d;

// 科学计数法
let minNsub: number = 0.000002;
let minNsup: number = 0.0000003;
let maxNsup: number = 800000000000000000000;
let maxNsup: number = 9000000000000000000000;

let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

编译结果：

```js
var decLiteral = 6;
var floatingNumber = 0.12;

// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
// ES6 中的十六进制表示法
var hexLiteral = 0xf00d;

// 科学计数法
let minNumbersub: number = 0.000002;
let minNumbersup: number = 0.0000003;

let maxNumbersub: number = 800000000000000000000;
let maxNumbersup: number = 9000000000000000000000;

var notANumber = NaN;
var infinityNumber = Infinity;
```

除了二进制和八进制会被转换为十进制之外，其他不会变换，比如十六进制不转换，

## 字符串

使用 string 定义字符串类型：

```ts
let myName: string = "Tom";

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.`;
```

编译结果：

```js
var myName = "Tom";
// 模板字符串
var sentence = "Hello, my name is " + myName + ".";
```

## 空值

JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：

```ts
function alertName(): void {
  alert("My name is Tom");
}

function alertName() {
  alert("My name is Tom");
}
```

声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null：

```ts
let unusable: void = undefined;

let unusableStr: void = "undefined";
// error TS2322: Type '"undefined"' is not assignable to type 'void'
```

## Null 和 Undefined

在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：

```ts
let u: undefined = undefined;
let n: null = null;

let un: undefined = null;
let nu: null = undefined;

let uStr: undefined = "哈哈哈";
// error TS2322: Type '"哈哈哈"' is not assignable to type 'undefined'
let nStr: null = "哈哈哈";
// error TS2322: Type '"哈哈哈"' is not assignable to type 'undefined'
```

undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null。（根据实际结果来看，undefined 类型的变量也可以被赋值为 null，null 类型的变量也可以被赋值为 undefined）

与 void 的区别是，默认情况下 undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

```ts
// 这样不会报错
let num: number = undefined;
// 这样也不会报错
let u: undefined;
let num: number = u;

// 但我的检测插件会有错误提示
```

而 void 类型的变量不能赋值给 number 类型的变量：

```ts
let v: void;
let num: number = v;

// error TS2322: Type 'void' is not assignable to type 'number'.
```
