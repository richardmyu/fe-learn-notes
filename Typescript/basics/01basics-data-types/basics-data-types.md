# 基础数据类型

## 介绍

### 1.布尔值

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
console.log(noCreate); // true
```

### 2.数值

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

console.log(binaryLiteral); // 10
console.log(octalLiteral); // 484
console.log(hexLiteral); //61453

// 科学计数法
let minNumbersub: number = 0.000002;
let minNumbersup: number = 0.0000003;
let maxNumbersub: number = 800000000000000000000;
let maxNumbersup: number = 9000000000000000000000;

console.log(minNumbersub); // 0.000002
console.log(minNumbersup); // 3e-7
console.log(maxNumbersub); // 800000000000000000000
console.log(maxNumbersup); // 9e+21

var notANumber = NaN;
var infinityNumber = Infinity;
```

在编译过程中，二进制和八进制会被转换为十进制之外，而十六进制不转换。但在执行的时候，都会转换为十进制。

### 3.字符串

使用 string 定义字符串类型：

```ts
let myName: string = "Tom";

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.`;
console.log(sentence); // Hello, my name is Tom.
console.log(typeof sentence); // string
```

编译结果：

```js
var myName = "Tom";
var sentence = "Hello, my name is " + myName + ".";
```

### 4.数组

TypeScript 像 JavaScript 一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 `[]`，表示由此类型元素组成的一个数组：

```ts
let list: number[] = [1, 2, 3];

let listMin: number[] = [1, "2"];
// error TS2322: Type 'string' is not assignable to type 'number'.

// 混合数组
let listMin2: (number | string)[] = [1, "2"];
// 数组成员为数组类型时，不能用 array/Array 标识，而用 []
// 正则不能用 regexp 而用 RegExp
// null/undefiend 只能用 null/undefiend 而不能用 Null/Undefiend
let listMin3: (number | string | object | boolean | null | RegExp)[] = [
  1,
  "2",
  true,
  {},
  null,
  /sd/g
];
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```ts
let listAry: Array<number> = [1, 2, 3];
// 混合类型
let listAryMini: Array<
  number | string | Boolean | [] | object | undefined | null | RegExp
> = [1, "2", true, {}, null, /sd/g];
```

访问/修改/新增数组成员：

```ts
list[1] = "23";
// error TS2322: Type '"23"' is not assignable to type 'number'.

list[4] = 90;
console.log(list);
// [ 1, 2, 3, <1 empty item>, 90 ]

console.log(listMin2[3]);
listMin2[4] = "sdf";
listMin2[1] = 2;
console.log(listMin2);
// undefined
// [ 1, 2, <2 empty items>, 'sdf' ]
```

**小结**

数组可以越界访问，只是在修改成员以及新增成员时，必须是定义时允许的类型范围。

### 5.元组 Tuple

元组类型允许表示一个已知元素 **数量** 和 **类型** 的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string 和 number 类型的元组。

```ts
// 定义 tuple 类型
let x: [string, number];

// 赋值
x = ["hello", 10];

// 与定义顺序不同，会报错
x = [10, "hello"];
// error TS2322: Type 'number' is not assignable to type 'string'.
// error TS2322: Type 'string' is not assignable to type 'number'.
```

访问元素：

```ts
console.log(x[0].slice());

// x[1] 是 number 类型，没有 slice 方法
console.log(x[1].slice());
// error TS2339: Property 'slice' does not exist on type 'number'.

// x[2] 不存在，是一个 undefined 的
console.log(x[2].slice());
// error TS2532: Object is possibly 'undefined'.
// error TS2493: Tuple type '[string, number]' of length '2' has no element at index '2'.
```

当访问一个越界的元素，会使用联合类型替代：

```ts
// 实际测试，不能越界设置值，教程有误
console.log(x[3].toString());
console.log(x[3].valueOf());
// error TS2532: Object is possibly 'undefined'.
// error TS2493: Tuple type '[string, number]' of length '2' has no element at index '3'.

x[5] = "hhh";
// error TS2322: Type '"hhh"' is not assignable to type 'undefined'.
// error TS2493: Tuple type '[string, number]' of length '2' has no element at index '5'.

x[0] = "jjjj"; // ok
```

**小结**

用元组定义的数组，数组成员的数量和类型在一开始就被固定了，以后的操作中只能进行读取，或者修改已存在的数组成员的值为对应类型的值。这一点和数组很不同，可以认为元组是“固定型”数组。

### 6.枚举

enum 类型是对 JavaScript 标准数据类型的一个补充。 像 C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```ts
enum Color {
  Red,
  Green,
  Blue
}
console.log(Color);
// { '0': 'Red', '1': 'Green', '2': 'Blue', Red: 0, Green: 1, Blue: 2 }

let c: Color = Color.Green; // 1
```

默认情况下，从 0 开始为元素编号。 可以手动的指定成员的数值。

```ts
// 部分排序
enum ColorS {
  Red = 1,
  Green,
  Blue
}
console.log(ColorS);
// { '1': 'Red', '2': 'Green', '3': 'Blue', Red: 1, Green: 2, Blue: 3 }
let c: ColorS = ColorS.Green; // 2

// 全部排序
enum ColorA {
  Red = 1,
  Green = 3,
  Blue = 5
}
console.log(ColorA);
// { '1': 'Red', '3': 'Green', '5': 'Blue', Red: 1, Green: 3, Blue: 5 }
let ca: ColorA = ColorA.Green; // 3
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为 2，但是不确定它映射到 Color 里的哪个名字，我们可以查找相应的名字：

```ts
let colorName: string = Color[2];
console.log(colorName); // blue
```

**小结**

枚举很像特殊的对象，特殊在于枚举也有两套访问机制，定义时的字符以及对应的索引。

### 7.任意值

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。那么我们可以使用 any 类型来标记这些变量。

如果是一个普通类型，在赋值过程中改变类型是不被允许的：

```ts
let myNumberStr: string = "seven";
myNumberStr = 7;

// 编译
// error TS2322: Type 'number' is not assignable to type 'string'.

// 运行
// error TS2322: Type '7' is not assignable to type 'string'.

console.log(myNumberStr); // 'seven'
console.log(typeof myNumberStr); // string
```

但如果是 any 类型，则允许被赋值为任意类型。

```ts
let myNumberAny: any;
console.log(myNumberAny); // undefined
console.log(typeof myNumberAny); // 'undefined'

myNumberAny = "seven";
myNumberAny = 7;
console.log(myNumberAny); // 7
console.log(typeof myNumberAny); // number
```

在对现有代码进行改写的时候，any 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。你可能认为 Object 有相似的作用，就像它在其它语言中那样。但是 Object 类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法：

```ts
let anyThing: any = "hello";
console.log(anyThing.myName); //undefined
console.log(typeof anyThing); //'string'
console.log(typeof anyThing.myName); //'undefined'

console.log(anyThing.myName.firstName);
// 运行
// TypeError: Cannot read property 'firstName' of undefined
```

也允许调用任何（存在的）方法：

```ts
let anyThing: any = "Tom";
anyThing.toString();
```

变量在声明的时候，如果没有指定类型，则默认为 undefined 类型，其值也为 undefined；一旦赋值，类型则按照值的类型来推定。（类型只有在声明的时候定义或者根据值来）

```ts
let something;
console.log(something); // undefined
console.log(typeof something); // 'undefined'

something = "seven";
console.log(something); // seven
console.log(typeof something); // string

something = 7;
console.log(something); // 7
console.log(typeof something); // number
```

当你只知道一部分数据的类型时，any 类型也是有用的。比如，你有一个数组，它包含了不同的类型的数据：

```ts
let list: any[] = [1, true, "free"];
console.log(list); //[ 1, true, 'free' ]
list[1] = 100;
console.log(list); //[ 1, 100, 'free' ]
```

**小结**

任意值适合用在类型在一开始不确定类型或者后续操作中类型会变化的变量中，在数组中尤其有用。

### 8.空值

某种程度上来说，void 类型像是与 any 类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：

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

void 类型的变量不能赋值给 number 等其他类型的变量（是不是因为 void 声明的变量或显式或隐式的值为 null/undefined）：

```ts
let v: void;
let num: number = v;

// 编译错误
// error TS2322: Type 'void' is not assignable to type 'number'.

// 执行错误
// error TS2322: Type 'void' is not assignable to type 'number'.
// error TS2454: Variable 'v' is used before being assigned.
```

**小结**

空值的作用大概只有标明一个没有返回值的函数了吧 o(_￣︶￣_)o

### 9.Null 和 Undefined

TypeScript 里，undefined 和 null 两者各自有自己的类型分别叫做 undefined 和 null。和 void 相似，它们的本身的类型用处不是很大：

```ts
let u: undefined = undefined;
let n: null = null;

let un: undefined = null;
// error TS2322: Type 'null' is not assignable to type 'undefined'.
let nu: null = undefined;
// error TS2322: Type 'undefined' is not assignable to type 'null'.

let uStr: undefined = "哈哈哈";
// error TS2322: Type '"哈哈哈"' is not assignable to type 'undefined'
let nStr: null = "哈哈哈";
// error TS2322: Type '"哈哈哈"' is not assignable to type 'undefined'
```

默认情况下 undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 等类型的变量（实际测试，不能将 null/undefined 赋值给其他类型的变量）：

```ts
let num: number = undefined;
// 编译不报错，但是用 ts-node 执行会报错
// error TS2322: Type 'undefined' is not assignable to type 'number'.

// 同上
let u: undefined;
let num: number = u;
```

然而，当你指定了 `--strictNullChecks` 标记，null 和 undefined 只能赋值给 void 和它们各自。这能避免很多常见的问题。也许在某处你想传入一个 string 或 null 或 undefined，你可以使用联合类型 `string | null | undefined`。

> 注意：我们鼓励尽可能地使用 `--strictNullChecks`。

### 10.Never

never 类型表示的是那些永不存在的值的类型。例如，never 类型是那些 _总是会抛出异常_ 或 _根本就不会有返回值的函数表达式_ 或 _箭头函数表达式的返回值_ 类型；变量也可能是 never 类型，当它们被永不为真的类型保护所约束时（？？？）。

never 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外）。 即使 any 也不可以赋值给 never。

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

function error(message: string): never {}
//  error TS2534: A function returning 'never' cannot have a reachable end point.

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}
```

### 11.类型断言

类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。

类型断言有两种形式。 其一是“尖括号”语法：

```ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

另一个为 as 语法：

```ts
let strLength: number = (someValue as string).length;
```

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在 TypeScript 里使用 JSX 时，只有 as 语法断言是被允许的。

**小结**

类型断言的作用是不进行特殊的数据检查和解构。
