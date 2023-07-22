import React from 'react'
import './props.css'
import { formatDate} from './props'

function Avatar(props) {
	return (
		<img className="Avatar"
			src={props.user.avatarUrl}
			alt={props.user.name}
		/>

	);
}

function UserInfo(props) {
	return (
		<div className="UserInfo">
			<Avatar user={props.user} />
			<div className="UserInfo-name">
				{props.user.name}
			</div>
		</div>
	);
}

export function CommentCom(props) {
	return (
		<div className="Comment">
			{/* <div className="UserInfo">
				<Avatar user={props.author} />
				<div className="UserInfo-name">
					{props.author.name}
				</div>
			</div> */}
			<UserInfo user={props.author} />
			<div className="Comment-text">
				{props.text}
			</div>
			<div className="Comment-date">
				{formatDate(props.date)}
			</div>
		</div>
	);
}
