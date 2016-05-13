/*eslint "no-unused-vars": "off"*/
import React from 'react';
import Game from './Game.jsx';
import Gun from 'gun/gun';

const gun = new Gun('http://localhost/gun').get('games').init();

export default class GameList extends React.Component {
	constructor() {
		super();
		this.state = {
			games: []
		};
	}
	render() {
		return <div>
			<h1>Active Games</h1>
			<ul>{this.state.games}</ul>
		</div>;
	}
	componentDidMount() {
		const list = this;
		this.setState(() => {
			return {
				unmounted: false
			};
		});
		gun.map().val(game => {
			if (this.state.unmounted) {
				return;
			}
			list.setState(state => {
				const games = state.games;
				return {
					games: games.concat(<Game key={game.key} game={game} />)
				};
			});
		});
	}
	componentWillUnmount() {
		this.setState(function () {
			return {
				unmounted: true
			};
		});
	}
}
