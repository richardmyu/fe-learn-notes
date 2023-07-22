import React from 'react'
class ScrollingList extends React.Component {
	constructor(props) {
		super(props);
		this.listRef = React.createRef();
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		// 我们是否要添加新的 items 到列表
		// 捕捉滚动位置，以便我们可以稍后调整滚动.
		if (prevProps.list.length < this.props.list.length) {
			const list = this.listRef.current;
			return list.scrollHeight - list.scrollTop;
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// 如果我们有 snapshot 值, 我们已经添加了 新的 items.
		// 调整滚动以至于这些新的 items 不会将旧 items 推出视图。
		// (这边的 snapshot 是 getSnapshotBeforeUpdate 方法的返回值)
		if (snapshot !== null) {
			const list = this.listRef.current;
			list.scrollTop = list.scrollHeight - snapshot;
		}
	}

	render() {
		return (
			<div ref={this.listRef}></div>
		);
	}
}

export default ScrollingList
