Promise.prototype.finally = function (callback) {
	const P = this.constructor;
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => { throw reason })
	)
}

const p1 = Promise.resolve(1);

const p2 = p1.then(res => {
	console.log(res);
});

const p3 = p2.catch(err => {
	console.log(err);
});

const p4 = p3.finally(str => {
	console.log(str);
	console.log("p1 ", p1); // Promise { <state>: "fulfilled", <value>: 1 }
	console.log("p2 ", p2); // Promise { <state>: "fulfilled", <value>: undefined }
	console.log("p3 ", p3); // Promise { <state>: "fulfilled", <value>: undefined }
	console.log("p4 ", p4); // Promise { <state>: "pending" }
})

setTimeout(() => {
	console.log("p1 ", p1); // Promise { <state>: "fulfilled", <value>: 1 }
	console.log("p2 ", p2); // Promise { <state>: "fulfilled", <value>: undefined }
	console.log("p3 ", p3); // Promise { <state>: "fulfilled", <value>: undefined }
	console.log("p4 ", p4); // Promise { <state>: "fulfilled", <value>: undefined }
}, 3000)
