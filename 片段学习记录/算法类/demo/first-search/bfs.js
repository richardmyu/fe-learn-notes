//
export const BFSRecursion = (node, nodeList = []) => {
	if (node) {
		let queue = [];
		queue.push(node);
		// console.log('bfs-node', node)
		while (queue.length) {
			let item = queue.shift();
			// console.log('bfs-item', item)
			let children = item.children;
			nodeList.push(item)
			if (children && children.length) {
				for (let i = 0; i < children.length; i++) {
					// console.log('bfs-children', children[i])
					queue.push(children[i])
				}
			}
		}
	}
	return nodeList;
}


