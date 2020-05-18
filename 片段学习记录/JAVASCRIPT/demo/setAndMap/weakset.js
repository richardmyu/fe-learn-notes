// WeakSet

const a = new WeakSet();
try {
	a.add(1)
	// TypeError: Invalid value used in weak set
	a.add(Symbol())
	// TypeError: invalid value used in weak set
} catch (err) {
	console.log(err)
}

const ary = [[1, 2], [3, 4]];
const ws = new WeakSet(ary);
console.log(ws, Object.prototype.toString.call(ws))
