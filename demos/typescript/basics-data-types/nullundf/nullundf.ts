let u: undefined = undefined;
let n: null = null;

let un: undefined = null;
// error TS2322: Type 'null' is not assignable to type 'undefined'.

let nu: null = undefined;
// error TS2322: Type 'undefined' is not assignable to type 'null'.

let uStr: undefined = "哈哈哈哈";
// error TS2322: Type '"哈哈哈哈"' is not assignable to type 'undefined'.

let nStr: null = "哈哈哈";
// error TS2322: Type '"哈哈哈"' is not assignable to type 'null'.

let numU: number = undefined;
// error TS2322: Type 'undefined' is not assignable to type 'number'.

let numUN: undefined;
let numUn: number = numUN;
// error TS2322: Type 'undefined' is not assignable to type 'number'.

let v: void;
let num: number = v;
// error TS2322: Type 'void' is not assignable to type 'number'.
// error TS2454: Variable 'v' is used before being assigned.

let str: string = v;
// error TS2322: Type 'void' is not assignable to type 'string'.
// error TS2454: Variable 'v' is used before being assigned.

let nul: null = v;
