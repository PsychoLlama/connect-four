/*global Gun*/
import React from 'react';
import Game from './Game.jsx';
import gun from './gun.jsx';
import { Link } from 'react-router';

require('./styles/GameList.scss');

const games = gun.get('games');

export default class GameList extends React.Component {
	constructor () {
		super();

		this.state = {
			gameList: [],
		};
	}

	render () {
		const list = this.state.gameList;
		let games;
		if (!list.length) {
			games = <p className='no-games'>
				No games here. <Link to='/new-game'>Start one?</Link>
			</p>;
		} else {
			games = <ul>
				{list}
			</ul>;
		}
		return <div className='responsive-size gamelist'>
			<div className='container'>
				<h1>Active Games</h1>
				{games}
			</div>
		</div>;
	}

	componentDidMount () {
		const list = this;

		games.map().val((game) => {
			if (this.unmounted || game === null) {
				return;
			}
			const age = Gun.is.node.state(game, 'key');
			const now = new Date().getTime();
			const hourAgo = now - 1000 * 60 * 60;
			if (age < hourAgo) {
				// reset the game
				return Gun.gameReset(game.key);
			}
			list.setState(state => {
				const games = state.gameList;
				return {
					gameList: games.concat(<Game key={game.key} game={game} />)
				};
			});
		});
	}

	componentWillUnmount () {
		this.unmounted = true;
	}
}
