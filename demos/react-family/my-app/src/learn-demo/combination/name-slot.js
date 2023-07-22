import React from 'react'

function Contacts() {
	return <h1>Hello,world</h1>
}

function Chat() {
	return <div>
		<p>say something?</p>
		<p>say what?</p>
	</div>
}

function SplitPane(props) {
	console.log('props', props)
	console.log('props.left', props.left)

	return (
		<div className="SplitPane">
			<div className="SplitPane-left">
				{props.left}
			</div>
			<div className="SplitPane-right">
				{props.right}
			</div>
		</div>
	);
}

function NameSlot() {
	return (
		<SplitPane
			left={
				<Contacts />
			}
			right={
				<Chat />
			} />
	);
}

export default NameSlot
