import React from 'react'

class LifeComSec extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			step: props.step
		}
	}
	handleClick() {
		this.props.onChange()
	}

	componentWillReceiveProps(nextProps) {
		// 在其他地方转换呢？
		console.log('nextProps', nextProps.step)
		this.setState({
			step: nextProps.step
		})
	}
	render() {
		console.log('111')
		return <span onClick={() => this.handleClick()}>{this.state.step}</span>
	}
}

export default LifeComSec
