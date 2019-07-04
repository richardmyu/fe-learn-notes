# URLSearchParams

URLSearchParams 接口定义了一些实用的方法来处理 URL 的查询字符串。返回一个 URLSearchParams 对象。

一个实现了 URLSearchParams 的对象可以直接用在 for...of 结构中。

- `URLSearchParams.append()`
  - 插入一个指定的键/值对作为新的搜索参数。
    >
- `URLSearchParams.delete()`
  - 从搜索参数列表里删除指定的搜索参数及其对应的值。
    >
- `URLSearchParams.entries()`
  - 返回一个 iterator 可以遍历所有键/值对的对象。
    >
- `URLSearchParams.get()`
  - 获取指定搜索参数的第一个值。
    >
- `URLSearchParams.getAll()`
  - 获取指定搜索参数的所有值，返回是一个数组。
    >
- `URLSearchParams.has()`
  - 返回 Boolean 判断是否存在此搜索参数。
    >
- `URLSearchParams.keys()`
  - 返回 iterator 此对象包含了键/值对的所有键名。
    >
- `URLSearchParams.set()`
  - 设置一个搜索参数的新值，假如原来有多个值将删除其他所有的值。
    >
- `URLSearchParams.sort()`
  - 按键名排序。
    >
- `URLSearchParams.toString()`
  - 返回搜索参数组成的字符串，可直接使用在 URL 上。
    >
- `URLSearchParams.values()`
  - 返回 iterator 此对象包含了键/值对的所有值。

```js
var paramsString = "q=URLUtils.searchParams&topic=api";
var searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === ""; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"
```
