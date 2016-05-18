import React from 'react';
import gun from './gun.jsx';

export default class ChoosePlayer extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		const input = this.input.bind(this);
		return <form onSubmit={this.submit}>
			<label>
				Red
				<input
					disabled={this.state.player1 !== null}
					type='radio'
					value='1'
					name='player'
					onChange={input} />
			</label>
			<label>
				Blue
				<input
					disabled={this.state.player2 !== null}
					type='radio'
					value='2'
					name='player'
					onChange={input} />
			</label>
			<label>
				Spectator
				<input
					type='radio'
					value='spectator'
					name='player'
					onChange={input} />
			</label>
		</form>;
	}
	componentDidMount() {
		const game = gun.game(this.props.gameID).init();
		const players = game.path('players');
		players.not(() => {
			players.put({
				player1: null,
				player2: null
			});
		}).on(players => {
			if (!this.unmounted) {
				this.setState({
					player1: players.player1,
					player2: players.player2
				});
			}
		});
	}
	componentWillUnmount() {
		this.unmounted = true;
	}
	input(e) {
		// should be `player1` or `player2`.
		const num = e.target.value;
		const player = `player${num}`;
		const game = gun.game(this.props.gameID);
		game.path('players').put({
			[player]: true
		});
		this.props.parent.setState({ player });
	}
}
