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
					type='radio'
					value='1'
					name='player'
					onChange={input} />
			</label>
			<label>
				Blue
				<input
					type='radio'
					value='2'
					name='player'
					onChange={input} />
			</label>
		</form>;
	}
	componentWillMount() {
		const game = gun.get(this.props.gameID);
		game.path('players').on(players => {
			if (!this.unmounted) {
				this.setState({ players });
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
		this.props.parent.setState({ player });
	}
}
