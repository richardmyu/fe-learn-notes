import React from 'react'

// function Avatar(props) {
// 	return <span>{props.user}{props.size}</span>
// }

// function Link(props) {
// 	return (<>
// 		<Avatar user={props.user} size={props.size} />
// 		<p><a href={props.user.permalink}></a></p>
// 	</>)
// }

// function NavigationBar(props) {
// 	return <Link user={props.user} size={props.size} />
// }

// function PageLayout(props) {
// 	return <NavigationBar user={props.user} size={props.size} />
// }

// function Page(props) {
// 	return <PageLayout user={props.user} size={props.size} />
// }

// function Avatar(props) {
// 	return <span>{props.user}{props.size}</span>
// }

// function Link(props) {
// 	return <p>{props.children}<a href={props.href}>link</a></p>
// }

// function NavigationBar(props) {
// 	return (<>{props.userLink}</>)
// }

// function PageLayout(props) {
// 	return <NavigationBar userLink={props.userLink} />
// }

// function Page(props) {
// 	const user = props.user
// 	const userLink = (<Link href={user.permalink}>
// 		<Avatar user={user.name} size={props.size} />
// 	</Link>)
// 	return <PageLayout userLink={userLink} />
// }

function Avatar(props) {
	return <span>{props.user.name}{props.size}</span>
}

function Link(props) {
	return <p>{props.children}<a href={props.href}>link</a></p>
}

function NavigationBar(props) {
	return (<>{props.children}</>)
}

function PageLayout(props) {
	return <>{props.topBar}{props.content}</>
}

function Feed(props) {
	return <p>{props.user.name}</p>
}

function Page(props) {
	const user = props.user;
	const content = <Feed user={user} />;
	const topBar = (
		<NavigationBar>
			<Link href={user.permalink}>
				<Avatar user={user} size={props.size} />
			</Link>
		</NavigationBar>
	);
	return (
		<PageLayout
			topBar={topBar}
			content={content}
		/>
	);
}

export default Page
