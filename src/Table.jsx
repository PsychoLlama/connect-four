import React from 'react';
import Game from 'connect-four';
import gun from './gun.jsx';
import ChoosePlayer from './ChoosePlayer.jsx';

const armada = {};

export default class Table extends React.Component {
	constructor() {
		super();
		const game = new Game();
		const table = this;
		this.game = game;
		this.state = {};
		game.on('play', function (player, coord) {
			if (table.state.unmounted) {
				return;
			}
			const key = game.format(coord.col, coord.row);
			table.setState(function (state) {
				state[key] = player;
				return state;
			});
		});
	}

	render() {
		if (!this.state.player) {
			return <ChoosePlayer gameID={this.props.params.gameID} parent={this} />;
		}
		let cols = [];

		// Populate a table like structure
		for (let col = 0; col < this.game.cols; col += 1) {
			let cells = [];
			for (let row = this.game.rows - 1; row >= 0; row -= 1) {
				let id = this.game.format(col, row);
				let color = this.state[id] || '';
				let cell = <div
					key={id}
					className='cell'
					data-coord={id}
					onClick={this.click.bind(this)}>
					<div
						className={`${color} hole`}
						id={id}
						data-coord={id}></div>
				</div>;
				cells.push(cell);
			}
			let column = <div className='col' key={col}>{cells}</div>;
			cols.push(column);
		}

		return <div className='table'>
			{cols}
		</div>;
	}

	click(e) {
		const coord = e.target.getAttribute('data-coord');
		if (coord === null) {
			return;
		}
		let col = coord.slice(0, 1);
		col = parseInt(col, 10);
		if (!this.game.validMove(col)) {
			return;
		}
		const key = this.props.params.gameID;
		const turns = armada[key];
		this.play(turns, col);
	}

	play(turns, col) {
		const player = this.state.player;
		turns.not(function () {
			turns.put({ col, player });
		}).val(function (turn) {
			if (turn.player === player) {
				return;
			}
			const next = this.path('next');
			next.not(() => {
				next.put({ col, player });
			});
		});
	}

	componentDidMount() {
		const key = this.props.params.gameID;
		const game = this.game;
		let turns = armada[key];
		if (!turns) {
			turns = armada[key] = gun.get(key);
			turns.recurse(function () {
				armada[key] = this.init();
			});
		}
		turns.recurse(turn => {
			game.play(turn.player, turn.col);
		});
	}

	componentWillUnmount() {
		/*
			This must be set synchronously,
			otherwise there are race conditions
			and React will throw errors.
			I'm not proud of it.
		*/
		this.state.unmounted = true;
	}
}
