import Gun from 'gun/gun';
import React from 'react';
import Game from 'connect-four';

const gun = new Gun('http://localhost/gun');

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
		let rows = [];

		// populate a table
		for (let row = this.game.rows - 1; row >= 0; row -= 1) {
			let cols = [];
			for (let col = 0; col < this.game.cols; col += 1) {
				let id = this.game.format(col, row);
				let color = this.state[id] || '';
				let hole = <div
					key={id}
					className='cell'
					data-coord={id}
					onClick={this.click.bind(this)}>
					<div
						className={`${color} hole`}
						id={id}
						data-coord={id}></div>
				</div>;
				cols.push(hole);
			}
			let tr = <div className='row' key={row}>{cols}</div>;
			rows.push(tr);
		}

		return <div className='table'>
			{rows}
		</div>;
	}

	click(e) {
		const coord = e.target.getAttribute('data-coord');
		if (coord) {
			const col = coord.slice(0, 1);
			const key = this.props.params.gameID;
			const player = 'red';
			const turn = Gun.is.node.ify({ col, player });
			const soul = Gun.is.node.soul(turn);
			armada[key].path(soul).put(turn);
		}
	}

	componentDidMount() {
		const key = this.props.params.gameID;
		const game = this.game;
		let turns = armada[key];
		if (!turns) {
			turns = armada[key] = gun.get(key).init();
		}
		turns.map().val(turn => {
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
