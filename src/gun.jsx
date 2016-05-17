import Gun from 'gun/gun';

window.Gun = Gun;

Gun.prototype.recurse = function (cb, gun) {
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

const origin = location.origin;

export default new Gun(`${origin}/gun`);
