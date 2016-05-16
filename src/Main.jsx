/*eslint "no-unused-vars": "off"*/
import React from 'react';
import { Link } from 'react-router';

export default class Main extends React.Component {
	constructor() {
		super();
	}

	render() {
		return <header>
			<h1>C<sup>4</sup></h1>

			<section>
				<Link to='/games' className='btn btn-large'>
					Join a game
				</Link>

				<Link to='/new-game' className='btn btn-large'>
					Start a game
				</Link>
			</section>
		</header>;
	}
}
