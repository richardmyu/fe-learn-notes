import React from 'react'

class LifeComThr extends React.Component {
	constructor() {
		super()
		this.state = {
			step: 0
		}
	}
	handleClick() {
		this.setState({
			step: this.state.step
		})
	}
	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextProps, nextState)
		if (nextState.step === this.state.step) {
			return false
		} else {
			return true
		}
	}

	render() {
		console.log('111')
		return <span onClick={() => this.handleClick()}>{this.state.step}</span>
	}
}

export default LifeComThr
