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
	return this.get(`games: ${key}`);
};

export default new Gun(`${location.origin}/gun`);
