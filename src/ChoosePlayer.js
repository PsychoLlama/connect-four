import React, { PropTypes, Component } from 'react';
import gun from './gun';
import './styles/ChoosePlayer.scss';

export default class ChoosePlayer extends Component {
	constructor () {
		super();
		this.state = {};
	}

	render () {
		const input = this.input.bind(this);
		const state = this.state;
		const player1Taken = state.player1 !== null;
		const player2Taken = state.player2 !== null;

		return <div className='responsive-size choose-player'>
			<h2>Choose your player</h2>
			<form onSubmit={this.submit}>
				<label className={`player1 ${player1Taken ? 'disabled': ''}`}>
					Player 1
					<input
						type='radio'
						value='player1'
						name='player'
						onChange={input} />
				</label>
				<label className={`player2 ${player2Taken ? 'disabled' : ''}`}>
					Player 2
					<input
						type='radio'
						value='player2'
						name='player'
						onChange={input} />
				</label>
				<label className='spectator'>
					Spectator
					<input
						type='radio'
						value='spectator'
						name='player'
						onChange={input} />
				</label>
			</form>
		</div>;
	}

	componentDidMount () {
		const ID = this.props.gameID;
		const game = gun.game(ID).init();
		const players = game.path('players');
		players.not(() => {
			players.put({
				player1: null,
				player2: null
			});
		}).on(players => {
			if (!this.unmounted) {
				this.setState(players);
			}
		});
	}

	componentWillUnmount () {
		this.unmounted = true;
	}

	input (e) {
		// should be `player1` or `player2`.
		const player = e.target.value;
		const game = gun.game(this.props.gameID);
		game.path('players').put({
			[player]: true
		});
		this.props.parent.setState({ player });
	}
}

ChoosePlayer.propTypes = {
	gameID: PropTypes.string.isRequired,
	parent: PropTypes.instanceOf(Component).isRequired,
};
