import React from 'react'

class Add extends React.Component {
	state = { val: 0 }
	componentDidMount() {
		this.setState({ val: this.state.val + 1 })
		// debugger
		console.log(this.state.val)

		this.setState({ val: this.state.val + 1 })
		console.log(this.state.val)

		setTimeout(_ => {
			this.setState({ val: this.state.val + 1 })
			console.log(this.state.val);

			this.setState({ val: this.state.val + 1 })
			console.log(this.state.val)
		}, 0)
	}

	render() {
		return <div>{this.state.val}</div>
	}
}

export default Add
