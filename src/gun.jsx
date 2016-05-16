import Gun from 'gun/gun';

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

export default new Gun('http://192.168.1.113/gun');
