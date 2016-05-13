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
				<Link to='/games'>
					Join a game
				</Link>

				<Link to='/new-game'>
					Start a game
				</Link>
			</section>
		</header>;
	}
}
