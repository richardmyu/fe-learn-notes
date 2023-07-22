function alertName(): void {
	alert("My name is Tom");
}

function noName() {
	alert("My name is Tom");
}

let unusable: void = undefined;
let unusableStr: void = "undefined";
// error TS2322: Type '"undefined"' is not assignable to type 'void'.
