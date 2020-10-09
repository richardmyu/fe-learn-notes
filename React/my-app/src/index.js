import React from 'react'
import ReactDOM from 'react-dom'
import JsxComponent from './learn-demo/jsx/jsx'
import { WelcomeFn, WelcomeClass, Comment } from './learn-demo/props/props'
import { CommentCom } from './learn-demo/props/props-conbination'

import Clock from './learn-demo/state/state'
import Counter from './learn-demo/state/state-async'
import Add from './learn-demo/state/state-async-two'


import LifeCom from './learn-demo/lifecycle/only-props'
import LifeComSec from './learn-demo/lifecycle/props-state'
import LifeComThr from './learn-demo/lifecycle/self-state'
import ScrollingList from './learn-demo/lifecycle/before-update'
import ParentChange from './learn-demo/lifecycle/state-change'

import Toggle from './learn-demo/event/event'
import LoginControl from './learn-demo/condition/condition'
import AryList from './learn-demo/key/index'

import NameForm from './learn-demo/form/index'
import EssayForm from './learn-demo/form/textarea'
import FlavorForm from './learn-demo/form/select'
import Reservation from './learn-demo/form/more-input'

import Calculator from './learn-demo/status-impro/index'
import LoginForm from './learn-demo/combination/index'
import NameSlot from './learn-demo/combination/name-slot'

import MyComponent from './learn-demo/code-split/index'

import AppContextContainer from './learn-demo/context/index'
import Page from './learn-demo/context/component-composition'
import ProviderContainer from './learn-demo/context/provider'

// function tick() {
// 	const element = (
// 		<div>
// 			<h1>Hello, world!</h1>
// 			<h2>It is {new Date().toLocaleTimeString()}.</h2>
// 		</div>
// 	);
// 	ReactDOM.render(element, document.getElementById('root'));
// }

// setInterval(tick, 1000);

// state
// function Clock(props) {
// 	return (
// 		<div>
// 			<h1>Hello, world!</h1>
// 			<h2>It is {props.date.toLocaleTimeString()}.</h2>
// 		</div>
// 	);
// }

// function tick() {
// 	ReactDOM.render(
// 		<Clock date={new Date()} />,
// 		document.getElementById('root')
// 	);
// }

// setInterval(tick, 1000);

const comment = {
	date: new Date(),
	text: 'I hope you can enjoy your life!',
	author: {
		name: 'Tom',
		avatarUrl: 'https://lh3.googleusercontent.com/proxy/10Zdu4v3K_gPxRthsiHGzc322I5expT00-rWNqQzV9ckGVccp3vyMl0lswh_oGzZAa4OPnUlgiYTSc02MCnv7HlkzpiDUbI--6X2U2ceu7y3DOkCAc2Yvg'
	}
}

let step = 3

const user={
	name:'jack',
	permalink:'https://zh-hans.reactjs.org/docs/context.html'
}

class AppCom extends React.Component {
	render() {
		return (<div>
			{/* <JsxComponent /> */}
			{/* <WelcomeFn name="Jerry" /> */}
			{/* <WelcomeClass name="Tom" id="11" className="tomCat" tabIndex="1" style="margin:10px" /> */}
			{/* <Comment author={comment.author} text={comment.text} date={comment.date} /> */}
			{/* <CommentCom author={comment.author} text={comment.text} date={comment.date} /> */}
			{/* <Clock date={new Date()} /> */}
			{/* <Counter values={["State.", "Should.", "Be.", "Synchronous."]}
				onSelect={value => console.log(value)} /> */}
			{/* <LifeCom step={step} onChange={() => {
				step++
				this.forceUpdate()
			}}/> */}
			{/* <LifeComSec step={step} onChange={() => {
				step++
				this.forceUpdate()
			}}/> */}
			{/* <LifeComThr /> */}
			{/* <ScrollingList /> */}
			{/* <Add></Add> */}
			{/* <ParentChange /> */}
			{/* <Toggle /> */}
			{/* <LoginControl /> */}
			{/* <AryList /> */}
			{/* <NameForm /> */}
			{/* <EssayForm /> */}
			{/* <FlavorForm /> */}
			{/* <Reservation /> */}
			{/* <Calculator /> */}
			{/* <LoginForm /> */}
			{/* <NameSlot /> */}
			{/* <MyComponent /> */}
			<AppContextContainer />
			{/* <Page user={{...user}} size="1234" /> */}
			<ProviderContainer />
		</div>)
	}
}

ReactDOM.render(<AppCom></AppCom>, document.getElementById('root'))
