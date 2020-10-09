import React from 'react'

class Counter extends React.Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			selection: props.values[0],
			count: 0
		};
	}

	componentDidUpdate() {
		console.log('life', this.state.selection)
		// this.fireOnSelect()
	}

	onSelect(value) {
		// debugger
		// this.setState({ selection: value }, () => {
		// this.fireOnSelect()
		// console.log('cb', this.state.selection)
		// })
		// this.fireOnSelect()
		// console.log('set', this.state.selection)

		this.setState((state, props) => ({ selection: value }), () => {
			this.fireOnSelect()
		})
		// console.log('fn', this.state.selection)

		// this.setState({
		// 	count: this.state.count + 1
		// })
		// this.setState({
		// 	count: this.state.count + 1
		// })
		// this.setState({
		// 	count: this.state.count + 1
		// })
		// this.setState((state, props) => ({
		// 	count: state.count + 1
		// }))
		// this.setState((state, props) => ({
		// 	count: state.count + 1
		// }))
		// this.setState((state, props) => ({
		// 	count: state.count + 1
		// }))
	}

	fireOnSelect() {
		if (typeof this.props.onSelect === "function")
			this.props.onSelect(this.state.selection)
	}

	render() {
		return (
			<ul tabIndex={0}>
				{this.props.values.map(value =>
					<li
						className={value === this.state.selection ? 'selected' : ''}
						key={value}
						onClick={() => this.onSelect(value)}
					>
						{value + this.state.count}
					</li>
				)}
			</ul>
		)
	}
}

export default Counter
