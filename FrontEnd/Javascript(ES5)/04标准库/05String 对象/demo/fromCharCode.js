console.log(String.fromCharCode()); // ""
console.log(String.fromCharCode(97)); // "a"
console.log(String.fromCharCode(104, 101, 108, 108, 111));
// "hello"

console.log(String.fromCharCode(0xd842, 0xdfb7));
console.log(String.fromCharCode(0xd842, 0xdfb7).repeat(3));