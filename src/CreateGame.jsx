import React from 'react';
import gun from './gun.jsx';
import { hashHistory } from 'react-router';
import recommend from 'random-words';
import './styles/CreateGame.scss';

const games = gun.get('games');

games.not(function () {
	games.put({
		GAME_LIST_INITIATOR: null
	});
});

export default class CreateGame extends React.Component {
	constructor () {
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

	render () {
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

		return <div className='responsive-size create-game'>
			<h1>Start a game</h1>
			<form onSubmit={this.submit.bind(this)}>
				<input
					autoFocus='true'
					type='text'
					onInput={this.input.bind(this)}
					placeholder='Enter game name...'
					className={`valid-${valid}`} />
				<button type='submit' disabled={!valid}>
					Start Playing
				</button>
			</form>
			<p className='status'>{msg}</p>
		</div>;
	}

	validate (key) {
		const valid = {
			[key]: false
		};
		const err = {
			[key]: 'Checking availability...'
		};

		games.path(key).not(() => {
			valid[key] = true;
			err[key] = null;
			this.setState({ valid, err });
		}).val(game => {
			valid[key] = !(game instanceof Object);
			if (valid[key]) {
				err[key] = null;
			} else {
				err[key] = `Game "${key}" already exists.`;
			}
			this.setState({ valid, err });
		});
	}

	input (e) {
		const key = e.target.value;
		const valid = {
			[key]: false
		};
		const err = {
			[key]: 'Checking availability...'
		};
		if (key.length === 0) {
			valid[key] = false;
			err[key] = 'Game name is empty.';
		}
		this.setState({ valid, err, key });
		if (key.length) {
			this.validate(key);
		}
	}

	submit () {
		const key = this.state.key;
		const valid = this.state.valid;
		if (valid[key]) {
			games.path(key).put({ key });
			hashHistory.push(`/games/${key}/`);
		}
	}
}
