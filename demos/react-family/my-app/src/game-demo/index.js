import React from 'react'
import ReactDom from 'react-dom'
import './index.css'

class Board extends React.Component {
	// constructor(props) {
	// 	super(props)
	// 	this.state = {
	// 		squares: Array(9).fill(null),
	// 		xIsNext: true
	// 	}
	// }

	renderSquare(i) {
		return <Square
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i)}
		></Square>
	}
	render() {
		// const winner = calculateWinner(this.state.squares)
		// let status
		// if (winner) {
		// 	status = 'winner: ' + winner
		// } else {
		// 	status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O')
		// }
		// const status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O')
		return (<div>
			{/* <div className="status">{status}</div> */}
			<div className="board-row">
				{this.renderSquare(0)}
				{this.renderSquare(1)}
				{this.renderSquare(2)}
			</div>
			<div className="board-row">
				{this.renderSquare(3)}
				{this.renderSquare(4)}
				{this.renderSquare(5)}
			</div>
			<div className="board-row">
				{this.renderSquare(6)}
				{this.renderSquare(7)}
				{this.renderSquare(8)}
			</div>
		</div>)
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			history: [{
				squares: Array(9).fill(null)
			}],
			stepNumber: 0,
			xIsNext: true
		}
	}
	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1)
		const current = history[history.length - 1]
		const squares = current.squares.slice()
		if (calculateWinner(squares) || squares[i]) {
			return
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O'
		this.setState({
			history: history.concat([{
				squares: squares
			}]),
			isOrder: false,//true 降序；false 升序[默认]
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		})
	}
	// 历史跳转
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0
		})
	}
	// 坐标计算
	formatToMrix(curSq, preSq) {
		let aryX = 0
		let aryY = 0
		curSq.forEach((item, index) => {
			if (item !== preSq[index]) {
				aryX = index % 3 + 1
				aryY = Math.ceil((index + 1) / 3)
			}
		})
		return [aryX, aryY]
	}
	// 升序
	upList(moves) {
		if (this.state.isOrder) {
			this.setState({
				isOrder: false
			})
		}
	}
	// 降序
	downList(moves) {
		if (!this.state.isOrder) {
			this.setState({
				isOrder: true
			})
		}
	}

	render() {
		let history = this.state.history
		const current = history[this.state.stepNumber]
		const winner = calculateWinner(current.squares)
		let desc = ''

		const moves = history.map((step, move) => {
			if (move >= 1) {
				let [x, y] = this.formatToMrix(step.squares, history[move - 1].squares)
				desc = x && y ? move + ' Go to move x:' + x + ' y: ' + y : 'Go to game start'
			} else {
				desc = move + ' init'
			}
			if (this.state.stepNumber === move) {
				return (
					<li key={move}>
						<button className="current-btn" disabled onClick={() => this.jumpTo(move)}>{desc}</button>
					</li >
				)
			} else {
				return (
					<li key={move}>
						<button onClick={() => this.jumpTo(move)}>{desc}</button>
					</li >
				)
			}
		})


		let status = ''
		if (winner) {
			status = 'Winner:' + winner
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
		}

		if (this.state.isOrder) {
			return (
				<div className="game">
					<div className="game-board">
						<Board squares={current.squares} onClick={(i) => this.handleClick(i)}></Board>
					</div>
					<div className="game-info">
						<div>{status}</div>
						<div>
							<button onClick={() => this.upList(moves)}>升序</button>
							<button disabled onClick={() => this.downList(moves)}>降序</button>
						</div>
						<div>{moves}</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="game">
					<div className="game-board">
						<Board squares={current.squares} onClick={(i) => this.handleClick(i)}></Board>
					</div>
					<div className="game-info">
						<div>{status}</div>
						<div>
							<button disabled onClick={() => this.upList(moves)}>升序</button>
							<button onClick={() => this.downList(moves)}>降序</button>
						</div>
						<div>{moves}</div>
					</div>
				</div>
			)
		}
	}
}

function Square(props) {
	return (
		<div className="square" onClick={props.onClick}>{props.value}</div>
	)
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	]
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]
		}
	}
	return null
}
// more
// 1.在游戏历史记录列表显示每一步棋的坐标 [x]
// 2.在历史记录列表加粗显示当前选择的项目 [x]
// 3.使用两个循环来渲染出棋盘的棋子，而不是在代码里写死 ???
// 4.添加一个可以升序或降序显示历史记录的按钮
// 5.每当有人获胜的时候，高亮显示连城一线的三颗棋子
// 6.当无人获胜时，显示一个平局的信息

ReactDom.render(<Game />, document.getElementById('root'))
