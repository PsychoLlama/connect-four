/*eslint "no-unused-vars": "off"*/
import React from 'react';
import { Link } from 'react-router';

export default class Game extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		const key = this.props.game.key;
		return <Link to={`/games/${key}`} className='game-link'>
			{key}
		</Link>;
	}
}
