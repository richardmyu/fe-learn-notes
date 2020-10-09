import React from 'react'

class LifeCom extends React.Component {
	constructor(props) {
		super(props)
	}
	handleClick() {
		this.props.onChange()
	}

	shouldComponentUpdate(nextProps) {
		console.log('nextProps', nextProps.step, this.props.step)
		if (nextProps.step === this.props.step) {
			return false
		} else {
			return true
		}
	}

	render() {
		console.log('111')
		return <span onClick={() => this.handleClick()}>{this.props.step}</span>
	}
}

export default LifeCom
