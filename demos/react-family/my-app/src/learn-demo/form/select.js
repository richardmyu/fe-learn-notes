import React from 'react'

class FlavorForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: []
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		// this.setState({ value: event.target.value })
		console.log(event.target.value)
		let value = event.target.value
		let preValue = this.state.value
		console.log(value, preValue)
		if (preValue.includes(value)) {
			preValue.splice(preValue.indexOf(value), 1)
		} else {
			preValue.push(value)
		}
		console.log(value, preValue)
		this.setState({ value: [...preValue] })
	}

	handleSubmit(event) {
		alert('你喜欢的风味是: ' + this.state.value)
		event.preventDefault()
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					选择你喜欢的风味:
          <select multiple={true} value={this.state.value} onChange={this.handleChange}>
						<option value="grapefruit">葡萄柚</option>
						<option value="lime">酸橙</option>
						<option value="coconut">椰子</option>
						<option value="mango">芒果</option>
					</select>
				</label>
				<input type="submit" value="提交" />
			</form>
		)
	}
}

export default FlavorForm
