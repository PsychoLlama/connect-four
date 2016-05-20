import React from 'react';
function getOtherPlayer (player) {
	return (player === 'player1') ? 'player2' : 'player1';
}

function getWinner(me, winner) {
	const otherPlayer = getOtherPlayer(winner);
	let message = '';
	if (me === winner) {
		message = 'You win!';
	} else if (me === otherPlayer) {
		message = `${winner} wins :(`;
	} else if (winner) {
		message = `${winner} wins!`;
	} else {
		message = 'Game tied :(';
	}
	return message;
}

export default class GameStatus extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return <h2>{this.state.message}</h2>;
	}
	componentDidMount() {
		const me = this.props.player;
		const game = this.props.game;
		let message = '';
		if (game.ended) {
			message = getWinner(me, game.winner);
		} else if (me === 'player1') {
			message = 'Your turn';
		} else if (me === 'spectator') {
			message = '';
		} else {
			let otherPlayer = getOtherPlayer(me);
			message = `Waiting for ${otherPlayer}`;
		}
		this.setState(() => {
			return { message };
		});

		game.on('play', player => {
			const otherPlayer = getOtherPlayer(player);
			let message;
			if (me === 'spectator') {
				message = `${otherPlayer}'s turn`;
			} else if (me === otherPlayer) {
				message = 'Your turn';
			} else {
				message = 'Waiting for the other player';
			}
			this.setState(() => {
				if (game.ended) {
					return {};
				}
				return { message };
			});
		});

		game.on('end', winner => {
			let message = getWinner(me, winner);
			this.setState(() => {
				return { message };
			});
		});
	}
}
