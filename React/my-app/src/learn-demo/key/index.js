import React from 'react'

function gerateAry(item) {
	return <li>{item % 2 ? 'odd ' : 'even '}</li>
}

function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number) =>
		<li>{number}</li>
	)
	return (
		<ul>{listItems}</ul>
	)
}
const numbers = [1, 2, 3, 4]

class AryList extends React.Component {
	constructor() {
		super()
		this.state = {
			list: [1, 2, 3, 4]
		}
	}
	render() {
		let list = this.state.list
		return (<ul>{
			list.map(item => <li key={item}>{gerateAry(item)}</li>)
		}</ul>)
	}
	// render(){
	// 	return <NumberList numbers={numbers} />
	// }
}
export default AryList
