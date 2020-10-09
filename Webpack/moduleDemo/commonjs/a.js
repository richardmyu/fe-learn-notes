exports.x = "a1";
console.log("a.js ", require("./b.js.js").x);
exports.x = "a2";
console.log("a.js", require.main === module);
