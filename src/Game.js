import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Game extends React.Component {
	render () {
		const key = this.props.game.key;
		return <li className='game'>
			<Link to={`/games/${key}`} className='link'>
				{key}
			</Link>
		</li>;
	}
}

Game.propTypes = {
	game: PropTypes.object.isRequired,
};
