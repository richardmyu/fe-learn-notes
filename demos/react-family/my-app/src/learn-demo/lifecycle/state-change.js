import React from 'react'
// setState 赋值时，没有改变旧值，会引发重新渲染吗？ 会
class StateChange extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			number: 1
		}
	}

	handleClick() {
		let preNumber = this.state.number
		this.setState({
			number: preNumber
		})
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.number === this.state.number) {
			return false
		} else {
			return true
		}
	}

	render() {
		console.log('render ', this.state.number)
		return (
			<div>
				<h1 onClick={() => this.handleClick()}>Hello,world!</h1>
			</div>
		)
	}
}

// 子组件的 state 没有变化，并且从父组件接受的 props 也没有变化，那它就还可能重渲染吗？——【可能！】
// 其实是父组件渲染，导致子组件重新渲染
// class PropsChange extends React.Component {
// 	shouldComponentUpdate(nextProps, nextState) {
// 		if (nextProps.number === this.props.number) {
// 			return false
// 		} else {
// 			return true
// 		}
// 	}
// 	render() {
// 		const { index, objArray, handleClick } = this.props
// 		console.log(number)
// 		return <h1 onClick={() => handleClick(index)}>{number}</h1>
// 	}
// }

// class ParentChange extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			numberArray: [0, 1, 2]
// 		}
// 	}
// 	handleClick = (index) => {
// 		let preNumberArray = this.state.numberArray
// 		preNumberArray[index] += 1;
// 		this.setState({
// 			numberArray: preNumberArray
// 		})

// 	}
// 	// shouldComponentUpdate(nextProps, nextState) {
// 	// 	console.log(nextState.numberArray.join(), this.state.numberArray.join())
// 	// 	if (nextState.numberArray.join() === this.state.numberArray.join()) {
// 	// 		return false
// 	// 	} else {
// 	// 		return true
// 	// 	}
// 	// }
// 	render() {
// 		return (<div style={{ margin: 30 }}>{
// 			this.state.numberArray.map(
// 				(number, key) => {
// 					return <PropsChange
// 						key={key}
// 						index={key}
// 						number={number}
// 						handleClick={this.handleClick} />
// 				}
// 			)
// 		}
// 		</div>)
// 	}
// }

// 当传递 props 是对象的时候，可能有一些麻烦
// 解决办法是，尽量传递简单类型，对于复杂类型，传递浅克隆数据

class PropsChange extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.objArray.num === this.props.objArray.num) {
			return false
		} else {
			return true
		}
	}
	render() {
		const { index, objArray, handleClick } = this.props
		console.log('son ', objArray.num, ' rendered')
		return <h1 onClick={() => handleClick(index)}>{objArray.num}</h1>
	}
}

class ParentChange extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			objArray: [{ num: 0 }, { num: 1 }, { num: 2 }]
		}
	}
	handleClick = (index) => {

		let preObjArray = this.state.objArray
		// 1.此处进行克隆
		preObjArray[index] = Object.assign({}, preObjArray[index])
		preObjArray[index].num += 1;
		this.setState({
			objArray: preObjArray
		})
	}
	render() {
		console.log('parent-render')
		return (<div style={{ margin: 30 }}>{
			this.state.objArray.map(
				(objArray, key) => {
					return <PropsChange
						key={key}
						index={key}
						objArray={objArray} // 2.传递的时候克隆 {...}
						handleClick={this.handleClick} />
				}
			)
		}
		</div>)
	}
}

export default ParentChange
