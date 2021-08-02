### 4.4 Boolean 类型

该类型只有两个字面值：true 和 false (区分大小写)，这两个值与数字值不是一回事，因此 true 不一定等于 1，而 false 不一定等于 0； 但 ECMAScript 中所有数据类型都有与这两个值等价的值。

下列运算符会返回布尔值：

---

- 两元逻辑运算符： `&& (And)，|| (Or)`
- 前置逻辑运算符： `! (Not)`
- 相等运算符：`===，!==，==，!=`
- 比较运算符：`>，>=，<，<=`

---

#### 4.4.1 Boolean

强制将其他类型数据转换为布尔型，对 `0、NaN、null、undefined、""、false` (空字符串不是空格字符串)这 6 个为 false，其余为 true；

> 在流控制语句中，自动执行相应的 `Boolean` 转换。

#### 4.4.2 `！`

取反，先将值转为布尔类型，然后取反；

```javascript
let a = 6;
typeof a; //number
typeof !a; //boolean
!a; //false
```

#### 4.4.3 `！！`

再次取反；将其他数据类型转换为布尔数据类型，相当于 `Boolean(str)`；

更多 demo 见 <a href="./demo/boolean.html" target="_blank">boolean.html</a>
