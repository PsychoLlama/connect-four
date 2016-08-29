import React from 'react';
import { Link } from 'react-router';

export default class Main extends React.Component {
	render () {
		return <div className='responsive-size homepage'>
			<div className='container'>
				<h1>C<sup>4</sup></h1>
				<p className='light'>
					By <a href='http://gun.js.org/'>gunDB</a>
				</p>

				<section>
					<Link to='/games' className='btn'>
						Join a game
					</Link>

					<Link to='/new-game' className='btn'>
						Start a game
					</Link>
				</section>
			</div>
		</div>;
	}
}
