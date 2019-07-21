enum Color { Red, Green, Blue }
console.log(Color);
let c: Color = Color.Green;
console.log(c);

enum ColorS { Red = 1, Green, Blue }
console.log(ColorS);
let cs: ColorS = ColorS.Green;
console.log(cs);

enum ColorA { Red = 1, Green = 3, Blue = 5 }
console.log(ColorA);
let ca: ColorA = ColorA.Green;
console.log(ca);

let colorName: string = Color[2];
console.log(colorName);
