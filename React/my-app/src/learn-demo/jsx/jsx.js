import React from 'react'

const userList = [
	{
		name: 'Jerry'
	},
	{
		name: 'Tom'
	}
]

class JsxComponent extends React.Component {
	render() {
		// test 1
		// const element = (<div>
		// 	<p>test 1: {userList[0].name}</p>
		// 	<p>test 1: {userList[1].name}</p>
		// </div>)

		// test 2
		// const element = (
		// 	<p>test 2: {userList[0].name}</p>
		// 	<p>test 2: {userList[1].name}</p>
		// )

		// test 3
		// const element = userList.map((item, index) => <p key={index}>test 3: {item.name}</p>)

		// test 4
		// const element = [<p key="1">test 4: {userList[0].name}</p>, <p key="2">test 4: {userList[1].name}</p>]

		// test 5
		let element = <React.Fragment>
			<p>test 5: {userList[0].name}</p>
			<p>test 5: {userList[1].name}</p>
		</React.Fragment>

		return element
	}
}

export default JsxComponent

