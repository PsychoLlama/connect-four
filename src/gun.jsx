/*global Gun*/
/*
	For some reason, gun isn't
	working through babel and webpack.
	It's being imported through a script
	tag for now, and the bugs are being
	tracked down.
*/
'use strict';

const API = Gun.prototype;

API.recurse = function (cb, gun) {
	if (!gun) {
		gun = this;
	}

	return gun.val(function (data) {
		if (data instanceof Object) {
			const soul = Gun.is.node.soul(data);
			cb.apply(this, arguments);
			this.recurse(cb, gun.get(soul).path('next'));
		}
	});
};

API.game = function (key) {
	const game = this.get(`games: ${key}`);
	const players = game.path('players');
	function initPlayers() {
		players.put({
			player1: null,
			player2: null
		});
	}
	players.not(initPlayers).val(list => {
		if (list === null) {
			initPlayers();
		}
	});
	return game;
};

API.replace = function (value) {
	return this.put(null).put(value);
};

API.reset = function () {
	this.path('players').put(null);
	this.path('turns').put(null);
	return this;
};

const gun = new Gun(`${location.origin}/gun`);

Gun.gameReset = key => {
	gun.get('games').path(key).put(null);
	return gun.game(key).reset();
};

export default gun;
