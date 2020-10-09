import React from 'react'
import './props.css'
// simple fn
export function WelcomeFn(props) {
	return <h1>Hello,{props.name}</h1>
}
// simple class
export class WelcomeClass extends React.Component {
	render() {
		// console.log(this.props)
		return <h1 tabIndex={this.props.tabIndex}>Hello,{this.props.name}</h1>
	}
}

export function formatDate(date) {
	return date.toLocaleDateString()
}
// complicated inline-style
// export function Comment(props) {
// 	return (
// 		<div className="Comment" style={{ width: 250, border: '1px dashed #000000', padding: 16 }}>
// 			<div className="UserInfo" style={{ marginBottom: 15, textAlign: 'center' }}>
// 				<img className="Avatar"
// 					style={{ width: '120px', height: '120px', borderRadius: '50%' }}
// 					src={props.author.avatarUrl}
// 					alt={props.author.name}
// 				/>
// 				<div className="UserInfo-name" style={{ fontSize: '20px', fontWeight: 'bold' }}>
// 					{props.author.name}
// 				</div>
// 			</div>
// 			<div className="Comment-text" style={{ fonwStyle: 'italic', marginBottom: 10 }}>
// 				{props.text}
// 			</div>
// 			<div className="Comment-date" style={{ textAlign: 'right', color: 'gray' }}>
// 				{formatDate(props.date)}
// 			</div>
// 		</div>
// 	)
// }

// import style
export function Comment(props) {
	return (
		<div className="Comment" >
			<div className="UserInfo" >
				<img className="Avatar"
					src={props.author.avatarUrl}
					alt={props.author.name}
				/>
				<div className="UserInfo-name" >
					{props.author.name}
				</div>
			</div>
			<div className="Comment-text">
				{props.text}
			</div>
			<div className="Comment-date">
				{formatDate(props.date)}
			</div>
		</div>
	)
}
