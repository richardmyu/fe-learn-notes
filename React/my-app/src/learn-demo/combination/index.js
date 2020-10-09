import React from 'react'

function FormItem(props) {
	console.log('props', props)
	console.log('props.children', props.children)
	return (
		<fieldset>
			<legend>{props.name}</legend>
			{props.children}
		</fieldset>
	)
}

const formList = [
	{
		id: 1,
		name: '用户名',
		modal: 'userName',
		type: 'input'
	},
	{
		id: 2,
		name: '密码',
		modal: 'passWord',
		type: 'input'
	},
	{
		id: 3,
		name: '是否记忆登录',
		modal: 'isRemind',
		type: 'check'
	},
	{
		id: 4,
		name: '提交',
		modal: 'submit',
		type: 'submit'
	},
]

class LoginForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: '',
			passWord: '',
			isRemind: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChange(type, e) {
		this.setState({
			[type]: e.target.value
		})
	}
	handleSubmit(event) {
		console.log(this.state)
		debugger
		event.preventDefault
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				{
					formList.map(item => <FormItem key={item.id} name={item.name}>{
						item.type === 'input'
							? <input value={this.state[item.modal]} onChange={(e) => this.handleChange(item.modal, e)} />
							: (item.type === 'check'
								? <input type="checkbox" value={this.state[item.modal]} onChange={(e) => this.handleChange(item.modal, e)} />
								: <input type="submit" value={item.name} />)
					}</FormItem>)
				}
			</form>
		)
	}
}

export default LoginForm
