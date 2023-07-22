let list: number[] = [1, 2, 3];
console.log(list);

// list[1] = '23';
list[4] = 90;
console.log(list);
// let listMin1: number[] = [1, '2'];
// error TS2322: Type 'string' is not assignable to type 'number'.
// console.log(listMin1);

let listMin2: (number | string)[] = [1, '2'];

console.log(listMin2[3]);
listMin2[4] = 'sdf';
listMin2[1] = 2;
console.log(listMin2);

let listMin3: (number | string | object | boolean | null | RegExp)[] = [1, '2', true, {}, null, /sd/g];
console.log(listMin3);


let listAry: Array<number> = [1, 2, 3];
console.log(listAry);

let listAryMini: Array<Number | String | Boolean | [] | Object | undefined | null | RegExp> = [1, '2', true, {}, null, /sd/g];
console.log(listAryMini);
