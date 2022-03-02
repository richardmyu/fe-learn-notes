let FLAG_A = 1; // 0001
let FLAG_B = 2; // 0010
let FLAG_C = 4; // 0100
let FLAG_D = 8; // 1000

let flags = 5;

if (flags & FLAG_C) {
  console.log('FLAG_C is opened');
}

let mask = FLAG_A | FLAG_B | FLAG_D;
// 1011
console.log(mask);

flags = flags | mask;
console.log(flags);


