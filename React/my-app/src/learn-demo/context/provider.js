import React from 'react'

const ThemeContext = React.createContext(['red'])
// provider 提供者（提供 value）
class AppContextContainer extends React.Component {
	render() {
		return (
			<ThemeContext.Provider value={['pink', 'blue', 'green']}>
				<Toolbar />
			</ThemeContext.Provider>
		)
	}
}

class Button extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			count: 0
		}
		this.handleClick = this.handleClick.bind(this)
	}

	// 内部的非消费组件，依旧受到 shouldComponentUpdate 约束
	// shouldComponentUpdate() {
	// 	console.log('should-btn')
	// 	return false
	// }

	handleClick() {
		this.setState((state) => {
			if (state.count >= 2) {
				return { count: 0 }
			} else {
				return { count: state.count + 1 }
			}
		})
	}
	render() {
		return <button style={{ 'backgroundColor': this.props.theme[this.state.count] }} onClick={this.handleClick}>button</button >
	}
}

// ThemeContext.Provider 可以嵌套，内层覆盖外层
class Toolbar extends React.Component {
	static contextType = ThemeContext
	constructor(props) {
		super(props)
		this.state = {
			count: 0
		}
		this.handleClick = this.handleClick.bind(this)
	}

	// shouldComponentUpdate() {
	// 	console.log('should-p')
	// 	return false
	// }

	handleClick() {
		this.setState((state) => {
			if (state.count >= 2) {
				return { count: 0 }
			} else {
				return { count: state.count + 1 }
			}
		})
	}
	render() {
		return (<>
			<ThemeContext.Provider value={['yellow', 'pink', 'red']}>
				<ThemedButton />
				{/* 内部组件状态（provider value）变化，所有消费组件都会重新渲染 */}
				<p style={{ 'color': this.context[this.state.count] }} onClick={this.handleClick}>哈哈哈</p>
			</ThemeContext.Provider>
		</>)
	}
}

// comsumer 消费者（获取提供者提供的 value）
class ThemedButton extends React.Component {
	static contextType = ThemeContext
	componentDidMount() {
		console.log('componentDidMount', this.context)
	}
	componentDidUpdate() {
		console.log('componentDidUpdate', this.context)
	}
	render() {
		return <Button theme={this.context} />
	}
}
export default AppContextContainer
