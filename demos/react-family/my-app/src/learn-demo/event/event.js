import React from 'react'

class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isToggleOn: true };

		// method 1
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		// console.log('e: ', e);
		this.setState(state => ({
			isToggleOn: !state.isToggleOn
		}));
	}

	// method 2
	// handleClick = () => {
	// 	this.setState(state => ({
	// 		isToggleOn: !state.isToggleOn
	// 	}))
	// }


	render() {
		return (
			<button onClick={this.handleClick}>
				{this.state.isToggleOn ? 'ON' : 'OFF'}
			</button>

			// method 3
			// <button onClick={(e) => this.handleClick(e)}>
			// 	{this.state.isToggleOn ? 'ON' : 'OFF'}
			// </button>

			// method 4
			// <button onClick={this.handleClick.bind(this)}>
			// 	{this.state.isToggleOn ? 'ON' : 'OFF'}
			// </button>
		);
	}
}

export default Toggle
