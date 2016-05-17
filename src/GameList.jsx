/*eslint "no-unused-vars": "off"*/
import React from 'react';
import Game from './Game.jsx';
import gun from './gun.jsx';

const games = gun.get('games');

export default class GameList extends React.Component {
	constructor() {
		super();
		this.state = {
			gameList: []
		};
	}

	render() {
		return <div>
			<h1>Active Games</h1>
			<ul>{this.state.gameList}</ul>
		</div>;
	}

	componentDidMount() {
		const list = this;
		this.setState(() => {
			return {
				unmounted: false
			};
		});
		games.map().val(game => {
			if (this.state.unmounted) {
				return;
			}
			list.setState(state => {
				const games = state.gameList;
				return {
					gameList: games.concat(<Game key={game.key} game={game} />)
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
