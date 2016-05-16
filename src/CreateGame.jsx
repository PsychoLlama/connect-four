import React from 'react';
import gun from './gun.jsx';
import { hashHistory } from 'react-router';
import recommend from 'random-words';

const games = gun.get('games');

export default class CreateGame extends React.Component {
	constructor() {
		super();
		this.state = {
			valid: {},
			err: {},
			recommend: recommend({
				min: 2,
				max: 3
			}).join('-')
		};
	}

	render() {
		const state = this.state;
		const valid = Boolean(state.valid[state.key]);
		const err = state.err[state.key];
		let msg;
		if (err) {
			msg = <span className='error'>
				{err}
			</span>;
		} else {
			msg = <span>
				Need inspiration? How about&nbsp;
				<span className='recommend'>
					{this.state.recommend}
				</span>
			</span>;
		}

		return <div>
			<h1>Create a Game</h1>
			<form onSubmit={this.submit.bind(this)}>
				<input
					type='text'
					onInput={this.input.bind(this)}
					className={`valid-${valid}`} />
				<button type='submit' disabled={!valid}>
					Start Playing
				</button>
			</form>
			<p className='status'>{msg}</p>
		</div>;
	}

	input(e) {
		const key = e.target.value;
		const newGame = this;
		const valid = {
			[key]: false
		};
		const err = {
			[key]: 'Checking availability...'
		};
		if (key.length === 0) {
			valid[key] = false;
			err[key] = 'Game name is empty.';
		} else {
			games.path(key).not(() => {
				valid[key] = true;
				err[key] = null;
				newGame.setState({ valid, err });
			}).val(game => {
				valid[key] = !(game instanceof Object);
				if (valid[key]) {
					err[key] = null;
				} else {
					err[key] = `Game "${key}" already exists.`;
				}
				newGame.setState({ valid, err });
			});
		}
		this.setState({ valid, err, key });
	}

	submit() {
		const key = this.state.key;
		if (this.state.valid[key]) {
			games.path(key).put({ key });
			hashHistory.push(`/games/${key}/`);
		}
	}
}
