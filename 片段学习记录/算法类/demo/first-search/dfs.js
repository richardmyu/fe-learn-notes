// 递归版本
export const DFSRecursion = (node, nodeList = []) => {
	if (node) {
		nodeList.push(node)
		let children = node.children
		if (children && children.length !== 0) {
			for (let i = 0; i < children.length; i++) {
				DFSRecursion(children[i], nodeList)
			}
		}
	}
	return nodeList
}

// 非递归版本(栈实现)
export const DFSNoRecursion = (node, nodeList = []) => {
	if (node) {
		let stack = [];
		stack.push(node);
		// console.log('dfs-node', node)
		while (stack.length) {
			let item = stack.pop();
			nodeList.push(item);
			// console.log('dfs-item', item)
			let children = item.children;
			if (children && children.length) {
				for (let i = children.length - 1; i >= 0; i--) {
					// console.log('dfs-children', children[i])
					stack.push(children[i]);
				}
			}
		}
	}
	return nodeList;
}
