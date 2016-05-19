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
		return <li className='game'>
			<Link to={`/games/${key}`} className='link'>
				{key}
			</Link>
		</li>;
	}
}
