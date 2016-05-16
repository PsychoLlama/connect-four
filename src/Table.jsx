import React from 'react';
import Game from 'connect-four';
import gun from './gun.jsx';

const armada = {};

export default class Table extends React.Component {
	constructor() {
		super();
		const game = new Game();
		const table = this;
		this.game = game;
		this.state = {
			player: prompt('Choose a color')
		};
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
		if (!coord) {
			return;
		}
		const col = coord.slice(0, 1);
		const key = this.props.params.gameID;
		const turns = armada[key];
		const player = this.state.player;
		turns.not(function () {

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
			turns = armada[key] = gun.get(key).init();
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
