import React from 'react'

// 1.Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
// 此处类型要与 theme 类型一致
const ThemeContext = React.createContext(['light'])
class ProviderContainer extends React.Component {
	render() {
		// 2.使用一个 Provider 来将当前的 theme 传递给以下的组件树。
		// 无论多深，任何组件都能读取这个值。
		// 不使用 ThemeContext.Provider 包装，则不会匹配到 Provider，则使用默认值
		// 默认值生效的一个前提，注意变量类型一致
		// 在这个例子中，我们将 ['blue', 'green', 'yellow']作为当前的值传递下去。
		return (
			<ThemeContext.Provider value={['blue', 'green', 'yellow']}>
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
		return <button style={{ 'backgroundColor': this.props.theme[this.state.count] }} onClick={this.handleClick}> button</button >
	}
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
	return (
		<div>
			<ThemedButton />
		</div>
	)
}

class ThemedButton extends React.Component {
	// 3.指定 contextType 读取当前的 theme context。
	// React 会往上找到最近的 theme Provider，然后使用它的值。
	// 在这个例子中，当前的 theme 值为 “dark”。
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

export default ProviderContainer
